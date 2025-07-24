import React, { useState } from "react";
import deokuliAnerieyePeopleData_en from "../i18n/locales/en/Deokuli_A_All.json";
import deokuliAnerieyePeopleData_hi from "../i18n/locales/hi/DeokuliAneriyeAll_hi.json";
// import deokuliAnerieyePeopleData_kaithi from "../i18n/locales/kaithi/DeokuliAneriyeAll_kaithi.json";

import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const PeopleList = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Determine dataset based on selected language
  let peopleData = deokuliAnerieyePeopleData_en;
  if (i18n.language === "hi") {
    peopleData = deokuliAnerieyePeopleData_hi;
  } else if (i18n.language === "kaithi") {
    peopleData = deokuliAnerieyePeopleData_hi;
  } else if (i18n.language === "mai") {
    peopleData = deokuliAnerieyePeopleData_hi;
  }

  const filteredPeople = peopleData.filter((person) => {
    const name = person.Name || "";
    const search = searchTerm.toLowerCase();

    return (name.toLowerCase().includes(search));
  });

  return (
    <div className="p-4">
      <button onClick={() => navigate(-1)}>{t("back", "⬅️ Go Back")}</button>

      <h1 className="text-xl font-bold mb-4">{t("peopleList1.title")}</h1>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={t("searchPlaceholder", "Search by name")}
        className="mb-4 px-3 py-2 border border-gray-300 rounded w-full max-w-md"
      />

      {filteredPeople.length === 0 ? (
        <p>{t("noResults", "No people found")}</p>
      ) : (
        <ul>
          {filteredPeople.map((person) => (
            <li key={person.PersonID} className="mb-1">
              <Link
                to={`/person/${person.PersonID}`}
                className="text-blue-600 hover:underline"
              >
                {person.Name}
              </Link>
              {person.Ghar && <span className="text-sm text-gray-500 ml-2">({person.Ghar})</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PeopleList;
