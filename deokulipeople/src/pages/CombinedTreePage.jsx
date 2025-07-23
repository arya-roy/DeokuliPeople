import React, { useState } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import deokuliAnerieyePeopleData_en from "../i18n/locales/en/Deokuli_A_All.json";
import deokuliAnerieyePeopleData_hi from "../i18n/locales/hi/DeokuliAneriyeAll_hi.json";
// import deokuliAnerieyePeopleData_mai from "../i18n/locales/mai/DeokuliAneriyeAll_mai.json";

import { getAncestorsGroupedByGeneration } from "../utils/getAncestorsGroupedByGeneration";
import { getDescendantsGroupedByGeneration } from "../utils/getDescendantsGroupedByGeneration";

const CombinedTreePage = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("card"); // "card" or "tree"

  // Load language-specific data
  let peopleData = deokuliAnerieyePeopleData_en;
  if (i18n.language === "hi") {
    peopleData = deokuliAnerieyePeopleData_hi;
  } else if (i18n.language === "mai") {
    peopleData = deokuliAnerieyePeopleData_hi;
  }

  const person = peopleData.find((p) => String(p.PersonID) === id);
  if (!person) return <div>{t("personDetail.notFound")}</div>;

  const ancestors = getAncestorsGroupedByGeneration(id, peopleData);
  const descendants = getDescendantsGroupedByGeneration(id, peopleData);

  const renderPeople = (peopleList) => {
    const filtered = peopleList.filter((p) =>
      p.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filtered
      .sort((a, b) => String(a.PersonID).localeCompare(String(b.PersonID)))
      .map((p) => (
        <div
          key={p.PersonID}
          className="border p-2 rounded bg-white shadow-sm w-fit text-sm"
        >
          {p.Name}
        </div>
      ));
  };

  return (
    <div className="p-4 space-y-6">
      <Link to={`/person/${id}`} className="text-blue-500 underline">
        ⬅ {t("back")}
      </Link>

      {/* Toggle View Mode */}
      <div className="flex items-center justify-between mt-2 mb-4">
        <input
          type="text"
          placeholder={t("search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <button
          onClick={() =>
            setViewMode(viewMode === "card" ? "tree" : "card")
          }
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          {viewMode === "card" ? t("treeView") : t("cardView")}
        </button>
      </div>

      {/* Graph Tree Navigation */}
      <div className="flex justify-end mt-2">
        <Link
          to={`/combined-tree-graph/${id}`}

          className="bg-gray-700 text-white px-4 py-2 rounded shadow hover:bg-gray-800"
        >
          📈 {t("graphView")}
        </Link>
      </div>

      {/* Ancestors */}
      <div className="border-l-4 border-green-600 pl-4 bg-green-50 py-2">
        <h2 className="text-lg font-bold mb-2 text-green-800">
          {t("ancestorTree.title")}
        </h2>
        {Object.keys(ancestors)
          .sort((a, b) => Number(a) - Number(b))
          .map((gen) => (
            <div key={gen} className="mb-3">
              <h3 className="font-semibold text-sm text-gray-600">
                {t("generation")} {gen}
              </h3>
              <div className="flex flex-wrap gap-2">
                {renderPeople(ancestors[gen])}
              </div>
            </div>
          ))}
      </div>

      {/* Current Person */}
      <div className="text-center my-6">
        <div className="text-lg font-bold text-blue-700 border-b pb-2 inline-block px-4 border-blue-400 bg-blue-50 rounded shadow">
          {person.Name}
        </div>
      </div>

      {/* Descendants */}
      <div className="border-l-4 border-purple-600 pl-4 bg-purple-50 py-2">
        <h2 className="text-lg font-bold mb-2 text-purple-800">
          {t("descendantTree.title")}
        </h2>
        {Object.keys(descendants)
          .sort((a, b) => Number(a) - Number(b))
          .map((gen) => (
            <div key={gen} className="mb-3">
              <h3 className="font-semibold text-sm text-gray-600">
                {t("generation")} {gen} ({descendants[gen].length} {t("total")})
              </h3>
              <div className="flex flex-wrap gap-2">
                {renderPeople(descendants[gen])}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CombinedTreePage;
