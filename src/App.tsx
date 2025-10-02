import { useEffect, useState } from "react";

export default function ApiTest() {
  const [qrBase64, setQrBase64] = useState<string>("");
  const data = "https://weather-app-lilac-delta-44.vercel.app/";

  const fetchQr = () => {
    fetch(`https://api.api-ninjas.com/v1/qrcode?format=png&data=${data}`, {
      headers: { "x-api-key": "zWotgNnav2c7qXTFodK3Sg==GRL0AZf710CarL2N" },
    })
      .then((res) => {
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
      <section className="w-full flex flex-wrap gap-y-4 my-6">
        <img src={`data:image/png;base64,${qrBase64}`} alt="API Image" />

        {/* <div className="w-full flex justify-end gap-4">
          <button
            className={`p-4 px-6 rounded-xl bg-purple-500 text-white border active:scale-95 transition-all ${
              page > 1 ? "" : "hidden"
            }`}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Back
          </button>
          <button
            className="p-4 px-6 rounded-xl bg-purple-500 text-white border active:scale-95 transition-all"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div> */}
      </section>
    </section>
  );
}
