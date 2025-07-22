import { useState } from "react";
import peopleData from "../data/people.json";
import deokuliAnerieyePeopleDataEnglish from "../i18n/locales/en/Deokuli_A_All.json";
import deokuliAnerieyePeopleDataHindi from "../i18n/locales/hi/DeokuliAneriyeAll_hi.json";
import { Card } from "../components/ui/Card.jsx";
import { Link } from "react-router-dom";

const groupSummary = [
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
    waasi: "",
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
    isBabhnaiye: null,
    waasi: "",
    gotra: "",
    mool: "",
    total: 468,
    alive: 307,
    deceased: 160,
  },
  {
    name: "Baake Roy Ghar",
    isBabhnaiye: null,
    waasi: "",
    gotra: "",
    mool: "",
    total: 311,
    alive: 191,
    deceased: 119,
  },
  {
    name: "Baake Roy Ghar Purab",
    isBabhnaiye: null,
    waasi: "",
    gotra: "",
    mool: "",
    total: 149,
    alive: null,
    deceased: null,
  },
  {
    name: "Baake Roy Ghar Paschim",
    isBabhnaiye: null,
    waasi: "",
    gotra: "",
    mool: "",
    total: 162,
    alive: null,
    deceased: null,
  },
  {
    name: "Ajab Narayan Roy Ghar",
    isBabhnaiye: null,
    waasi: "",
    gotra: "",
    mool: "",
    total: 157,
    alive: 116,
    deceased: 41,
  },
  {
    name: "Dosar Aath Aana",
    isBabhnaiye: null,
    waasi: "",
    gotra: "",
    mool: "",
    total: 801,
    alive: 501,
    deceased: 302,
  },
  {
    name: "Pachkhuti",
    isBabhnaiye: null,
    waasi: "",
    gotra: "",
    mool: "",
    total: 334,
    alive: 216,
    deceased: 118,
  },
  {
    name: "Pachkhuti Bichla Tol",
    isBabhnaiye: null,
    waasi: "",
    gotra: "",
    mool: "",
    total: null,
    alive: null,
    deceased: null,
  },
  {
    name: "Pachkhuti Pachhwari Tol",
    isBabhnaiye: null,
    waasi: "",
    gotra: "",
    mool: "",
    total: null,
    alive: null,
    deceased: null,
  },
  {
    name: "Taikhuti",
    isBabhnaiye: null,
    waasi: "",
    gotra: "",
    mool: "",
    total: 199,
    alive: 133,
    deceased: 70,
  },
  {
    name: "Taikhuti 4 farik",
    isBabhnaiye: null,
    waasi: "",
    gotra: "",
    mool: "",
    total: 130,
    alive: 96,
    deceased: 34,
  },
  {
    name: "Taikhuti 4 farik dih",
    isBabhnaiye: null,
    waasi: "",
    gotra: "",
    mool: "",
    total: 69,
    alive: 37,
    deceased: 36,
  },
  {
    name: "Choubhaiya",
    isBabhnaiye: null,
    waasi: "",
    gotra: "",
    mool: "",
    total: 268,
    alive: 152,
    deceased: 114,
  },
  {
    name: "Choubhaiya Purab",
    isBabhnaiye: null,
    waasi: "",
    gotra: "",
    mool: "",
    total: 174,
    alive: null,
    deceased: null,
  },
  {
    name: "Choubhiya Paschim",
    isBabhnaiye: null,
    waasi: "",
    gotra: "",
    mool: "",
    total: 94,
    alive: null,
    deceased: null,
  },
];



export default function GroupPeopleList() {
  const [expandedGroup, setExpandedGroup] = useState(null);

  const groupedPeople = groupSummary.map((group) => {
    return {
      ...group,
      members: peopleData.filter((p) => p.group === group.name),
    };
  });

  const toggleGroup = (name) => {
    setExpandedGroup(expandedGroup === name ? null : name);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Group Summary</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 border">Ghar</th>
              <th className="px-3 py-2 border">Is Babhnaiye</th>
              <th className="px-3 py-2 border">Waasi</th>
              <th className="px-3 py-2 border">Gotra</th>
              <th className="px-3 py-2 border">Mool</th>
              <th className="px-3 py-2 border">Total Male</th>
              <th className="px-3 py-2 border">Alive</th>
              <th className="px-3 py-2 border">Deceased</th>
            </tr>
          </thead>
          <tbody>
            {groupedPeople.map((group) => (
              <tr
                key={group.name}
                onClick={() => toggleGroup(group.name)}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <td className="px-3 py-2 border font-medium text-blue-600">
                  {group.name}
                </td>
                <td className="px-3 py-2 border">{group.isBabhnaiye ? "YES" : "NO"}</td>
                <td className="px-3 py-2 border">{group.waasi}</td>
                <td className="px-3 py-2 border">{group.gotra}</td>
                <td className="px-3 py-2 border">{group.mool}</td>
                <td className="px-3 py-2 border">{group.total}</td>
                <td className="px-3 py-2 border">{group.alive}</td>
                <td className="px-3 py-2 border">{group.deceased}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {groupedPeople.map(
        (group) =>
          expandedGroup === group.name && (
            <Card key={group.name} className="p-4 mt-4">
              <h2 className="text-lg font-semibold mb-2">{group.name} Members</h2>
              <ul className="list-disc ml-6 space-y-1">
                {group.members.map((person) => (
                  <li key={person.id}>
                    <Link to={`/person/${person.id}`} className="text-blue-500 hover:underline">
                      {person.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          )
      )}
    </div>
  );
}
