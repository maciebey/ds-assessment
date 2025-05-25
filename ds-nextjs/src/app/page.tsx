'use client';
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState('Loading');
  useEffect(() => {
    // fetch data from localhost:5000
    fetch("http://127.0.0.1:5000")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(JSON.stringify(data, null, 2));
      })
  }, [])
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {data}
    </div>
  );
}
