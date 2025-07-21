import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "../components/ui/Card.jsx";

// Sample data
const initialData = [
  { Ghar: "Aneriye All Including Bhaginman", "Is Babhnaiye": "NO", Waasi: "Bhirha → Hansi → Deokuli	", Gotra: "", Mool: "", "Total Male People": 1260, "Total Male Alive": 800 },
  {},
  { Ghar: "Aneriye", "Is Babhnaiye": "NO", Gotra: "Sandilya",Waasi: "Bhirha → Hansi → Deokuli	", Mool: "Peerapur", "Total Male People": 1235, "Total Male Alive": 778 },
  {},
  { Ghar: "Anerieye Bhaginman", "Is Babhnaiye": "",Waasi: "", Gotra: "", Mool: "", "Total Male People": 25, "Total Male Alive": 22 },
  {},
  { Ghar: "Anerieye Bhaginman Fucho Jha Nawada", "Is Babhnaiye": "NO",Waasi: "Nawada", Gotra: "", Mool: "", "Total Male People": 12, "Total Male Alive": 10 },
  { Ghar: "Anerieye Bhaginman Ram Manoj Chaudhary Sahasram", "Is Babhnaiye": "NO",Waasi: "Sahasram", Gotra: "", Mool: "", "Total Male People": 11, "Total Male Alive": 10 },
  { Ghar: "Anerieye Bhaginman Chandra Sekhar Roy Bithauli", "Is Babhnaiye": "NO",Waasi: "Bithauli", Gotra: "", Mool: "", "Total Male People": 2, "Total Male Alive": 2 },
  {},

  { Ghar: "Babhnaiyai All", "Is Babhnaiye": "",Waasi: "", Gotra: "", Mool: "", "Total Male People": 608, "Total Male Alive": 462 },
  {},
  { Ghar: "Bhaginman Hansi Wala Aneriye", "Is Babhnaiye": "NO",Waasi: "Hansi", Gotra: "Sandilya", Mool: "Peerapur", "Total Male People": 13, "Total Male Alive": 11 },
  {},
  { Ghar: "Kari Kummar", "Is Babhnaiye": "YES",Waasi: "", Gotra: "", Mool: "", "Total Male People": 57, "Total Male Alive": 44 },
  {},
  { Ghar: "Kari Kummar All", "Is Babhnaiye": "YES",Waasi: "", Gotra: "", Mool: "", "Total Male People": 70, "Total Male Alive": 55 },
  {},
  { Ghar: "Kummar Tetrahi", "Is Babhnaiye": "YES",Waasi: "", Gotra: "", Mool: "", "Total Male People": 199, "Total Male Alive": 151 },
  { Ghar: "Thakur", "Is Babhnaiye": "YES",Waasi: "Bhith Bhagwanpur", Gotra: "Sandilya", Mool: "", "Total Male People": 92, "Total Male Alive": 74 },
  { Ghar: "Pandiji Jha", "Is Babhnaiye": "YES",Waasi: "Dasaut", Gotra: "", Mool: "", "Total Male People": 54, "Total Male Alive": 46 },
  { Ghar: "Mishra", "Is Babhnaiye": "YES",Waasi: "Kahua", Gotra: "", Mool: "", "Total Male People": 75, "Total Male Alive": 57 },
  { Ghar: "Vinod Jha", "Is Babhnaiye": "YES",Waasi: "", Gotra: "", Mool: "", "Total Male People": 56, "Total Male Alive": 36 },
  { Ghar: "Lukhar Jha", "Is Babhnaiye": "YES",Waasi: "Kabilpur", Gotra: "", Mool: "", "Total Male People": 26, "Total Male Alive": 19 },
  { Ghar: "Buchkun Jha", "Is Babhnaiye": "YES",Waasi: "Kaligaon", Gotra: "Bharadwaj", Mool: "", "Total Male People": 11, "Total Male Alive": 10 },
  { Ghar: "Chandrakant Jha", "Is Babhnaiye": "YES",Waasi: "", Gotra: "", Mool: "", "Total Male People": 16, "Total Male Alive": 8 },
  { Ghar: "Daani Jha", "Is Babhnaiye": "YES",Waasi: "", Gotra: "", Mool: "", "Total Male People": 9, "Total Male Alive": 6 },
  { Ghar: "Chandrakant Jha All", "Is Babhnaiye": "YES",Waasi: "", Gotra: "", Mool: "", "Total Male People": 25, "Total Male Alive": 14 },
];

