import React from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import deokuliAnerieyePeopleData_en from "../i18n/locales/en/Deokuli_A_All.json";
import deokuliAnerieyePeopleData_hi from "../i18n/locales/hi/DeokuliAneriyeAll_hi.json";
//import deokuliAnerieyePeopleData_mai from "../i18n/locales/mai/DeokuliAneriyeAll_mai.json";

import { getAncestorsGroupedByGeneration } from "../utils/getAncestorsGroupedByGeneration"
import { getDescendantsGroupedByGeneration } from "../utils/getDescendantsGroupedByGeneration";

const CombinedTreePage = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  // Load data by language
  let peopleData = deokuliAnerieyePeopleData_en;
  if (i18n.language === "hi") {
    peopleData = deokuliAnerieyePeopleData_hi;
  } else if (i18n.language === "mai") {
    peopleData = deokuliAnerieyePeopleData_hi;
  }

  const person = peopleData.find(p => String(p.PersonID) === id);
  if (!person) return <div>{t("personDetail.notFound")}</div>;

  const ancestors = getAncestorsGroupedByGeneration(id, peopleData);
  const descendants = getDescendantsGroupedByGeneration(id, peopleData);

  const renderPeople = (peopleList) => {
    const sorted = [...peopleList].sort((a, b) => String(a.PersonID).localeCompare(String(b.PersonID)));
    return sorted.map(p => (
      <div key={p.PersonID} className="border p-2 rounded bg-white shadow-sm w-fit text-sm">
        {p.Name} ({p.PersonID})
      </div>
    ));
  };

  return (
    <div className="p-4 space-y-6">
      <Link to={`/person/${id}`} className="text-blue-500 underline">
        ⬅ {t("back")}
      </Link>

      {/* Ancestors */}
      <div>
        <h2 className="text-lg font-bold mb-2">{t("ancestorTree.title")}</h2>
        {Object.keys(ancestors).sort((a, b) => Number(a) - Number(b)).map((gen) => (
          <div key={gen} className="mb-3">
            <h3 className="font-semibold text-sm text-gray-600">{t("generation")} {gen}</h3>
            <div className="flex flex-wrap gap-2">{renderPeople(ancestors[gen])}</div>
          </div>
        ))}
      </div>

      {/* Current Person */}
      <div className="text-center my-4">
        <div className="text-lg font-bold text-blue-700 border-b pb-2 inline-block">
          {person.Name} ({person.PersonID})
        </div>
      </div>

      {/* Descendants */}
      <div>
        <h2 className="text-lg font-bold mb-2">{t("descendantTree.title")}</h2>
        {Object.keys(descendants).sort((a, b) => Number(a) - Number(b)).map((gen) => (
          <div key={gen} className="mb-3">
            <h3 className="font-semibold text-sm text-gray-600">{t("generation")} {gen}</h3>
            <div className="flex flex-wrap gap-2">{renderPeople(descendants[gen])}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CombinedTreePage;
