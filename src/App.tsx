import { useEffect, useState, type ChangeEvent } from "react";
import TextField from "./components/TextField";

export default function App() {
  const [qrBase64, setQrBase64] = useState<string>("");
  const [data, setData] = useState<string>("");
  // const data = "https://weather-app-lilac-delta-44.vercel.app/";

  const fetchQr = () => {
    if (!data) {
      console.log("ต้องกรอกข้อมูลก่อนสร้าง QR");
      return;
    }
    fetch(`https://api.api-ninjas.com/v1/qrcode?format=png&data=${data}`, {
      headers: { "x-api-key": "zWotgNnav2c7qXTFodK3Sg==GRL0AZf710CarL2N" },
    })
      .then((res) => {
        console.log("Content-Type:", res.headers.get("Content-Type"));
        return res.text();
      })
      .then((base64) => {
        setQrBase64(base64);
        console.log(base64)
      })
      .catch((err) => {
        console.log("fetch error", err);
      });
  };

  useEffect(() => {
    fetchQr();
  }, []);

  return (
    <section className="w-full bg-white rounded-lg p-4">
      <div className="w-full pad-main">
        <TextField
          id="data"
          name="data"
          value={data}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setData(e.target.value)}
        />
      </div>
      <button className="w-fit bg-rose-200 p-4 rounded-lg" onClick={fetchQr}>
        QR Code Generate
      </button>
      <img src={`data:image/png;base64,${qrBase64}`} />
    </section>
  );
}