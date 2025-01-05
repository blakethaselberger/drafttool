#!/bin/bash
set -e
echo "Creating necessary directories"
sudo mkdir -p /var/log/drafttool /var/lib/drafttool /var/run/drafttool /etc/drafttool /opt/drafttool/{bin,config,data,logs,temp,PlayerInfoAPI,sql}
sudo chown -R ec2-user:ec2-user /var/log/drafttool /var/lib/drafttool /var/run/drafttool /etc/drafttool /opt/drafttool
echo "Directories created and permissions set."