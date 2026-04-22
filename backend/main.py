from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import json

app = FastAPI()

# เปิด CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB
conn = sqlite3.connect("data.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    home_district TEXT,
    home_subdistrict TEXT,
    dest_district TEXT,
    dest_subdistrict TEXT,
    transport TEXT
)
""")

class Location(BaseModel):
    district: str
    subdistrict: str | None = ""

class FormData(BaseModel):
    home: Location
    destination: Location
    transport: list[str]

@app.post("/submit")
def submit(data: FormData):
    cursor.execute(
        "INSERT INTO responses VALUES (NULL, ?, ?, ?, ?, ?)",
        (
            data.home.district,
            data.home.subdistrict,
            data.destination.district,
            data.destination.subdistrict,
            json.dumps(data.transport)
        )
    )
    conn.commit()
    return {"status": "ok"}

@app.get("/responses")
def get_responses():
    cursor.execute("SELECT * FROM responses")
    rows = cursor.fetchall()

    result = []
    for r in rows:
        result.append({
            "id": r[0],
            "home": {"district": r[1], "subdistrict": r[2]},
            "destination": {"district": r[3], "subdistrict": r[4]},
            "transport": json.loads(r[5])
        })
    return result