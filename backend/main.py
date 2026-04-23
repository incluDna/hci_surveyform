from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client
from dotenv import load_dotenv
import os

# ====== LOAD ENV (ใช้เฉพาะตอน local) ======
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# ====== INIT APP ======
app = FastAPI()

# ====== CORS (แนะนำให้ล็อก origin ตอน production) ======
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 🔒 ถ้าขึ้น production จริง ควรใส่ domain frontend
    allow_methods=["*"],
    allow_headers=["*"],
)

# ====== CONNECT SUPABASE (กันแอพ crash) ======
supabase = None

if SUPABASE_URL and SUPABASE_KEY:
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("✅ Supabase connected")
    except Exception as e:
        print("❌ Supabase connection failed:", str(e))
else:
    print("⚠️ Missing Supabase ENV")

# ====== MODEL ======
class Location(BaseModel):
    district: str
    subdistrict: str | None = ""

class FormData(BaseModel):
    home: Location
    destination: Location
    transport: list[str]

# ====== API ======
@app.get("/")
def root():
    return {"status": "running"}

@app.post("/submit")
def submit(data: FormData):
    if not supabase:
        return {"status": "error", "message": "Database not ready"}

    try:
        res = supabase.table("responses").insert({
            "home_district": data.home.district,
            "home_subdistrict": data.home.subdistrict,
            "dest_district": data.destination.district,
            "dest_subdistrict": data.destination.subdistrict,
            "transport": data.transport
        }).execute()

        return {
            "status": "ok",
            "data": res.data  # 🔒 ไม่ expose internal object
        }

    except Exception as e:
        print("❌ INSERT ERROR:", str(e))
        return {"status": "error", "message": "Insert failed"}

@app.get("/responses")
def get_responses():
    if not supabase:
        return {"status": "error", "message": "Database not ready"}

    try:
        res = supabase.table("responses").select("*").execute()

        return {
            "status": "ok",
            "data": res.data
        }

    except Exception as e:
        print("❌ FETCH ERROR:", str(e))
        return {"status": "error", "message": "Fetch failed"}
