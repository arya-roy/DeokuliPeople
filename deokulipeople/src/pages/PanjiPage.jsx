import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { calculatePanji } from "../utils/calculatePanji";
import { useTranslation } from "react-i18next";
import { loadPeopleData } from "../utils/loadPeopleData";

const PanjiPage = () => {
  const { personId } = useParams();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const [peopleData, setPeopleData] = useState(null);

  useEffect(() => {
    let active = true;
    loadPeopleData(i18n.language).then((data) => {
      if (active) {
        setPeopleData(data || []);
      }
    });

    return () => {
      active = false;
    };
  }, [i18n.language]);

  if (!peopleData) {
    return <div>{t("loading", "Loading...")}</div>;
  }

  const panjiData = calculatePanji(personId, peopleData);

  // Group by generation
  const grouped = {};
  panjiData.forEach((entry) => {
    const gen = entry.generation;
    if (!grouped[gen]) grouped[gen] = [];
    grouped[gen].push(entry);
  });

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
       {t("back", "Go Back")}
      </button>

      <h1 className="text-2xl font-bold mb-6 text-center">
        {t("panji.title", "🧬 Panji Generation Record")}
      </h1>

      {Object.keys(grouped)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map((gen) => (
          <div key={gen} className="mb-6 border-b pb-4">
            <h2 className="text-lg font-semibold mb-3 border-l-4 pl-2 border-blue-500">
              {t("generation", "Generation")} {gen}
            </h2>

            {grouped[gen]?.map((entry, idx) => (
              <div
                key={idx}
                className="p-2 mb-2 border rounded shadow-sm bg-gray-50"
              >
                <p>
                  <strong>{t("label", "Title")}:</strong> {t(entry.label)}
                </p>
                <p>
                  <strong>{t("name", "Name")}:</strong>{" "}
                  {entry.name ? entry.name : <em>—</em>}
                </p>
                <p>
                  <strong>{t("village", "Village")}:</strong>{" "}
                  {entry.village ? entry.village : <em>—</em>}
                </p>
                
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default PanjiPage;
