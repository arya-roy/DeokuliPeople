import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loadPeopleData } from "../utils/loadPeopleData";

const PersonDetail = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
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
          <Link
            to={`/panji/${person.PersonID}`}
            className="mt-2 inline-block text-blue-600 hover:underline"
          >
            🧬 {t("panji.viewPanji", "View Panji (Genealogy)")}
          </Link>
          <p></p>
                    <p></p>
          <Link
            to={`/panji1/${person.PersonID}`}
            className="mt-2 inline-block text-blue-600 hover:underline"
          >
            🧬 {t("panji.viewPanji", "View Panji (Genealogy)")}
          </Link>
          <p></p>


          <button onClick={() => navigate(-1)}>{t("back", "⬅️ Go Back")}</button>
        </div>



      </ul>
    </div>
  );
};

export default PersonDetail;
