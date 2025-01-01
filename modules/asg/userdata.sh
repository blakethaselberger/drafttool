#!/bin/bash
# Log file
LOG_FILE="/var/log/install_script.log"

# Update the package lists
sudo yum update -y | tee -a $LOG_FILE

# Install common software
sudo yum install -y \
    git \
    wget \
    curl \
    vim \
    htop \
    python3 \
    java-11-openjdk | tee -a $LOG_FILE

sudo yum install -y python3-pip | tee -a $LOG_FILE
sudo amazon-linux-extras install -y docker | tee -a $LOG_FILE
sudo service docker start | tee -a $LOG_FILE
sudo usermod -aG docker ec2-user | tee -a $LOG_FILE
sudo chkconfig docker on | tee -a $LOG_FILE

# Install MySQL dependencies
sudo yum install -y mysql mysql-server | tee -a $LOG_FILE
sudo service mysqld start | tee -a $LOG_FILE
sudo chkconfig mysqld on | tee -a $LOG_FILE

# Install Node.js and npm
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash - | tee -a $LOG_FILE
sudo yum install -y nodejs | tee -a $LOG_FILE

# Install global npm packages
sudo npm install -g pm2 | tee -a $LOG_FILE

# Create directories
sudo mkdir -p /var/log/drafttool
sudo mkdir -p /var/lib/drafttool
sudo mkdir -p /var/run/drafttool
sudo mkdir -p /etc/drafttool
sudo mkdir -p /opt/drafttool/bin
sudo mkdir -p /opt/drafttool/config
sudo mkdir -p /opt/drafttool/data
sudo mkdir -p /opt/drafttool/logs
sudo mkdir -p /opt/drafttool/temp | tee -a $LOG_FILE

# Set permissions for the directories
sudo chown -R ec2-user:ec2-user /var/log/drafttool
sudo chown -R ec2-user:ec2-user /var/lib/drafttool
sudo chown -R ec2-user:ec2-user /var/run/drafttool
sudo chown -R ec2-user:ec2-user /etc/drafttool
sudo chown -R ec2-user:ec2-user /opt/drafttool | tee -a $LOG_FILE

echo "Common software installation, MySQL and Node.js installation, and directory creation complete." | tee -a $LOG_FILE
