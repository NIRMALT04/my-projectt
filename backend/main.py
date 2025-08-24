from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, security

# Make sure tables exist
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow the React app to call this backend
origins = [
    "http://localhost:3000", "http://127.0.0.1:3000",   # CRA
    "http://localhost:5173", "http://127.0.0.1:5173",   # Vite
    # Add your FRIEND's React URL if different:
    # "http://<FRIEND_IP>:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB session helper
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Request body model
class UserRequest(BaseModel):
    username: str
    password: str

@app.post("/register/{role}")
def register(role: str, user: UserRequest, db: Session = Depends(get_db)):
    if role not in ["doctor", "patient"]:
        raise HTTPException(status_code=400, detail="Invalid role")

    Model = models.Doctor if role == "doctor" else models.Patient
    existing = db.query(Model).filter(Model.username == user.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed_pw = security.hash_password(user.password)
    new_user = Model(username=user.username, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": f"{role.capitalize()} registered successfully!"}

@app.post("/login/{role}")
def login(role: str, user: UserRequest, db: Session = Depends(get_db)):
    if role not in ["doctor", "patient"]:
        raise HTTPException(status_code=400, detail="Invalid role")

    Model = models.Doctor if role == "doctor" else models.Patient
    db_user = db.query(Model).filter(Model.username == user.username).first()
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid username")
    if not security.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid password")
    return {"message": f"{role.capitalize()} login successful!"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "Backend is running!"}

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting FastAPI server...")
    print("📱 Frontend should be running on: http://localhost:3000")
    print("🔧 Backend API will be available on: http://localhost:8000")
    print("📚 API documentation: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)