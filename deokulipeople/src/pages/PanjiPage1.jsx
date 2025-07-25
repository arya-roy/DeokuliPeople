import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../i18n/locales/en/Deokuli_A_All.json"; // or Hindi etc.
import { useTranslation } from "react-i18next";

const PanjiPage1 = () => {
  const { personId } = useParams();
  const navigate = useNavigate();
  const [panjiData, setPanjiData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (!personId) return;

    console.log("🔍 Starting Panji calculation for ID:", personId);

    const personMap = Object.fromEntries(data.map((p) => [p.PersonID, p]));
    const selfPerson = personMap[personId];

    if (!selfPerson) {
      console.warn("❌ Person not found with ID:", personId);
      return;
    }

    const findByName = (name) => {
      const person = data.find((p) => p.Name?.trim() === name?.trim());
      console.log(`🔎 Searching for Mother by name: "${name}" →`, person?.PersonID || "Not found");
      return person;
    };

    const getPaternalLineage = (startId, maxGenerations = 7) => {
      const result = [];
      let currentId = startId;
      for (let gen = 1; gen <= maxGenerations; gen++) {
        const person = personMap[currentId];
        if (!person) {
          console.warn(`⚠️ No person found for ID: ${currentId}`);
          break;
        }

        const title =
          gen === 1
            ? "Father"
            : gen === 2
            ? "Grandfather"
            : `${gen}th Gen Ancestor`;

        const fatherName = person["Father's Name"] || "Unknown";

        result.push({
          generation: gen,
          title,
          name: fatherName,
          village: "Deokuli Dham",
        });

        console.log(
          `📌 Paternal Gen ${gen} - ${title}: ${fatherName} (ID: ${person.ParentID})`
        );

        currentId = person.ParentID;
        if (!currentId) break;
      }
      return result;
    };

    const getMaternalLineage = (startId, maxGenerations = 4) => {
      const result = [];
      let currentId = startId;

      for (let gen = 1; gen <= maxGenerations; gen++) {
        const person = personMap[currentId];
        if (!person) {
          console.warn(`⚠️ No person found for ID: ${currentId}`);
          break;
        }

        const motherName = person["Mother's Name"] || "Unknown";
        const motherVillage = person["Mother's Village"] || "Unknown";

        const title =
          gen === 1
            ? "Mother"
            : gen === 2
            ? "Maternal Grandmother"
            : gen === 3
            ? "Maternal Great Grandmother"
            : `${gen}th Gen Maternal Ancestor`;

        result.push({
          generation: gen,
          title,
          name: motherName,
          village: motherVillage,
        });

        console.log(`📌 Maternal Gen ${gen} - ${title}: ${motherName} (${motherVillage})`);

        const motherPerson = findByName(motherName);
        if (!motherPerson || !motherPerson.ParentID) break;

        currentId = motherPerson.PersonID;
      }

      return result;
    };

    const paternalLine = getPaternalLineage(personId);
    const maternalLine = getMaternalLineage(personId);

    const fullPanji = [
      {
        generation: 0,
        title: "Self",
        name: selfPerson.Name || "Unknown",
        village: selfPerson["Marriage village"] || "Deokuli Dham",
      },
      ...paternalLine,
      ...maternalLine,
    ];

    console.log("✅ Full Panji Data:", fullPanji);
    setPanjiData(fullPanji);
  }, [personId]);

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 mb-4"
      >
        ⬅️ {t("back", "Back")}
      </button>

      <h1 className="text-2xl font-bold mb-4">{t("panjiTitle", "Panji Record")}</h1>

      <div className="space-y-3">
        {panjiData
          .sort((a, b) => a.generation - b.generation)
          .map((entry, index) => (
            <div
              key={index}
              className="border p-3 rounded bg-white shadow-md"
            >
              <div className="font-semibold text-gray-700">{entry.title}</div>
              <div>Name: {entry.name || "Unknown"}</div>
              <div>Village: {entry.village || "Unknown"}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PanjiPage1;
