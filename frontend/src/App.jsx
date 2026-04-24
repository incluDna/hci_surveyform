import { useState, useEffect } from "react";

const API_URL = "https://hci-surveyform.onrender.com";

const bangkokData = {
  "พระนคร": ["พระบรมมหาราชวัง","วังบูรพาภิรมย์","วัดราชบพิธ","สำราญราษฎร์","ศาลเจ้าพ่อเสือ","เสาชิงช้า","บวรนิเวศ","ตลาดยอด","ชนะสงคราม","บ้านพานถม","บางขุนพรหม","วัดสามพระยา"],
  "ดุสิต": ["ดุสิต","วชิรพยาบาล","สวนจิตรลดา","สี่แยกมหานาค","ถนนนครไชยศรี"],
  "หนองจอก": ["กระทุ่มราย","หนองจอก","คลองสิบ","คลองสิบสอง","โคกแฝด","คู้ฝั่งเหนือ","บึงคำพร้อย","ลำผักชี","ลำต้อยติ่ง"],
  "บางรัก": ["มหาพฤฒาราม","สีลม","สุริยวงศ์","บางรัก","สี่พระยา"],
  "บางเขน": ["อนุสาวรีย์","ท่าแร้ง"],
  "บางกะปิ": ["คลองจั่น","หัวหมาก"],
  "ปทุมวัน": ["รองเมือง","วังใหม่","ปทุมวัน","ลุมพินี"],
  "ป้อมปราบศัตรูพ่าย": ["ป้อมปราบ","วัดเทพศิรินทร์","คลองมหานาค","บ้านบาตร","วัดโสมนัส"],
  "พระโขนง": ["บางจาก"],
  "มีนบุรี": ["มีนบุรี","แสนแสบ"],
  "ลาดกระบัง": ["ลาดกระบัง","คลองสาม","คลองสี่","คลองห้า","คลองหก","ขุมทอง","ทับยาว","ลำปลาทิว"],
  "ยานนาวา": ["ช่องนนทรี","บางโพงพาง"],
  "สัมพันธวงศ์": ["สัมพันธวงศ์","ตลาดน้อย","จักรวรรดิ"],
  "พญาไท": ["สามเสนใน","พญาไท"],
  "ธนบุรี": ["วัดกัลยาณ์","หิรัญรูจี","บางยี่เรือ","บุคคโล"],
  "บางกอกใหญ่": ["วัดท่าพระ","วัดอรุณ","วัดกัลยาณ์","หิรัญรูจี"],
  "ห้วยขวาง": ["ห้วยขวาง","บางกะปิ","สามเสนนอก"],
  "คลองสาน": ["สมเด็จเจ้าพระยา","คลองสาน","บางลำภูล่าง","คลองต้นไทร"],
  "ตลิ่งชัน": ["คลองชักพระ","ตลิ่งชัน","ฉิมพลี","บางพรม","บางระมาด","บางเชือกหนัง"],
  "บางกอกน้อย": ["ศิริราช","บ้านช่างหล่อ","บางขุนนนท์","บางขุนศรี","อรุณอมรินทร์"],
  "บางขุนเทียน": ["ท่าข้าม","แสมดำ"],
  "ภาษีเจริญ": ["บางหว้า","บางด้วน","บางแวก","บางจาก","บางเสาธง","ปากคลองภาษีเจริญ","คูหาสวรรค์"],
  "หนองแขม": ["หนองแขม","หนองค้างพลู"],
  "ราษฎร์บูรณะ": ["ราษฎร์บูรณะ","บางปะกอก"],
  "บางพลัด": ["บางพลัด","บางอ้อ","บางบำหรุ","บางยี่ขัน"],
  "ดินแดง": ["ดินแดง","รัชดาภิเษก"],
  "บึงกุ่ม": ["คลองกุ่ม","นวมินทร์","นวลจันทร์"],
  "สาทร": ["ทุ่งมหาเมฆ","ทุ่งวัดดอน","ช่องนนทรี"],
  "บางคอแหลม": ["วัดพระยาไกร","บางคอแหลม","บางโคล่"],
  "ประเวศ": ["ประเวศ","หนองบอน","ดอกไม้"],
  "คลองเตย": ["คลองเตย","คลองตัน","พระโขนง","คลองเตยเหนือ"],
  "สวนหลวง": ["สวนหลวง","อ่อนนุช","พระโขนงเหนือ"],
  "ดอนเมือง": ["สีกัน","ดอนเมือง","สนามบิน"],
  "จตุจักร": ["จตุจักร","จอมพล","จันทรเกษม","เสนานิคม","ลาดยาว"],
  "บางซื่อ": ["บางซื่อ","วงศ์สว่าง"],
  "หลักสี่": ["ทุ่งสองห้อง","ตลาดบางเขน"],
  "สายไหม": ["สายไหม","ออเงิน","คลองถนน"],
  "คันนายาว": ["คันนายาว"],
  "สะพานสูง": ["สะพานสูง"],
  "วังทองหลาง": ["วังทองหลาง","คลองเจ้าคุณสิงห์","สะพานสอง","พลับพลา"],
  "ลาดพร้าว": ["ลาดพร้าว","จรเข้บัว"],
  "บางแค": ["บางแค","บางแคเหนือ","บางไผ่","หลักสอง"],
  "บางนา": ["บางนา","บางนาใต้"],
  "ทุ่งครุ": ["บางมด","ทุ่งครุ"],
  "บางบอน": ["บางบอน","บางบอนเหนือ","บางบอนใต้","คลองบางบอน"],
  "วัฒนา": ["คลองเตยเหนือ","คลองตันเหนือ","พระโขนงเหนือ"],
  "คลองสามวา": ["บางชัน","สามวาตะวันตก","สามวาตะวันออก","ทรายกองดิน","ทรายกองดินใต้"],
  "หนองแขม": ["หนองแขม","หนองค้างพลู"],
  "บางขุนเทียน": ["ท่าข้าม","แสมดำ"],
  "ธนบุรี": ["วัดกัลยาณ์","หิรัญรูจี","บางยี่เรือ","บุคคโล"],
};


