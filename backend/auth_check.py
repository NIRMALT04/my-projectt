from database import SessionLocal
from models import Doctor, Patient
from security import verify_password
from sqlalchemy import select

def authenticate(model, username: str, password: str):
    """Check if username + password is correct for Doctor or Patient"""
    with SessionLocal() as session:
        user = session.execute(
            select(model).where(model.username == username)
        ).scalar_one_or_none()
        if user and verify_password(password, user.hashed_password):
            return True
        return False

if __name__ == "__main__":
    #  correct password
    print("Doctor login success?", authenticate(Doctor, "dr_rahul", "DrRahul@123"))

    #  wrong password
    print("Wrong password test ->", authenticate(Doctor, "dr_rahul", "WrongPass"))

    #  patient test
    print("Patient login success?", authenticate(Patient, "ananya_g", "Ananya@123"))