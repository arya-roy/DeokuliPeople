// src/pages/GroupSummaryTable.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { slugify } from "../utils/utils";

const groupData = [
  // Paste your full dataset here as array of objects like:
   {
    name: "Aneriye All Including Bhaginman",
    isBabhnaiye: false,
    waasi: "",
    gotra: "",
    mool: "",
    total: 1260,
    alive: 800,
    deceased: 460,
  },
  {
    name: "Aneriye",
    isBabhnaiye: false,
    waasi: "Bhirha → Hansi → Deokuli",
    gotra: "Sandilya",
    mool: "Peerapur",
    total: 1235,
    alive: 778,
    deceased: 457,
  },
  {
    name: "Anerieye Bhaginman",
    isBabhnaiye: false,
    waasi: "",
    gotra: "",
    mool: "",
    total: 25,
    alive: 22,
    deceased: 3,
  },
  {
    name: "Anerieye Bhaginman Fucho Jha Nawada",
    isBabhnaiye: false,
    waasi: "Nawada",
    gotra: "",
    mool: "",
    total: 12,
    alive: 10,
    deceased: 2,
  },
  {
    name: "Anerieye Bhaginman Ram Manoj Chaudhary Sahasram",
    isBabhnaiye: false,
    waasi: "Sahasram",
    gotra: "",
    mool: "",
    total: 11,
    alive: 10,
    deceased: 1,
  },
  {
    name: "Anerieye Bhaginman Chandra Sekhar Roy Bithauli",
    isBabhnaiye: false,
    waasi: "Bithauli",
    gotra: "",
    mool: "",
    total: 2,
    alive: 2,
    deceased: 0,
  },
  {
    name: "Babhnaiyai All",
    isBabhnaiye: true,
    waasi: "",
    gotra: "",
    mool: "",
    total: 608,
    alive: 462,
    deceased: 146,
  },
  {
    name: "Bhaginman Hansi Wala Aneriye",
    isBabhnaiye: false,
    waasi: "Hansi",
    gotra: "Sandilya",
    mool: "Peerapur",
    total: 13,
    alive: 11,
    deceased: 2,
  },
  {
    name: "Kari Kummar",
    isBabhnaiye: true,
    waasi: "",
    gotra: "",
    mool: "",
    total: 57,
    alive: 44,
    deceased: 13,
  },
  {
    name: "Kari Kummar All",
    isBabhnaiye: true,
    waasi: "",
    gotra: "",
    mool: "",
    total: 70,
    alive: 55,
    deceased: 15,
  },
  {
    name: "Kummar Tetrahi",
    isBabhnaiye: true,
    waasi: "",
    gotra: "",
    mool: "",
    total: 199,
    alive: 151,
    deceased: 48,
  },
  {
    name: "Thakur",
    isBabhnaiye: true,
    waasi: "Bhith Bhagwanpur",
    gotra: "Sandilya",
    mool: "",
    total: 92,
    alive: 74,
    deceased: 18,
  },
  {
    name: "Vinod Jha",
    isBabhnaiye: true,
    waasi: "",
    gotra: "",
    mool: "",
    total: 56,
    alive: 36,
    deceased: 20,
  },
  {
    name: "Lukhar Jha",
    isBabhnaiye: true,
    waasi: "Kabilpur",
    gotra: "",
    mool: "",
    total: 26,
    alive: 19,
    deceased: 7,
  },
  {
    name: "Buchkun Jha",
    isBabhnaiye: true,
    waasi: "Kaligaon",
    gotra: "Bharadwaj",
    mool: "",
    total: 11,
    alive: 10,
    deceased: 1,
  },
  {
    name: "Pandiji Jha",
    isBabhnaiye: true,
    waasi: "Dasaut",
    gotra: "",
    mool: "",
    total: 54,
    alive: 46,
    deceased: 8,
  },
  {
    name: "Mishra",
    isBabhnaiye: true,
    waasi: "Kahua",
    gotra: "",
    mool: "",
    total: 75,
    alive: 57,
    deceased: 18,
  },
  {
    name: "Chandrakant Jha",
    isBabhnaiye: true,
    waasi: "",
    gotra: "",
    mool: "",
    total: 16,
    alive: 8,
    deceased: 8,
  },
  {
    name: "Daani Jha",
    isBabhnaiye: true,
    waasi: "",
    gotra: "",
    mool: "",
    total: 9,
    alive: 6,
    deceased: 3,
  },
  {
    name: "All",
    isBabhnaiye: null,
    waasi: "",
    gotra: "",
    mool: "",
    total: 1868,
    alive: 1262,
    deceased: 606,
  },
  {
    name: "Anerieye All",
    isBabhnaiye: false,
    waasi: "",
    gotra: "",
    mool: "",
    total: 1269,
    alive: 808,
    deceased: 462,
  },
  {
    name: "Pahil Aath Aana",
    isBabhnaiye: false,
    waasi: "",
    gotra: "",
    mool: "",
    total: 468,
    alive: 307,
    deceased: 160,
  },
  {
    name: "Baake Roy Ghar",
    isBabhnaiye: false,
    waasi: "",
    gotra: "",
    mool: "",
    total: 311,
    alive: 191,
    deceased: 119,
  },
  {
    name: "Baake Roy Ghar Purab",
    isBabhnaiye: false,
    waasi: "",
    gotra: "",
    mool: "",
    total: 149,
    alive: null,
    deceased: null,
  },
  {
    name: "Baake Roy Ghar Paschim",
    isBabhnaiye: false,
    waasi: "",
    gotra: "",
    mool: "",
    total: 162,
    alive: null,
    deceased: null,
  },
  {
    name: "Ajab Narayan Roy Ghar",
    isBabhnaiye: false,
    waasi: "",
    gotra: "",
    mool: "",
    total: 157,
    alive: 116,
    deceased: 41,
  },
  {
    name: "Dosar Aath Aana",
    isBabhnaiye: false,
    waasi: "",
    gotra: "",
    mool: "",
    total: 801,
    alive: 501,
    deceased: 302,
  },
  {
    name: "Pachkhuti",
    isBabhnaiye: false,
    waasi: "",
    gotra: "",
    mool: "",
    total: 334,
    alive: 216,
    deceased: 118,
  },
  {
    name: "Pachkhuti Bichla Tol",
    isBabhnaiye: false,
    waasi: "",
    gotra: "",
    mool: "",
    total: null,
    alive: null,
    deceased: null,
  },
  {
    name: "Pachkhuti Pachhwari Tol",
    isBabhnaiye: false,
    waasi: "",
    gotra: "",
    mool: "",
    total: null,
    alive: null,
    deceased: null,
  },
  {
    name: "Taikhuti",
    isBabhnaiye: false,
    waasi: "",
    gotra: "",
    mool: "",
    total: 199,
    alive: 133,
    deceased: 70,
  },
  {
    name: "Taikhuti 4 farik",
    isBabhnaiye: false,
    waasi: "",
    gotra: "",
    mool: "",
    total: 130,
    alive: 96,
    deceased: 34,
  },
  {
    name: "Taikhuti 4 farik dih",
    isBabhnaiye: false,
    waasi: "",
    gotra: "",
    mool: "",
    total: 69,
    alive: 37,
    deceased: 36,
  },
  {
    name: "Choubhaiya",
    isBabhnaiye: false,
    waasi: "",
    gotra: "",
    mool: "",
    total: 268,
    alive: 152,
    deceased: 114,
  },
  {
    name: "Choubhaiya Purab",
    isBabhnaiye: false,
    waasi: "",
    gotra: "",
    mool: "",
    total: 174,
    alive: null,
    deceased: null,
  },
  {
    name: "Choubhiya Paschim",
    isBabhnaiye: false,
    waasi: "",
    gotra: "",
    mool: "",
    total: 94,
    alive: null,
    deceased: null,
  },
  // ... Add the rest
];

