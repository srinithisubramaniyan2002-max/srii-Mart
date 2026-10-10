@echo off
echo ========================================================
echo   Starting Srinidhi Mart (MySQL Database Mode)
echo ========================================================
echo.
echo Please make sure MySQL Server is running on port 3306!
echo Database name: srinidhi_mart (auto-created if missing)
echo Open your browser at http://localhost:8080 once started.
echo Press Ctrl+C in this window to stop the server anytime.
echo.
java -jar target/srinidhi-mart-1.0.0.jar --spring.profiles.active=mysql
pause
