#!/bin/bash
# Pull the latest code from the GitHub repository
git pull origin main || exit 1
# Install dependencies (if any)
npm install || exit 1
# Build the frontend (or any other specific commands)
npm run build || exit 1
# Optionally restart your frontend server or other commands
pm2 restart all || exit 1
