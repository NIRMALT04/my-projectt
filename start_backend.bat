@echo off
echo Starting Backend Server...
echo.
cd backend
echo Installing dependencies...
pip install -r requirements.txt
echo.
echo Starting FastAPI server...
python main.py
pause