// Clean deduplicated district list
const allDistricts = [
  "พระนคร",
  "ดุสิต",
  "หนองจอก",
  "บางรัก",
  "บางเขน",
  "บางกะปิ",
  "ปทุมวัน",
  "ป้อมปราบศัตรูพ่าย",
  "พระโขนง",
  "มีนบุรี",
  "ลาดกระบัง",
  "ยานนาวา",
  "สัมพันธวงศ์",
  "พญาไท",
  "ธนบุรี",
  "บางกอกใหญ่",
  "ห้วยขวาง",
  "คลองสาน",
  "ตลิ่งชัน",
  "บางกอกน้อย",
  "บางขุนเทียน",
  "ภาษีเจริญ",
  "หนองแขม",
  "ราษฎร์บูรณะ",
  "บางพลัด",
  "ดินแดง",
  "บึงกุ่ม",
  "สาทร",
  "บางซื่อ",
  "จตุจักร",
  "บางคอแหลม",
  "ประเวศ",
  "คลองเตย",
  "สวนหลวง",
  "จอมทอง",
  "ดอนเมือง",
  "ราชเทวี",
  "ลาดพร้าว",
  "วัฒนา",
  "บางแค",
  "หลักสี่",
  "สายไหม",
  "คันนายาว",
  "สะพานสูง",
  "วังทองหลาง",
  "คลองสามวา",
  "บางนา",
  "ทวีวัฒนา",
  "ทุ่งครุ",
  "บางบอน"
];


const transportModes = [
  { id: "walk", label: "เดิน", icon: "🚶" },
  { id: "bus", label: "รถเมล์/ประจำทาง", icon: "🚌" },
  { id: "van", label: "รถตู้", icon: "🚐" },
  { id: "songthaew", label: "รถสองแถว", icon: "🛻" },
  { id: "taxi", label: "แท็กซี่", icon: "🚕" },
  { id: "moto", label: "มอเตอร์ไซค์", icon: "🏍️" },
  { id: "bike", label: "จักรยาน", icon: "🚲" },
  { id: "car", label: "รถยนต์ส่วนตัว", icon: "🚗" },
  { id: "bts", label: "BTS", icon: "🚆" },
  { id: "mrt", label: "MRT", icon: "🚇" },
  { id: "boat", label: "เรือ", icon: "⛵" }
];

const routePriorities = [
  { id: "fastest",    label: "เร็วที่สุด",                    icon: "⚡" },
  { id: "cheapest",   label: "ถูกที่สุด",                    icon: "💸" },
  { id: "least_walk", label: "เดินน้อยที่สุด",               icon: "🦶" },
  { id: "reliable",   label: "เชื่อถือได้มากที่สุด",         icon: "🛡️" },
  { id: "easiest",    label: "ง่ายที่สุด / สับสนน้อยที่สุด", icon: "🧭" },
];

