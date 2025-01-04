#!/bin/bash

echo "Installing jq"
sudo yum install -y jq

echo "Fetching region information"
REGION=$(curl -s http://169.254.169.254/latest/dynamic/instance-identity/document | jq -r .region)

echo "Importing environment variables"
export PLAYER_INFO_API_BUCKET_NAME="${player_info_api_bucket_name}"
export SQL_BUCKET_NAME="${sql_bucket_name}"
export RDS_ENDPOINT=$(echo "${rds_endpoint}" | sed 's/:[0-9]*$//')
export RDS_DB_NAME="${rds_db_name}"

# Fetching RDS credentials from Secrets Manager
RDS_CREDENTIALS=$(aws secretsmanager get-secret-value --secret-id rds_credentials --region $REGION --query SecretString --output text)
export RDS_USERNAME=$(echo $RDS_CREDENTIALS | jq -r .username)
export RDS_PASSWORD=$(echo $RDS_CREDENTIALS | jq -r .password)

echo "Testing that the env variables were passed in correctly"
echo "Player Info API Bucket: $PLAYER_INFO_API_BUCKET_NAME"
echo "SQL Bucket: $SQL_BUCKET_NAME"
echo "RDS Endpoint: $RDS_ENDPOINT"
echo "RDS DB Name: $RDS_DB_NAME"
echo "RDS Username: $RDS_USERNAME"

echo "Updating the package lists"
sudo yum update -y

echo "Installing common software"
sudo yum install -y \
    git \
    wget \
    curl \
    vim \
    htop \
    python3 \
    java-11-openjdk

echo "Installing python3-pip"
sudo yum install -y python3-pip
echo "Installing Docker"
sudo amazon-linux-extras install -y docker
echo "Starting Docker service"
sudo service docker start
echo "Adding ec2-user to docker group"
sudo usermod -aG docker ec2-user
echo "Setting Docker to start on boot"
sudo chkconfig docker on

echo "Installing MySQL dependencies"
sudo yum install -y mysql mysql-server

echo "Installing MySQL client"
sudo yum install -y mysql

echo "Installing Node.js and npm"
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nsolid

echo "Installing global npm packages"
sudo npm install -g pm2

echo "Creating directories"
sudo mkdir -p /var/log/drafttool
sudo mkdir -p /var/lib/drafttool
sudo mkdir -p /var/run/drafttool
sudo mkdir -p /etc/drafttool
sudo mkdir -p /opt/drafttool/bin
sudo mkdir -p /opt/drafttool/config
sudo mkdir -p /opt/drafttool/data
sudo mkdir -p /opt/drafttool/logs
sudo mkdir -p /opt/drafttool/temp
sudo mkdir -p /opt/drafttool/PlayerInfoAPI
sudo mkdir -p /opt/drafttool/sql

echo "Setting permissions for the directories"
sudo chown -R ec2-user:ec2-user /var/log/drafttool
sudo chown -R ec2-user:ec2-user /var/lib/drafttool
sudo chown -R ec2-user:ec2-user /var/run/drafttool
sudo chown -R ec2-user:ec2-user /etc/drafttool
sudo chown -R ec2-user:ec2-user /opt/drafttool

echo "Downloading project files from S3 without creating nested directories"
cd /opt/drafttool/PlayerInfoAPI
aws s3 cp s3://$PLAYER_INFO_API_BUCKET_NAME/ . --recursive --region $REGION

echo "Downloading SQL files from S3 into the sql directory"
cd /opt/drafttool/sql
aws s3 cp s3://$SQL_BUCKET_NAME/ . --recursive --region $REGION

echo "Initializing MySQL Database"
for sql_file in /opt/drafttool/sql/*.sql; do
    mysql -h $RDS_ENDPOINT -u $RDS_USERNAME -p"$RDS_PASSWORD" $RDS_DB_NAME < "$sql_file"
done

echo "Initializing Node.js project"
cd /opt/drafttool/PlayerInfoAPI
sudo npm init -y

echo "Installing project dependencies"
sudo npm install express sequelize mysql2 body-parser

echo "Updating package.json to set start script to 'node app.js'"
jq '.scripts.start = "node app.js"' package.json > package.tmp && mv package.tmp package.json

echo "Starting Node.js application using pm2"
pm2 start app.js --name drafttool

echo "Setup complete."
