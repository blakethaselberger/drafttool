#!/bin/bash
# This script will run during the instance initialization to install common software and create necessary directories.

# Update the package lists
sudo yum update -y

# Install common software
sudo yum install -y \
    git \
    wget \
    curl \
    vim \
    htop \
    python3 \
    java-11-openjdk

sudo yum install -y python3-pip
sudo amazon-linux-extras install -y docker
sudo service docker start
sudo usermod -aG docker ec2-user
sudo chkconfig docker on

# Create directories
sudo mkdir -p /var/log/drafttool
sudo mkdir -p /var/lib/drafttool
sudo mkdir -p /var/run/drafttool
sudo mkdir -p /etc/drafttool
sudo mkdir -p /opt/drafttool/bin
sudo mkdir -p /opt/drafttool/config
sudo mkdir -p /opt/drafttool/data
sudo mkdir -p /opt/drafttool/logs
sudo mkdir -p /opt/drafttool/temp

# Set permissions for the directories
sudo chown -R ec2-user:ec2-user /var/log/drafttool
sudo chown -R ec2-user:ec2-user /var/lib/drafttool
sudo chown -R ec2-user:ec2-user /var/run/drafttool
sudo chown -R ec2-user:ec2-user /etc/drafttool
sudo chown -R ec2-user:ec2-user /opt/drafttool

echo "Common software installation and directory creation complete."
