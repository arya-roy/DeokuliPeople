import React from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

import deokuliAnerieyePeopleData_en from "../i18n/locales/en/Deokuli_A_All.json";
import deokuliAnerieyePeopleData_hi from "../i18n/locales/hi/DeokuliAneriyeAll_hi.json";
//import deokuliAnerieyePeopleData_kaithi from "../i18n/locales/kaithi/DeokuliAneriyeAll_kaithi.json";

import { useTranslation } from "react-i18next";

const PersonDetail = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  // Choose dataset based on selected language
  let peopleData = deokuliAnerieyePeopleData_en;
  if (i18n.language === "hi") {
    peopleData = deokuliAnerieyePeopleData_hi;
  } else if (i18n.language === "kaithi") {
    peopleData = deokuliAnerieyePeopleData_hi;
  } else if (i18n.language === "mai") {
    peopleData = deokuliAnerieyePeopleData_hi; // fallback to Hindi for Maithili
  }

  const person = peopleData.find((p) => String(p.PersonID) === id);

  if (!person) return <div>{t("personDetail.notFound")}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{person.Name}</h2>
      <ul className="space-y-1">
        <li><strong>{t("personDetail.father")}:</strong> {person["Father's Name"]}</li>
        <li><strong>{t("personDetail.mother")}:</strong> {person["Mother's Name"]}</li>
        <li><strong>{t("personDetail.motherVillage")}:</strong> {person["Mother's Village"]}</li>
        <li><strong>{t("personDetail.alive")}:</strong> {person.Alive}</li>
        <li><strong>{t("personDetail.marriageVillage")}:</strong> {person["Marriage village"]}</li>
        <li><strong>{t("personDetail.alias")}:</strong> {person["Alias Name"]}</li>
        <li><strong>{t("personDetail.firstWife")}:</strong> {person["1st wife"]}</li>
        <li><strong>{t("personDetail.secondWife")}:</strong> {person["2nd Wife"]}</li>

        <div className="mt-4 space-y-2">
          <p></p>
          <Link to={`/ancestors/${person.PersonID}`} className="block text-blue-600 underline">
            {t("personDetail.viewAncestorTree")}
          </Link>
          <p></p>
          <Link to={`/descendants/${person.PersonID}`} className="block text-green-600 underline">
            {t("personDetail.viewDescendantTree")}
          </Link>
          <p></p>
          <Link to={`/descendants-stats/${person.PersonID}`} className="block text-green-600 underline">
            {t("personDetail.viewDescendantStats")}
          </Link>
          <p></p>
          <Link to={`/combined/${person.PersonID}`} className="ancestor-link">
            🌳 {t("viewCombinedTree")}
          </Link>
          <p></p>

          <button onClick={() => navigate(-1)}>{t("back", "⬅️ Go Back")}</button>
        </div>



      </ul>
    </div>
  );
};

export default PersonDetail;
