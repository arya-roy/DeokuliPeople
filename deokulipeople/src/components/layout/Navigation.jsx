import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES, LANGUAGES } from "../../constants/routes";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "mai", name: "मैथिली" },
  { code: "kaithi", name: "कैथी" },
];

export default function Navigation() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="p-4 bg-gray-200 shadow-md flex gap-4">
      <Link to={ROUTES.HOME}>{t('Home')}</Link> |{" "}
      <Link to={ROUTES.PEOPLE_LIST}>{t('People List')}</Link>|{" "}
      <Link to={ROUTES.ADVANCED_SEARCH}>{t('search.advancedSearch', 'Advanced Search')}</Link>|{" "}
      <Link to={ROUTES.RELATIONSHIP_FINDER}>{t('relationshipFinder', 'Relationship Finder')}</Link>|{" "}
      <Link to={ROUTES.TREE_VIEW}>{t('Tree View')}</Link>|{" "}
      <Link to={ROUTES.ADMIN}>Admin</Link>|{" "}

      <select onChange={(e) => changeLanguage(e.target.value)} value={i18n.language}>
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </nav>
  );
}