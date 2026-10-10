@echo off
echo ========================================================
echo   Starting Srinidhi Mart (Instant Mode with H2 Database)
echo ========================================================
echo.
echo No MySQL setup is needed for this mode!
echo Open your browser at http://localhost:8080 once started.
echo Press Ctrl+C in this window to stop the server anytime.
echo.
java -jar target/srinidhi-mart-1.0.0.jar --spring.profiles.active=h2
pause
