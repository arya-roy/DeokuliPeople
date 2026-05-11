import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { loadPeopleData } from "../utils/loadPeopleData";

const PeopleList = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredPeople = peopleData.filter((person) => {
    const name = person.Name || "";
    const search = searchTerm.toLowerCase();

    return name.toLowerCase().includes(search);
  });

  if (loading) {
    return (
      <div className="p-4">
        <button onClick={() => navigate(-1)}>{t("back", "⬅️ Go Back")}</button>
        <p>{t("loading", "Loading...")}</p>
      </div>
    );
  }

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
