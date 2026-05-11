import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { loadPeopleData } from "../utils/loadPeopleData";

const PeopleList = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [peopleData, setPeopleData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    loadPeopleData(i18n.language).then((data) => {
      if (active) {
        setPeopleData(data || []);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [i18n.language]);

  if (loading) {
    return (
      <div className="p-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          {t("back", "⬅️ Go Back")}
        </button>
        <p>{t("loading", "Loading...")}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        {t("back", "⬅️ Go Back")}
      </button>

      <h1 className="text-xl font-bold mb-4">{t("peopleList1.title", "People List")}</h1>
      <p className="mb-4 text-sm text-gray-600">
        {t('peopleListHint', 'This is the concise people list view.')} {' '}
        <Link to="/advanced-search" className="text-blue-600 hover:underline">
          {t('search.advancedSearch', 'Advanced Search')}
        </Link>
      </p>

      <div className="mb-4 text-sm text-gray-600">
        {t('showingResults', 'Showing {{count}} of {{total}} people', {
          count: peopleData.length,
          total: peopleData.length
        })}
      </div>

      {peopleData.length === 0 ? (
        <p className="text-center py-8 text-gray-500">
          {t("noResults", "No people found matching your search criteria")}
        </p>
      ) : (
        <ul className="space-y-3">
          {peopleData.map((person) => (
            <li key={person.PersonID} className="bg-white p-4 rounded-lg shadow-sm border">
              <Link
                to={`/person/${person.PersonID}`}
                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
              >
                {person.Name || t('unknown', 'Unknown')}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PeopleList;
