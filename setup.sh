#!/bin/bash

# Function to copy env files if they don't exist
setup_env() {
    local dir=$1
    if [ ! -f "$dir/.env" ]; then
        echo "Creating .env for $dir..."
        cp "$dir/env.example" "$dir/.env"
    else
        echo ".env already exists for $dir, skipping copy."
    fi
}

echo "Setting up GigFlow environment..."

# Setup environment variables
setup_env "client"
setup_env "server"

echo "Starting application with Docker Compose..."
docker-compose up --build
