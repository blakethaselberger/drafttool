#!/bin/bash
set -e  # Exit on error

echo "Setting up Node.js application"

# Navigate to the application directory
APP_DIR="/opt/drafttool/PlayerInfoAPI"
cd "$APP_DIR" || { echo "Failed to change directory to $APP_DIR"; exit 1; }

# Initialize a Node.js project if package.json does not exist
if [ ! -f package.json ]; then
    echo "Initializing Node.js project"
    sudo npm init -y
else
    echo "package.json already exists. Skipping initialization."
fi

# Install required Node.js dependencies
echo "Installing dependencies"
sudo npm install express sequelize mysql2 body-parser pm2

# Grant Node.js permission to bind to privileged ports
echo "Granting Node.js permission to use privileged ports"
sudo setcap 'cap_net_bind_service=+ep' $(which node)

# Update package.json to include a start script for the application
echo "Configuring start script in package.json"
jq '.scripts.start = "node app.js"' package.json > package.tmp && mv package.tmp package.json

# Start the application using PM2 on port 80
echo "Starting Node.js application using PM2"
pm2 start app.js --name drafttool

echo "Node.js application started successfully on privileged ports."