const GroupSummaryTable = () => {
  const [showAneriye, setShowAneriye] = useState(true);
  const [showBabhnaiye, setShowBabhnaiye] = useState(true);

  const aneriyeGroups = groupData.filter((g) => !g.isBabhnaiye);
  const babhnaiyeGroups = groupData.filter((g) => g.isBabhnaiye);

  return (
    <div className="group-summary-container">
      <h2>Group Summary (Collapsible)</h2>

      {/* Aneriye Section */}
      <div className="group-section">
        <h3
          onClick={() => setShowAneriye((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          {showAneriye ? "▼" : "▶"} Aneriye Groups
        </h3>
        {showAneriye && (
          <table className="group-table">
            <thead>
              <tr>
                <th>Ghar</th>
                <th>Is Babhnaiye</th>
                <th>Waasi</th>
                <th>Gotra</th>
                <th>Mool</th>
                <th>Total Male People</th>
                <th>Total Male Alive</th>
                <th>Total Male Deceased</th>
              </tr>
            </thead>
            <tbody>
              {aneriyeGroups.map((group, i) => (
                <tr key={i}>
                  <td>
                    <Link to={`/group/${slugify(group.name)}`} className="text-blue-600 hover:underline">
                      {group.name}
                    </Link>
                  </td>
                  <td>{group.isBabhnaiye ? "Yes" : "No"}</td>
                  <td>{group.waasi || "-"}</td>
                  <td>{group.gotra || "-"}</td>
                  <td>{group.mool || "-"}</td>
                  <td>{group.total}</td>
                  <td>{group.alive}</td>
                  <td>{group.deceased}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Babhnaiye Section */}
      <div className="group-section" style={{ marginTop: "30px" }}>
        <h3
          onClick={() => setShowBabhnaiye((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          {showBabhnaiye ? "▼" : "▶"} Babhnaiye Groups
        </h3>
        {showBabhnaiye && (
          <table className="group-table">
            <thead>
              <tr>
                <th>Ghar</th>
                <th>Is Babhnaiye</th>
                <th>Waasi</th>
                <th>Gotra</th>
                <th>Mool</th>
                <th>Total Male People</th>
                <th>Total Male Alive</th>
                <th>Total Male Deceased</th>
              </tr>
            </thead>
            <tbody>
              {babhnaiyeGroups.map((group, i) => (
                <tr key={i}>
                  <td>
                    <Link to={`/group/${slugify(group.name)}`} className="text-blue-600 hover:underline">
                      {group.name}
                    </Link>
                  </td>
                  <td>{group.isBabhnaiye ? "Yes" : "No"}</td>
                  <td>{group.waasi || "-"}</td>
                  <td>{group.gotra || "-"}</td>
                  <td>{group.mool || "-"}</td>
                  <td>{group.total}</td>
                  <td>{group.alive}</td>
                  <td>{group.deceased}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default GroupSummaryTable;
