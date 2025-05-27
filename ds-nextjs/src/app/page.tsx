'use client';
import Card from "@/components/Card";
import Grid from "@/components/Grid";
import Insights from "@/components/Insights";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export interface Row {
  date: string;//Date;
  Usage_kWh: number;
  'Lagging_Current_Reactive.Power_kVarh': number;
  Leading_Current_Reactive_Power_kVarh: number;
  'CO2(tCO2)': number;
  Lagging_Current_Power_Factor: number;
  Leading_Current_Power_Factor: number;
  NSM: number;
  // TODO these could be enum
  WeekStatus: string;
  Day_of_week: string;
  Load_Type: string;
}

export default function Home() {
  const [data, setData] = useState<null | Row[]>(null);

  const now = new Date();
  console.log("Current date and time:", now.toISOString());
  console.log("Current date and time (local):", now.toLocaleString());
  console.log("Current date and time (UTC):", now.toUTCString());
  console.log("Current date and time (ISO):", now.toISOString());
  console.log("Current date and time (timestamp):", now.getTime());

  // TODO: implement real timezone fix like: https://stackoverflow.com/a/61157388
  const [startDate, setStartDate] = useState(new Date('2018-01-01T08:00:00Z'));
  const [endDate, setEndDate] = useState(new Date('2018-01-03T08:00:00Z'));

  const fetchRows = (start: Date, end: Date) => {
    setData(null);
    const url = `http://127.0.0.1:5000/?start_date=${start.toISOString()}&end_date=${end.toISOString()}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const c: Row[] = data.map((row: any) => ({
          ...row,
          // using DateString formatting on ag-grid, would probhably need to
          // be adjusted for costumer preference in future
          date: (new Date(row.date)).toISOString(),
        }));
        setData(c);
      })
  }

  useEffect(() => {
    fetchRows(startDate, endDate);
  }, [])

  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <div className="mx-32 my-16">
      {/* date select */}
      <Card className="flex items-center">
        <div>
          Start Date:<DatePicker selected={startDate} onChange={(date) => date ? setStartDate(date) : null} />
        </div>
        <div>
          End Date:<DatePicker selected={endDate} onChange={(date) => date ? setEndDate(date) : null} />
        </div>
        <button
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          onClick={() => {
            fetchRows(startDate, endDate);
          }
          }
        >
          Fetch Data
        </button>
      </Card>

      {/* selected dates debug */}
      {/* <Card className="flex">
        <div>
          {`Selected Start Date: ${startDate.toISOString()}`}
        </div>
        <div className="ml-4">
          {`Selected End Date: ${endDate.toISOString()}`}
        </div>
      </Card> */}

      <div className="flex">
        {/* agGrid  */}
        <Card className="grow">
          {data === null ? "Loading..." : (
            <>
              <div className="text-2xl pb-4">Raw Data <span className="text-base">{`Row Count: ${data!.length}`}</span></div>
              <Grid rowData={data!} />
              {/* <pre>{JSON.stringify(data, null, 2)} </pre>*/}
            </>
          )}
        </Card>
        {/* Insight Search  */}
        <Card className="basis-1/3 ml-1">
          {data === null ? "Loading..." : (
            <>
              <div className="text-2xl pb-4">Insight Search</div>
              <Insights rowData={data!} />
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
