import React from "react";
import { useTranslation } from "react-i18next";
import "./i18n/i18n.js";
import peopleData from "./data/people.json";
import deokuliAnerieyePeopleDataEnglish from "./i18n/locales/en/Deokuli_A_All.json";
import deokuliAnerieyePeopleDataHindi from "./i18n/locales/hi/DeokuliAneriyeAll_hi.json";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import PeopleList from "./pages/PeopleList";
import TreeView from "./pages/TreeView";
import PersonDetail from "./pages/PersonDetail";
import GroupDetailPage from "./pages/GroupDetailPage.jsx";
import GroupSummary from "./pages/GroupSummary";
import GroupPeopleList from "./pages/GroupPeopleList.jsx";
import GroupSummaryTable from "./pages/GroupSummaryTable.jsx";
import AncestorTreePage from "./pages/AncestorTreePage";
import DescendantTreePage from "./pages/DescendantTreePage";
import DescendantsStatsPage from "./pages/DescendantsStatsPage";
import CombinedTreePage from "./pages/CombinedTreePage";


function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <div>
        <nav className="p-4 bg-gray-200 shadow-md flex gap-4">
          
          <Link to="/">{t('Home')}</Link> |{" "}
          <Link to="/">{t('People List')}</Link>
          <Link to="/tree">{t('Tree View')}</Link>
          
          <select onChange={(e) => changeLanguage(e.target.value)} value={i18n.language}>
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="mai">मैथिली</option>
            <option value="kaithi">कैथी</option>
          </select>

        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/list" element={<PeopleList />} />
        <Route path="/tree" element={<TreeView />} />
        <Route path="/person/:id" element={<PersonDetail />} />
        <Route path="/group/:groupId" element={<GroupDetailPage />} />
        <Route path="/group/:groupName" element={<GroupSummary />} />
        <Route path="/group-people" element={<GroupPeopleList />} />
        <Route path="/group-summary-table" element={<GroupSummaryTable />} />
        <Route path="/summary" element={<GroupSummary />} />
        <Route path="/ancestors/:personId" element={<AncestorTreePage />} />
        <Route path="/descendants/:personId" element={<DescendantTreePage />} />
        <Route path="/descendants-stats/:personId" element={<DescendantsStatsPage />} />
        <Route path="/combined/:id" element={<CombinedTreePage />} />


        </Routes>
      </div>
    </Router>
  );

  }

export default App;