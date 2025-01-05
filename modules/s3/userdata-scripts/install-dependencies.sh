#!/bin/bash
set -e  # Exit on error

echo "Updating packages and installing dependencies"

# Update system packages
sudo dnf update -y

# Install additional dependencies only if not included by default
packages=("git" "htop")

for package in "${packages[@]}"; do
    if rpm -q "$package" &> /dev/null; then
        echo "Package $package is already installed, skipping."
    else
        echo "Installing $package"
        sudo dnf install -y "$package"
    fi
done

# Resolve curl conflicts (if necessary)
if rpm -q "curl-minimal" &> /dev/null; then
    echo "Removing conflicting curl-minimal package"
    sudo dnf remove -y curl-minimal
fi

if ! rpm -q "curl" &> /dev/null; then
    echo "Installing curl"
    sudo dnf install -y curl
fi

# Install MySQL client (no server)
if ! rpm -q "mysql-community-client" &> /dev/null; then
    echo "Adding MySQL repository and installing MySQL client"
    wget https://dev.mysql.com/get/mysql80-community-release-el9-3.noarch.rpm
    sudo dnf install -y mysql80-community-release-el9-3.noarch.rpm
    sudo rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023
    sudo dnf install -y mysql-community-client
else
    echo "MySQL client is already installed, skipping."
fi

# Install Node.js 18.x
if ! command -v node &> /dev/null; then
    echo "Installing Node.js 18.x"
    curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
    sudo dnf install -y nodejs
else
    echo "Node.js is already installed, skipping."
fi

# Install PM2 globally
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2"
    sudo npm install -g pm2
else
    echo "PM2 is already installed, skipping."
fi

echo "All dependencies installed successfully."