function LocationSelector({ label, questionNum, district, subdistrict, onDistrictChange, onSubdistrictChange }) {
  const subs = bangkokData[district] || [];

  return (
    <div style={{ marginBottom: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <span style={{
          width: "32px", height: "32px", borderRadius: "50%",
          background: "linear-gradient(135deg, #FF6B35, #F7C59F)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Kanit', sans-serif", fontWeight: "700",
          fontSize: "14px", color: "#fff", flexShrink: 0,
          boxShadow: "0 2px 8px rgba(255,107,53,0.4)"
        }}>{questionNum}</span>
        <h2 style={{
          fontFamily: "'Kanit', sans-serif", fontWeight: "600",
          fontSize: "18px", color: "#1a1a2e", margin: 0, lineHeight: 1.3
        }}>{label}</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div>
          <label style={{
            display: "block", fontFamily: "'Kanit', sans-serif",
            fontSize: "12px", color: "#888", marginBottom: "6px", fontWeight: "400"
          }}>เขต</label>
          <select
            value={district}
            onChange={e => { onDistrictChange(e.target.value); onSubdistrictChange(""); }}
            style={{
              width: "100%", padding: "10px 14px",
              borderRadius: "10px", border: "1.5px solid #e8e8f0",
              fontFamily: "'Kanit', sans-serif", fontSize: "14px",
              background: "#fafafa", color: district ? "#1a1a2e" : "#aaa",
              outline: "none", cursor: "pointer", appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23FF6B35' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
              transition: "border-color 0.2s",
            }}
          >
            <option value="">-- เลือกเขต --</option>
            {allDistricts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div>
          <label style={{
            display: "block", fontFamily: "'Kanit', sans-serif",
            fontSize: "12px", color: "#888", marginBottom: "6px", fontWeight: "400"
          }}>แขวง</label>
          <select
            value={subdistrict}
            onChange={e => onSubdistrictChange(e.target.value)}
            disabled={!district || subs.length === 0}
            style={{
              width: "100%", padding: "10px 14px",
              borderRadius: "10px", border: "1.5px solid #e8e8f0",
              fontFamily: "'Kanit', sans-serif", fontSize: "14px",
              background: (!district || subs.length === 0) ? "#f2f2f2" : "#fafafa",
              color: subdistrict ? "#1a1a2e" : "#aaa",
              outline: "none", cursor: (!district || subs.length === 0) ? "not-allowed" : "pointer",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23FF6B35' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
              transition: "border-color 0.2s",
            }}
          >
            <option value="">-- เลือกแขวง --</option>
            {subs.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState("form"); // form | success | results
  const [homeDistrict, setHomeDistrict] = useState("");
  const [homeSubdistrict, setHomeSubdistrict] = useState("");
  const [destDistrict, setDestDistrict] = useState("");
  const [destSubdistrict, setDestSubdistrict] = useState("");
  const [transport, setTransport] = useState([]);
  const [routePriority, setRoutePriority] = useState("");
  const [responses, setResponses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const res = await fetch(`${API_URL}/responses`);
      const data = await res.json();
      setResponses(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("load error:", err);
    }
  }

  function toggleTransport(id) {
    setTransport(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  async function handleSubmit() {
    if (!homeDistrict) { setError("กรุณาเลือกเขตที่อยู่อาศัย"); return; }
    if (!destDistrict) { setError("กรุณาเลือกเขตที่เดินทางไปบ่อย"); return; }
    if (transport.length === 0) { setError("กรุณาเลือกวิธีการเดินทางอย่างน้อย 1 วิธี"); return; }
    if (!routePriority) { setError("กรุณาเลือก 1 ข้อ"); return; }
    setError("");

    const entry = {
      id: Date.now(),
      timestamp: new Date().toLocaleString("th-TH"),
      home: { district: homeDistrict, subdistrict: homeSubdistrict },
      destination: { district: destDistrict, subdistrict: destSubdistrict },
      transport,
      route_priority: routePriority,
    };

    // let current = [];
    try {
      await fetch(`${API_URL}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      });

      await loadData(); // โหลดใหม่
      setStep("success");
    } catch (err) {
      console.error(err);
      setError("ส่งข้อมูลไม่สำเร็จ");
    }

    // current.push(entry);
    // await window.storage.set("survey_responses", JSON.stringify(current));
    // setResponses(current);
    // setStep("success");
  }

  function resetForm() {
    setHomeDistrict(""); setHomeSubdistrict("");
    setDestDistrict(""); setDestSubdistrict("");
    setTransport([]); setRoutePriority(""); setError(""); setStep("form");
  }

  if (step === "success") {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #FFF8F5 0%, #FFF0EB 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ textAlign: "center", maxWidth: "360px" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🙏</div>
          <h1 style={{ fontFamily: "'Kanit', sans-serif", fontWeight: "700", fontSize: "26px", color: "#1a1a2e", marginBottom: "8px" }}>
            ขอบคุณมากครับ/ค่ะ
          </h1>
          <p style={{ fontFamily: "'Kanit', sans-serif", color: "#888", fontSize: "15px", marginBottom: "32px" }}>
            ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button onClick={resetForm} style={{
              padding: "12px 24px", borderRadius: "12px",
              background: "linear-gradient(135deg, #FF6B35, #FF8C5A)",
              border: "none", color: "#fff", fontFamily: "'Kanit', sans-serif",
              fontWeight: "600", fontSize: "15px", cursor: "pointer",
              boxShadow: "0 4px 16px rgba(255,107,53,0.35)"
            }}>ตอบแบบสำรวจอีกครั้ง</button>
            {/* <button onClick={() => setStep("results")} style={{
              padding: "12px 24px", borderRadius: "12px",
              background: "#fff", border: "1.5px solid #e0e0ee",
              color: "#1a1a2e", fontFamily: "'Kanit', sans-serif",
              fontWeight: "600", fontSize: "15px", cursor: "pointer",
            }}>ดูผลสำรวจ ({responses.length})</button> */}
          </div>
        </div>
      </div>
    );
  }

  if (step === "results") {
    const transportCount = {};
    responses.forEach(r => r.transport.forEach(t => {
      transportCount[t] = (transportCount[t] || 0) + 1;
    }));
    const sorted = Object.entries(transportCount).sort((a, b) => b[1] - a[1]);

    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #FFF8F5 0%, #FFF0EB 100%)", padding: "20px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <button onClick={() => setStep("form")} style={{
            background: "none", border: "none", color: "#FF6B35",
            fontFamily: "'Kanit', sans-serif", fontSize: "14px", cursor: "pointer",
            padding: "0 0 16px 0", display: "flex", alignItems: "center", gap: "4px"
          }}>← กลับ</button>

          <h1 style={{ fontFamily: "'Kanit', sans-serif", fontWeight: "700", fontSize: "24px", color: "#1a1a2e", marginBottom: "4px" }}>
            ผลสำรวจ
          </h1>
          <p style={{ fontFamily: "'Kanit', sans-serif", color: "#888", fontSize: "14px", marginBottom: "24px" }}>
            ผู้ตอบแบบสำรวจทั้งหมด {responses.length} คน
          </p>

          <div style={{ background: "#fff", borderRadius: "16px", padding: "20px", marginBottom: "16px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontFamily: "'Kanit', sans-serif", fontWeight: "600", fontSize: "16px", color: "#1a1a2e", marginBottom: "16px" }}>
              วิธีการเดินทาง
            </h3>
            {sorted.map(([id, count]) => {
              const mode = transportModes.find(m => m.id === id);
              const pct = Math.round((count / responses.length) * 100);
              return (
                <div key={id} style={{ marginBottom: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontFamily: "'Kanit', sans-serif", fontSize: "14px" }}>
                      {mode?.icon} {mode?.label}
                    </span>
                    <span style={{ fontFamily: "'Kanit', sans-serif", fontSize: "14px", color: "#FF6B35", fontWeight: "600" }}>
                      {count} คน ({pct}%)
                    </span>
                  </div>
                  <div style={{ height: "6px", background: "#f0f0f5", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${pct}%`,
                      background: "linear-gradient(90deg, #FF6B35, #FF8C5A)",
                      borderRadius: "3px", transition: "width 0.5s ease"
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ background: "#fff", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontFamily: "'Kanit', sans-serif", fontWeight: "600", fontSize: "16px", color: "#1a1a2e", marginBottom: "16px" }}>
              คำตอบทั้งหมด
            </h3>
            {responses.length === 0 ? (
              <p style={{ fontFamily: "'Kanit', sans-serif", color: "#aaa", fontSize: "14px" }}>ยังไม่มีข้อมูล</p>
            ) : responses.slice().reverse().map((r, i) => (
              <div key={r.id} style={{
                padding: "12px", borderRadius: "10px", background: "#fafafa",
                marginBottom: "10px", borderLeft: "3px solid #FF6B35"
              }}>
                <div style={{ fontFamily: "'Kanit', sans-serif", fontSize: "12px", color: "#bbb", marginBottom: "4px" }}>
                  #{responses.length - i} · {r.timestamp}
                </div>
                <div style={{ fontFamily: "'Kanit', sans-serif", fontSize: "13px", color: "#555", lineHeight: 1.7 }}>
                  🏠 อยู่แถว: {r.home.district} {r.home.subdistrict && `· ${r.home.subdistrict}`}<br />
                  📍 ไปแถว: {r.destination.district} {r.destination.subdistrict && `· ${r.destination.subdistrict}`}<br />
                  🚗 เดินทางด้วย: {r.transport.map(t => transportModes.find(m => m.id === t)?.label).join(", ")}<br />
                  ⭐ สำคัญที่สุด: {routePriorities.find(p => p.id === r.route_priority)?.icon} {routePriorities.find(p => p.id === r.route_priority)?.label || "-"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #FFF8F5 0%, #FFF0EB 50%, #FCEEE8 100%)",
        padding: "24px 20px 40px",
        position: "relative", overflow: "hidden"
      }}>
        {/* decorative circles */}
        <div style={{ position: "fixed", top: "-80px", right: "-80px", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,53,0.12), transparent)", pointerEvents: "none" }} />
        <div style={{ position: "fixed", bottom: "-60px", left: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(247,197,159,0.18), transparent)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>🗺️</div>
            <h1 style={{
              fontFamily: "'Kanit', sans-serif", fontWeight: "500",
              fontSize: "32px", color: "#1a1a2e", margin: "0 0 6px 0"
            }}>แบบสำรวจการเดินทางในกรุงเทพ</h1>
            <p style={{
              fontFamily: "'Kanit', sans-serif", fontWeight: "300",
              fontSize: "11px", color: "#888", margin: 0
            }}>แบบสำรวจนี้จัดทำขึ้น เพื่อรวบรวมข้อมูลรูปแบบและพฤติกรรมการเดินทางของประชากรในเขตพื้นที่กรุงเทพมหานคร เพื่อนำข้อมูลดังกล่าวมาใช้เป็นพื้นฐานในการวิเคราะห์เส้นทางการเดินทาง และประกอบการพัฒนา Web Application สำหรับแนะนำการเดินทางที่เหมาะสม<br />
            (งานวิจัยนี้เป็นส่วนหนึ่งของรายวิชา 2110583.69 HCI and Generative AI Hands-on Research and Case Studies)</p>
          </div>

          {/* Card */}
          <div style={{
            background: "#fff", borderRadius: "20px", padding: "28px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)", marginBottom: "16px"
          }}>
            {/* Q1 */}
            <LocationSelector
              label="คุณอยู่แถวไหน?"
              questionNum="1"
              district={homeDistrict}
              subdistrict={homeSubdistrict}
              onDistrictChange={setHomeDistrict}
              onSubdistrictChange={setHomeSubdistrict}
            />

            <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #f0e8e4, transparent)", margin: "24px 0" }} />

            {/* Q2 */}
            <LocationSelector
              label="คุณมักจะเดินทางไปแถวไหน?"
              questionNum="2"
              district={destDistrict}
              subdistrict={destSubdistrict}
              onDistrictChange={setDestDistrict}
              onSubdistrictChange={setDestSubdistrict}
            />

            <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #f0e8e4, transparent)", margin: "24px 0" }} />

            {/* Q3 */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <span style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #FF6B35, #F7C59F)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Kanit', sans-serif", fontWeight: "700",
                  fontSize: "14px", color: "#fff", flexShrink: 0,
                  boxShadow: "0 2px 8px rgba(255,107,53,0.4)"
                }}>3</span>
                <h2 style={{
                  fontFamily: "'Kanit', sans-serif", fontWeight: "600",
                  fontSize: "18px", color: "#1a1a2e", margin: 0, lineHeight: 1.3
                }}>คุณเดินทางไปที่นั่นด้วยวิธีใดบ้าง? <span style={{ fontWeight: "300", fontSize: "14px", color: "#aaa" }}>(วิธีที่ใช้ไปทั้งหมด จนถึงปลายทาง)</span></h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                {transportModes.map(m => {
                  const selected = transport.includes(m.id);
                  return (
                    <button key={m.id} onClick={() => toggleTransport(m.id)} style={{
                      padding: "12px 8px", borderRadius: "12px",
                      border: selected ? "2px solid #FF6B35" : "1.5px solid #e8e8f0",
                      background: selected ? "linear-gradient(135deg, #FFF0EB, #FFE4D6)" : "#fafafa",
                      cursor: "pointer", textAlign: "center", transition: "all 0.15s",
                      transform: selected ? "scale(1.02)" : "scale(1)",
                      boxShadow: selected ? "0 2px 12px rgba(255,107,53,0.2)" : "none",
                    }}>
                      <div style={{ fontSize: "22px", marginBottom: "4px" }}>{m.icon}</div>
                      <div style={{
                        fontFamily: "'Kanit', sans-serif", fontSize: "12px",
                        fontWeight: selected ? "600" : "400",
                        color: selected ? "#FF6B35" : "#555", lineHeight: 1.2
                      }}>{m.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #f0e8e4, transparent)", margin: "24px 0" }} />

            {/* Q4 */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <span style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #FF6B35, #F7C59F)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Kanit', sans-serif", fontWeight: "700",
                  fontSize: "14px", color: "#fff", flexShrink: 0,
                  boxShadow: "0 2px 8px rgba(255,107,53,0.4)"
                }}>4</span>
                <h2 style={{
                  fontFamily: "'Kanit', sans-serif", fontWeight: "600",
                  fontSize: "18px", color: "#1a1a2e", margin: 0, lineHeight: 1.3
                }}>สิ่งสำคัญที่สุดเมื่อเลือกเส้นทาง <span style={{ fontWeight: "300", fontSize: "14px", color: "#aaa" }}>(เลือก 1 ข้อ)</span></h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {routePriorities.map(p => {
                  const sel = routePriority === p.id;
                  return (
                    <button key={p.id} onClick={() => setRoutePriority(p.id)} style={{
                      display: "flex", alignItems: "center", gap: "14px",
                      padding: "12px 16px", borderRadius: "12px", textAlign: "left",
                      border: sel ? "2px solid #FF6B35" : "1.5px solid #e8e8f0",
                      background: sel ? "linear-gradient(135deg, #FFF0EB, #FFE4D6)" : "#fafafa",
                      cursor: "pointer", transition: "all 0.15s",
                      boxShadow: sel ? "0 2px 12px rgba(255,107,53,0.2)" : "none",
                    }}>
                      <span style={{ fontSize: "20px", flexShrink: 0 }}>{p.icon}</span>
                      <span style={{
                        fontFamily: "'Kanit', sans-serif", fontSize: "14px",
                        fontWeight: sel ? "600" : "400", color: sel ? "#FF6B35" : "#555", flex: 1
                      }}>{p.label}</span>
                      <span style={{
                        width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0,
                        border: `2px solid ${sel ? "#FF6B35" : "#ddd"}`,
                        background: sel ? "#FF6B35" : "white",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {sel && <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "white", display: "block" }} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {error && (
            <div style={{
              padding: "12px 16px", borderRadius: "10px",
              background: "#FFF0EB", border: "1px solid #FFD0BC",
              fontFamily: "'Kanit', sans-serif", fontSize: "14px",
              color: "#D44", marginBottom: "12px", textAlign: "center"
            }}>⚠️ {error}</div>
          )}

          {/* <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #f0e8e4, transparent)", margin: "24px 0" }} /> */}

          <button onClick={handleSubmit} style={{
            width: "100%", padding: "16px",
            borderRadius: "14px", border: "none",
            background: "linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)",
            color: "#fff", fontFamily: "'Kanit', sans-serif",
            fontWeight: "700", fontSize: "17px", cursor: "pointer",
            boxShadow: "0 6px 24px rgba(255,107,53,0.4)",
            letterSpacing: "0.3px", transition: "transform 0.1s, box-shadow 0.1s",
          }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            ส่งคำตอบ →
          </button>

          {/* {responses.length > 0 && (
            <p
              onClick={() => setStep("results")}
              style={{
                textAlign: "center", fontFamily: "'Kanit', sans-serif",
                fontSize: "13px", color: "#FF6B35", marginTop: "14px",
                cursor: "pointer", textDecoration: "underline"
              }}
            >ดูผลสำรวจ ({responses.length} คำตอบ)</p>
          )} */}
        </div>
      </div>
    </>
  );
}