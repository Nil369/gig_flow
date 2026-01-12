@echo off
echo Setting up GigFlow environment...

if not exist "client\.env" (
    echo Creating .env for client...
    copy "client\env.example" "client\.env"
) else (
    echo .env already exists for client, skipping copy.
)

if not exist "server\.env" (
    echo Creating .env for server...
    copy "server\env.example" "server\.env"
) else (
    echo .env already exists for server, skipping copy.
)

echo Starting application with Docker Compose...
docker-compose up --build
