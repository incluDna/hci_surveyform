from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client
from dotenv import load_dotenv
import os

# โหลด .env (ใช้ตอน local)
load_dotenv()

# อ่านค่า ENV
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# กันพังถ้า ENV ไม่มา
if not SUPABASE_URL or not SUPABASE_KEY:
    raise Exception("Missing Supabase ENV variables")

# connect Supabase
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

# เปิด CORS (ให้ frontend ยิงได้)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ====== MODEL ======
class Location(BaseModel):
    district: str
    subdistrict: str | None = ""

class FormData(BaseModel):
    home: Location
    destination: Location
    transport: list[str]

# ====== API ======
@app.post("/submit")
def submit(data: FormData):
    res = supabase.table("responses").insert({
        "home_district": data.home.district,
        "home_subdistrict": data.home.subdistrict,
        "dest_district": data.destination.district,
        "dest_subdistrict": data.destination.subdistrict,
        "transport": data.transport
    }).execute()

    print("SUPABASE RESPONSE:", res)

    return {"status": "ok", "debug": str(res)}

@app.get("/responses")
def get_responses():
    try:
        res = supabase.table("responses").select("*").execute()

        result = []
        for r in res.data:
            result.append({
                "id": r["id"],
                "home": {
                    "district": r["home_district"],
                    "subdistrict": r["home_subdistrict"]
                },
                "destination": {
                    "district": r["dest_district"],
                    "subdistrict": r["dest_subdistrict"]
                },
                "transport": r["transport"]
            })

        return result

    except Exception as e:
        return {"status": "error", "message": str(e)}