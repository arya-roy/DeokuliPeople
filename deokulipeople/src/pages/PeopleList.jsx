import React from "react";
import deokuliAnerieyePeopleData_en from "../i18n/locales/en/Deokuli_A_All.json";
import deokuliAnerieyePeopleData_hi from "../i18n/locales/hi/DeokuliAneriyeAll_hi.json";
//import deokuliAnerieyePeopleData_kaithi from "../i18n/locales/kaithi/DeokuliAneriyeAll_kaithi.json"; // Add Kaithi

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const PeopleList = () => {
  const { t, i18n } = useTranslation();

  // Determine dataset based on selected language
  let peopleData = deokuliAnerieyePeopleData_en;
  if (i18n.language === "hi") {
    peopleData = deokuliAnerieyePeopleData_hi;
  } 
  else if (i18n.language === "kaithi") {
    peopleData = deokuliAnerieyePeopleData_hi;
  } else if (i18n.language === "mai") {
    peopleData = deokuliAnerieyePeopleData_hi;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{t("peopleList.title")}</h1>
      <ul>
        {peopleData.map((person) => (
          <li key={person.PersonID}>
            <Link to={`/person/${person.PersonID}`} className="text-blue-600 hover:underline">
              {person.Name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeopleList;
