@echo off
cd /d "C:\path\to\your\express\app"
pm2 start node src/index.js --name "your-app-name"
