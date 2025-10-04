import { useEffect, useState, type ChangeEvent } from "react";
import TextField from "./components/TextField";

export default function App() {
  const [qrBase64, setQrBase64] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  // const data = "https://weather-app-lilac-delta-44.vercel.app/";

  const fetchQr = () => {
    if (!data) {
      console.log("ต้องกรอกข้อมูลก่อนสร้าง QR");
      return;
    }
    setLoading(true);
    fetch(`https://api.api-ninjas.com/v1/qrcode?format=png&data=${data}`, {
      headers: { "x-api-key": "zWotgNnav2c7qXTFodK3Sg==GRL0AZf710CarL2N" },
    })
      .then((res) => {
        setLoading(false);
        return res.text();
      })
      .then((base64) => {
        setQrBase64(base64);
        console.log(base64);
        setLoading(false);
      })
      .catch((err) => {
        console.log("fetch error", err);
      });
  };

  useEffect(() => {
    fetchQr();
  }, []);

  return (
    <section className="w-full min-h-screen bg-rose-100 p-4 flex justify-center items-center">
      <div className="w-8/12 h-6/12 bg-white p-8 rounded-lg">
        <h1 className="text-center font-bold">QR Code Generator</h1>
        <p className="text-red-500 text-center mt-2">**API from API Ninjas**</p>
        <div className="w-full flex flex-wrap mt-10 gap-y-4">
          <div className="w-full md:w-9/12">
            <TextField
              title="Enter URL"
              id="data"
              name="data"
              placeholder="Enter URL..."
              value={data}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData(e.target.value)}
            />
          </div>

          <div className="w-full md:w-3/12 md:mt-4 flex justify-center md:pl-2">
            <button className="w-full bg-rose-200 py-2 px-4 rounded-lg" onClick={fetchQr}>
              Generate
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col justify-center items-center">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <h1 className="text-5xl"> <i className="fa-solid fa-spinner text-rose-400 animate-spin"></i> </h1>
            </div>
          ) : (
            <>
              <img className={`${!data ? "hidden" : "w-10/12 lg:w-6/12"}`} src={`data:image/png;base64,${qrBase64}`} />
              <button type="submit" className={`${!data ? "hidden" : "w-full btn-base bg-rose-200"}`}>
                <p className="hidden md:block px-2">DownLoad</p>
                <i className="fa-solid fa-download"></i>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}