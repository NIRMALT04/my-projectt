from database import Base, engine, SessionLocal
from models import Doctor, Patient
from security import hash_password
from sqlalchemy import select

def seed():
    # 1) create tables (if not exist already)
    Base.metadata.create_all(bind=engine)

    # 2) sample doctors and patients (plain passwords only here in code)
    doctors = [
        {"username": "dr_rahul",  "password": "DrRahul@123"},
        {"username": "dr_priya",  "password": "DrPriya@123"},
        {"username": "dr_arjun",  "password": "DrArjun@123"},
        {"username": "dr_sneha",  "password": "DrSneha@123"},
        {"username": "dr_vikram", "password": "DrVikram@123"},
    ]

    patients = [
        {"username": "ananya_g", "password": "Ananya@123"},
        {"username": "rohan_v",  "password": "Rohan@123"},
        {"username": "kavya_n",  "password": "Kavya@123"},
        {"username": "aditya_j", "password": "Aditya@123"},
        {"username": "meera_k",  "password": "Meera@123"},
    ]

    # 3) open a DB session
    with SessionLocal() as session:
        # insert doctors if not already there
        for d in doctors:
            exists = session.execute(
                select(Doctor).where(Doctor.username == d["username"])
            ).scalar_one_or_none()
            if not exists:
                session.add(Doctor(
                    username=d["username"],
                    hashed_password=hash_password(d["password"])
                ))

        # insert patients if not already there
        for p in patients:
            exists = session.execute(
                select(Patient).where(Patient.username == p["username"])
            ).scalar_one_or_none()
            if not exists:
                session.add(Patient(
                    username=p["username"],
                    hashed_password=hash_password(p["password"])
                ))

        session.commit()
        print("✅Database created and sample doctors + patients inserted.")

if __name__ == "__main__":
    seed()