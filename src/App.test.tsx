// Temporary test file to diagnose rendering issue
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontFamily: "Helvetica, Arial, sans-serif"
    }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>LUMO Test</h1>
        <p style={{ fontSize: "24px", marginBottom: "30px" }}>
          Jika kamu bisa lihat ini, React works! ✅
        </p>
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            background: "white",
            color: "#667eea",
            padding: "15px 30px",
            fontSize: "18px",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Click Count: {count}
        </button>
        <p style={{ marginTop: "30px", opacity: 0.8 }}>
          Jika tombol ini bisa diklik, JavaScript works! ✅
        </p>
      </div>
    </div>
  );
}
