import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { loadPeopleData } from "../utils/loadPeopleData";
import AdvancedSearch from "../components/search/AdvancedSearch";

const AdvancedSearchPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [peopleData, setPeopleData] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    loadPeopleData(i18n.language).then((data) => {
      if (active) {
        const people = data || [];
        setPeopleData(people);
        setFilteredPeople(people);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [i18n.language]);

  const handleSearchResults = (results) => {
    setFilteredPeople(results);
  };

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

      <h1 className="text-xl font-bold mb-4">
        {t("search.advancedSearch", "Advanced Search")}
      </h1>

      <AdvancedSearch people={peopleData} onResultsChange={handleSearchResults} />

      <div className="mb-4 text-sm text-gray-600">
        {t("showingResults", "Showing {{count}} of {{total}} people", {
          count: filteredPeople.length,
          total: peopleData.length,
        })}
      </div>

      {filteredPeople.length === 0 ? (
        <p className="text-center py-8 text-gray-500">
          {t("noResults", "No people found matching your search criteria")}
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t('person_name', 'Name')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t('father_name', 'Father')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t("motherVillage", "Mother's Village")}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t('marriageVillage', 'Marriage Village')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t('alive', 'Alive')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t('married', 'Married')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredPeople.map((person) => {
                const isMarried = Boolean(
                  person["Marriage village"]?.toString().trim() ||
                  person["1st wife"]?.toString().trim() ||
                  person["2nd Wife"]?.toString().trim()
                );

                return (
                  <tr key={person.PersonID} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600 font-medium">
                      <Link to={`/person/${person.PersonID}`} className="hover:underline">
                        {person.Name || t('unknown', 'Unknown')}
                      </Link>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{person["Father's Name"] || '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{person["Mother's Village"] || '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{person["Marriage village"] || '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{person.Alive || '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{isMarried ? t('yes', 'Yes') : t('no', 'No')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearchPage;
