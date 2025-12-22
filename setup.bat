@echo off

echo Setting up Notes Application...

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

:: Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: npm is not installed. Please install npm first.
    pause
    exit /b 1
)

:: Setup Backend
echo Setting up backend...
cd backend

:: Install backend dependencies
echo Installing backend dependencies...
npm install

:: Copy environment file
if not exist .env (
    copy env.sample .env
    echo Created .env file from env.sample
    echo Please edit .env file with your database credentials and JWT secret
)

cd ..

:: Setup Frontend
echo Setting up frontend...
cd frontend

:: Install frontend dependencies
echo Installing frontend dependencies...
npm install

cd ..

echo.
echo Setup complete!
echo.
echo Next steps:
echo 1. Configure your MySQL database
echo 2. Edit backend\.env with your database credentials
echo 3. Create the database: CREATE DATABASE notes_db;
echo.
echo To start the application:
echo Backend:  cd backend ^&^& npm run start:dev
echo Frontend: cd frontend ^&^& npm start
echo.
echo The backend will run on http://localhost:3001
echo The frontend will run on http://localhost:3000

pause