// Utility to get gotra stats
function getGotraStats(data) {
  const gotraMap = {};
  const waasiMap ={};
  data.forEach((row) => {
    const gotra = row.Gotra || "Unknown";
    const waasi = row.Waasi || "Unknown";
    if (!gotraMap[gotra]) {
      gotraMap[gotra] = { gotra, total: 0, alive: 0 };
    }
    if (!waasiMap[waasi]) {
      waasiMap[waasi] = { waasi, total: 0, alive: 0 };
    }
    gotraMap[gotra].total += row["Total Male People"] || 0;
    gotraMap[gotra].alive += row["Total Male Alive"] || 0;
    waasiMap[waasi].total += row["Total Male People"] || 0;
    waasiMap[waasi].alive += row["Total Male Alive"] || 0;
  });
  return {
    gotraStats: Object.values(gotraMap),
    waasiStats: Object.values(waasiMap),
  };
}

export default function GroupSummary() {
  const [search, setSearch] = useState("");

  const filteredData = initialData.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  const { gotraStats, waasiStats } = getGotraStats(filteredData);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📋 Group Summary</h1>

      <input
        type="text"
        placeholder="🔍 Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 px-3 py-2 border rounded w-full max-w-md"
      />

      <div className="overflow-x-auto border rounded-md shadow-sm">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border">Ghar</th>
              <th className="p-2 border">Is Babhnaiye</th>
              <th className="p-2 border">Waasi</th>
              <th className="p-2 border">Gotra</th>
              <th className="p-2 border">Mool</th>
              <th className="p-2 border text-right">Total Males</th>
              <th className="p-2 border text-right">Alive Males</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-2 border">{row.Ghar}</td>
                <td className="p-2 border">{row["Is Babhnaiye"]}</td>
                <td className="p-2 border">{row.Waasi}</td>
                <td className="p-2 border">{row.Gotra}</td>
                <td className="p-2 border">{row.Mool}</td>
                <td className="p-2 border text-right">{row["Total Male People"]}</td>
                <td className="p-2 border text-right">{row["Total Male Alive"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold mt-10 mb-4">📚 Per-Gotra Statistics</h2>
      <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-md overflow-hidden text-sm mb-8">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Gotra</th>
            <th className="border p-2 text-right">Total Males</th>
            <th className="border p-2 text-right">Alive Males</th>
          </tr>
        </thead>
        <tbody>
          {gotraStats.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border p-2">{row.gotra}</td>
              <td className="border p-2 text-right">{row.total}</td>
              <td className="border p-2 text-right">{row.alive}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mb-2">📈 Gotra Distribution</h2>
      <div className="bg-white p-4 rounded-md shadow-sm">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={gotraStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="gotra" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" name="Total Males" />
            <Bar dataKey="alive" fill="#82ca9d" name="Alive Males" />
          </BarChart>
        </ResponsiveContainer>
      </div>

       <h2 className="text-xl font-semibold mt-10 mb-4">📚 Per-Waasi Statistics</h2>
      <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-md overflow-hidden text-sm mb-8">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Waasi</th>
            <th className="border p-2 text-right">Total Males</th>
            <th className="border p-2 text-right">Alive Males</th>
          </tr>
        </thead>
        <tbody>
          {waasiStats.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border p-2">{row.waasi}</td>
              <td className="border p-2 text-right">{row.total}</td>
              <td className="border p-2 text-right">{row.alive}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mb-2">📈 Waasi Distribution</h2>
      <div className="bg-white p-4 rounded-md shadow-sm">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={waasiStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="waasi" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" name="Total Males" />
            <Bar dataKey="alive" fill="#82ca9d" name="Alive Males" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
