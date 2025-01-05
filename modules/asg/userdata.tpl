#!/bin/bash
set -e  # Exit on error

# Install jq for parsing region information
echo "Installing jq"
sudo yum install -y jq

# Export environment variables
export PLAYER_INFO_API_BUCKET_NAME="${player_info_api_bucket_name}"
export SQL_BUCKET_NAME="${sql_bucket_name}"
export RDS_ENDPOINT=$(echo "${rds_endpoint}" | sed 's/:[0-9]*$//')
export RDS_DB_NAME="${rds_db_name}"
export RDS_USERNAME="${rds_username}"
export RDS_PASSWORD="${rds_password}"
export SCRIPTS_BUCKET="${scripts_bucket}"

# Function to verify and execute a script
run_script() {
    local script_name=$1
    if [ ! -f "$SCRIPTS_DIR/$script_name" ]; then
        echo "Error: $script_name does not exist in $SCRIPTS_DIR" >&2
        exit 1
    fi
    echo "Running $script_name"
    source "$SCRIPTS_DIR/$script_name" || {
        echo "Error: $script_name failed" >&2
        exit 1
    }
}

TOKEN=$(curl -X PUT -H "X-aws-ec2-metadata-token-ttl-seconds: 21600" \
    http://169.254.169.254/latest/api/token)

export REGION=$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" \
    http://169.254.169.254/latest/dynamic/instance-identity/document | jq -r .region)

if [ -z "$REGION" ]; then
    echo "Failed to retrieve region using IMDSv2"
    exit 1
fi

echo "Region detected: $REGION"

# Prepare script directory
SCRIPTS_DIR="/opt/scripts"
sudo mkdir -p $SCRIPTS_DIR

# Download scripts
echo "Downloading initialization scripts from S3: s3://$SCRIPTS_BUCKET/userdata-scripts"
sudo aws s3 cp s3://$SCRIPTS_BUCKET/userdata-scripts/ $SCRIPTS_DIR/ --recursive --region $REGION
if [ $? -ne 0 ]; then
    echo "Failed to download scripts from S3" >&2
    exit 1
fi

# Set permissions for scripts
sudo chmod +x $SCRIPTS_DIR/*.sh

# Execute scripts in the correct order
run_script "install-dependencies.sh"
run_script "initialize-directories.sh"
run_script "download-app.sh"
run_script "initialize-db.sh"
run_script "initialize-player-info-api.sh"

echo "Initialization pipeline completed successfully."