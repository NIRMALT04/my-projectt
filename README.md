# Full-Stack Authentication System

A complete authentication system with React frontend and FastAPI backend, supporting doctor and patient user roles.

## 🚀 Quick Start

### Option 1: Using Batch Files (Windows)
1. **Start Backend**: Double-click `start_backend.bat`
2. **Start Frontend**: Double-click `start_frontend.bat` (in a new terminal)

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python main.py
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## 🔧 Features

### Frontend
- ✅ Role selection (Doctor/Patient)
- ✅ User registration
- ✅ User login
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling
- ✅ Success messages

### Backend
- ✅ FastAPI server
- ✅ SQLAlchemy database
- ✅ Password hashing with bcrypt
- ✅ CORS enabled for frontend
- ✅ User registration endpoints
- ✅ User login endpoints
- ✅ Role-based authentication

## 📁 Project Structure

```
my-projectt/
├── backend/
│   ├── main.py          # FastAPI server
│   ├── models.py        # Database models
│   ├── database.py      # Database connection
│   ├── security.py      # Password hashing
│   ├── auth_check.py    # Authentication utilities
│   ├── seed.py          # Database seeding
│   └── requirements.txt # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.js       # Main React component
│   │   └── ...          # Other React files
│   ├── package.json     # Node.js dependencies
│   └── ...              # React app files
├── start_backend.bat    # Backend startup script
├── start_frontend.bat   # Frontend startup script
└── README.md            # This file
```

## 🔐 How to Use

1. **Select Role**: Choose between Doctor or Patient
2. **Register**: Create a new account (if you don't have one)
3. **Login**: Use your credentials to sign in
4. **Welcome**: Access the authenticated area

## 🛠️ Troubleshooting

### Backend Issues
- Ensure Python 3.7+ is installed
- Check if port 8000 is available
- Verify all dependencies are installed: `pip install -r requirements.txt`

### Frontend Issues
- Ensure Node.js 14+ is installed
- Check if port 3000 is available
- Clear npm cache: `npm cache clean --force`

### Connection Issues
- Ensure both frontend and backend are running
- Check browser console for CORS errors
- Verify API_BASE_URL in App.js matches backend port

## 🔒 Security Features

- Password hashing with bcrypt
- CORS protection
- Input validation
- Role-based access control
- Secure password storage

## 📱 Technologies Used

- **Frontend**: React, Axios, CSS-in-JS
- **Backend**: FastAPI, SQLAlchemy, SQLite
- **Authentication**: bcrypt, passlib
- **Database**: SQLite (can be easily changed to PostgreSQL/MySQL)

## 🚀 Deployment

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm run build
# Serve the build folder with any static server
```

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify both servers are running
3. Check the terminal output for backend errors
4. Ensure all dependencies are properly installed
