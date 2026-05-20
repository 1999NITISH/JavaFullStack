@echo off
echo Starting InterviewAI Project...

echo Checking for Java...
java -version
if %errorlevel% neq 0 (
    echo Java not found. Please install Java 17.
    pause
    exit /b
)

echo Checking for Node.js...
node -v
if %errorlevel% neq 0 (
    echo Node.js not found. Please install Node.js.
    pause
    exit /b
)

echo Starting Backend...
start cmd /k "cd backend && mvnw.cmd spring-boot:run"

echo Starting Frontend...
start cmd /k "cd frontend && npm install && npm run dev"

echo Project is starting in separate windows.
pause
