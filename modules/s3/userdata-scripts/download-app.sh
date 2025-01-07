#!/bin/bash
set -e  # Exit on error

echo "Downloading application and SQL files from S3"
sudo aws s3 cp s3://$PLAYER_INFO_API_BUCKET_NAME/ /opt/drafttool/PlayerInfoAPI/ --recursive --region $REGION
if [ $? -eq 0 ]; then
    echo "Application files downloaded successfully."
    sudo chmod -R +x /opt/drafttool/PlayerInfoAPI/
else
    echo "Failed to download application files." >&2
    exit 1
fi

sudo aws s3 cp s3://$SQL_BUCKET_NAME/ /opt/drafttool/sql/ --recursive --region $REGION
if [ $? -eq 0 ]; then
    echo "SQL files downloaded successfully."
    sudo chmod -R +x /opt/drafttool/sql/
else
    echo "Failed to download SQL files." >&2
    exit 1
fi