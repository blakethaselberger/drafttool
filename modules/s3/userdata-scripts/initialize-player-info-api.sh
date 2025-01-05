#!/bin/bash
set -e
echo "Setting up Node.js application"
cd /opt/drafttool/PlayerInfoAPI
sudo npm init -y
sudo npm install express sequelize mysql2 body-parser
jq '.scripts.start = "node app.js"' package.json > package.tmp && mv package.tmp package.json
pm2 start app.js --name drafttool
echo "Node.js application started successfully."