import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { searchPeople, getSearchSuggestions, getFilterOptions } from "../../utils/searchUtils";

export default function AdvancedSearch({ people, onResultsChange, initialQuery = "" }) {
  const { t } = useTranslation();
  const [searchCriteria, setSearchCriteria] = useState({
    query: initialQuery,
    aliveStatus: 'all',
    married: 'all',
    hasChildren: undefined,
    hasParents: undefined,
    marriageVillage: '',
    motherVillage: '',
    generation: ''
  });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filterOptions, setFilterOptions] = useState(null);

  useEffect(() => {
    if (people && people.length > 0) {
      setFilterOptions(getFilterOptions(people));
    }
  }, [people]);

  useEffect(() => {
    // Perform search whenever criteria change
    if (people && people.length > 0) {
      const results = searchPeople(people, searchCriteria);
      onResultsChange(results);
    }
  }, [people, searchCriteria, onResultsChange]);

  const handleQueryChange = (value) => {
    setSearchCriteria(prev => ({ ...prev, query: value }));

    // Show suggestions for queries longer than 2 characters
    if (value.length >= 2 && people) {
      const newSuggestions = getSearchSuggestions(people, value);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchCriteria(prev => ({ ...prev, query: suggestion }));
    setShowSuggestions(false);
  };

  const clearFilters = () => {
    setSearchCriteria({
      query: '',
      aliveStatus: 'all',
      married: 'all',
      hasChildren: undefined,
      hasParents: undefined,
      marriageVillage: '',
      motherVillage: '',
      generation: ''
    });
  };

  const hasActiveFilters = () => {
    return searchCriteria.query ||
           searchCriteria.aliveStatus !== 'all' ||
           searchCriteria.married !== 'all' ||
           searchCriteria.hasChildren !== undefined ||
           searchCriteria.hasParents !== undefined ||
           searchCriteria.marriageVillage ||
           searchCriteria.motherVillage ||
           searchCriteria.generation;
  };

  return (
    <div className="advanced-search bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{t('advancedSearch', 'Advanced Search')}</h3>
        {hasActiveFilters() && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            {t('clearFilters', 'Clear Filters')}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Search Query */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">
            {t('search', 'Search')}
          </label>
          <input
            type="text"
            value={searchCriteria.query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder={t('searchPlaceholder', 'Search names, locations, etc.')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {showSuggestions && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Alive Status */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('aliveStatus', 'Alive Status')}
          </label>
          <select
            value={searchCriteria.aliveStatus}
            onChange={(e) => setSearchCriteria(prev => ({ ...prev, aliveStatus: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{t('all', 'All')}</option>
            <option value="yes">{t('alive', 'Alive')} ({filterOptions?.aliveCount.yes || 0})</option>
            <option value="no">{t('deceased', 'Deceased')} ({filterOptions?.aliveCount.no || 0})</option>
          </select>
        </div>

        {/* Has Children */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('hasChildren', 'Has Children')}
          </label>
          <select
            value={searchCriteria.hasChildren === undefined ? '' : searchCriteria.hasChildren.toString()}
            onChange={(e) => setSearchCriteria(prev => ({
              ...prev,
              hasChildren: e.target.value === '' ? undefined : e.target.value === 'true'
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t('all', 'All')}</option>
            <option value="true">{t('yes', 'Yes')} ({filterOptions?.hasChildrenCount.yes || 0})</option>
            <option value="false">{t('no', 'No')} ({filterOptions?.hasChildrenCount.no || 0})</option>
          </select>
        </div>

        {/* Married Status */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('married', 'Married')}
          </label>
          <select
            value={searchCriteria.married}
            onChange={(e) => setSearchCriteria(prev => ({ ...prev, married: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{t('all', 'All')}</option>
            <option value="yes">{t('yes', 'Yes')} ({filterOptions?.marriedCount?.yes || 0})</option>
            <option value="no">{t('no', 'No')} ({filterOptions?.marriedCount?.no || 0})</option>
          </select>
        </div>

        {/* Marriage Village */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('marriageVillage', 'Marriage Village')}
          </label>
          <select
            value={searchCriteria.marriageVillage}
            onChange={(e) => setSearchCriteria(prev => ({ ...prev, marriageVillage: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t('allMarriageVillages', 'All Marriage Villages')}</option>
            {filterOptions?.marriageVillages.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Mother's Village */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('motherVillage', "Mother's Village")}
          </label>
          <select
            value={searchCriteria.motherVillage}
            onChange={(e) => setSearchCriteria(prev => ({ ...prev, motherVillage: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t('allMotherVillages', 'All Mother Villages')}</option>
            {filterOptions?.motherVillages.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Generation */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('generation', 'Generation')}
          </label>
          <select
            value={searchCriteria.generation}
            onChange={(e) => setSearchCriteria(prev => ({ ...prev, generation: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t('allGenerations', 'All Generations')}</option>
            {filterOptions?.generations.map(gen => (
              <option key={gen} value={gen}>{t('generationNum', 'Generation')} {gen}</option>
            ))}
          </select>
        </div>

        {/* Has Parents */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('hasParents', 'Has Parents')}
          </label>
          <select
            value={searchCriteria.hasParents === undefined ? '' : searchCriteria.hasParents.toString()}
            onChange={(e) => setSearchCriteria(prev => ({
              ...prev,
              hasParents: e.target.value === '' ? undefined : e.target.value === 'true'
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t('all', 'All')}</option>
            <option value="true">{t('yes', 'Yes')}</option>
            <option value="false">{t('no', 'No')}</option>
          </select>
        </div>
      </div>
    </div>
  );
}