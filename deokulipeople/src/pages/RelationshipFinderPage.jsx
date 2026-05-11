import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { loadPeopleData } from "../utils/loadPeopleData";
import { findCommonAncestors, calculateRelationship, findConnectionPath } from "../utils/relationshipUtils";

const RelationshipFinderPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [peopleData, setPeopleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [person1, setPerson1] = useState('');
  const [person2, setPerson2] = useState('');
  const [searchQuery1, setSearchQuery1] = useState('');
  const [searchQuery2, setSearchQuery2] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);

    loadPeopleData(i18n.language).then((data) => {
      if (active) {
        const people = data || [];
        setPeopleData(people);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [i18n.language]);

  const handleFindRelationship = () => {
    if (!person1 || !person2) {
      setError(t('selectBothPeople', 'Please select both people'));
      return;
    }

    const p1 = peopleData.find(p => String(p.PersonID) === String(person1));
    const p2 = peopleData.find(p => String(p.PersonID) === String(person2));

    if (!p1 || !p2) {
      setError(t('peopleNotFound', 'One or both people not found'));
      return;
    }

    if (p1.PersonID === p2.PersonID) {
      setError(t('samePerson', 'Cannot find relationship with the same person'));
      return;
    }

    setError('');

    const commonAncestors = findCommonAncestors(p1, p2, peopleData);
    const relationship = calculateRelationship(p1, p2, commonAncestors, peopleData);
    const path = findConnectionPath(p1, p2, peopleData);

    setResults({
      person1: p1,
      person2: p2,
      commonAncestors,
      relationship,
      path
    });
  };

  const handleSearchQuery1Change = (value) => {
    setSearchQuery1(value);
  };

  const handleSearchQuery2Change = (value) => {
    setSearchQuery2(value);
  };

  const clearResults = () => {
    setResults(null);
    setError('');
    setPerson1('');
    setPerson2('');
    setSearchQuery1('');
    setSearchQuery2('');
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

      <h1 className="text-2xl font-bold mb-6">
        {t("relationshipFinder", "Relationship Finder")}
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {t('person1', 'Person 1')}
            </label>
            <input
              type="text"
              value={searchQuery1}
              onChange={(e) => handleSearchQuery1Change(e.target.value)}
              placeholder={t('searchPerson', 'Search by name or ID...')}
              className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={person1}
              onChange={(e) => setPerson1(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{t('selectPerson', 'Select Person')}</option>
              {peopleData
                .filter(person =>
                  person.Name.toLowerCase().includes(searchQuery1.toLowerCase()) ||
                  String(person.PersonID).includes(searchQuery1)
                )
                .map(person => (
                  <option key={person.PersonID} value={person.PersonID}>
                    {person.Name} (ID: {person.PersonID})
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t('person2', 'Person 2')}
            </label>
            <input
              type="text"
              value={searchQuery2}
              onChange={(e) => handleSearchQuery2Change(e.target.value)}
              placeholder={t('searchPerson', 'Search by name or ID...')}
              className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={person2}
              onChange={(e) => setPerson2(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{t('selectPerson', 'Select Person')}</option>
              {peopleData
                .filter(person =>
                  person.Name.toLowerCase().includes(searchQuery2.toLowerCase()) ||
                  String(person.PersonID).includes(searchQuery2)
                )
                .map(person => (
                  <option key={person.PersonID} value={person.PersonID}>
                    {person.Name} (ID: {person.PersonID})
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleFindRelationship}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {t('findRelationship', 'Find Relationship')}
          </button>
          {results && (
            <button
              onClick={clearResults}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              {t('clear', 'Clear')}
            </button>
          )}
        </div>

        {error && (
          <p className="mt-4 text-red-600">{error}</p>
        )}
      </div>

      {results && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {t('relationship', 'Relationship')}
            </h2>
            <p className="text-lg">
              <Link to={`/person/${results.person1.PersonID}`} className="text-blue-600 hover:underline">
                {results.person1.Name}
              </Link>
              {' '}and{' '}
              <Link to={`/person/${results.person2.PersonID}`} className="text-blue-600 hover:underline">
                {results.person2.Name}
              </Link>
              {' '}are {results.relationship}.
            </p>
          </div>

          {results.commonAncestors.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                {t('commonAncestors', 'Common Ancestors')}
              </h2>
              <div className="space-y-2">
                {results.commonAncestors.map(ancestor => (
                  <div key={ancestor.PersonID} className="flex items-center gap-2">
                    <Link
                      to={`/person/${ancestor.PersonID}`}
                      className="text-blue-600 hover:underline"
                    >
                      {ancestor.Name}
                    </Link>
                    <span className="text-sm text-gray-600">(ID: {ancestor.PersonID})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.path && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                {t('connectionPath', 'Connection Path')}
              </h2>
              <div className="text-sm">
                {results.path}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RelationshipFinderPage;