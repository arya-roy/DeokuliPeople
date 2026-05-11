import React, { Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";
import "./i18n/i18n.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const PeopleList = lazy(() => import("./pages/PeopleList"));
const TreeView = lazy(() => import("./pages/TreeView"));
const PersonDetail = lazy(() => import("./pages/PersonDetail"));
const GroupDetailPage = lazy(() => import("./pages/GroupDetailPage.jsx"));
const GroupSummary = lazy(() => import("./pages/GroupSummary"));
const GroupPeopleList = lazy(() => import("./pages/GroupPeopleList.jsx"));
const GroupSummaryTable = lazy(() => import("./pages/GroupSummaryTable.jsx"));
const AncestorTreePage = lazy(() => import("./pages/AncestorTreePage"));
const DescendantTreePage = lazy(() => import("./pages/DescendantTreePage"));
const DescendantsStatsPage = lazy(() => import("./pages/DescendantsStatsPage"));
const CombinedTreePage = lazy(() => import("./pages/CombinedTreePage"));
const CombinedTreeGraphPage = lazy(() => import("./pages/CombinedTreeGraphPage"));
const PanjiPage = lazy(() => import("./pages/PanjiPage"));
const PanjiPage1 = lazy(() => import("./pages/PanjiPage1"));



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
          <Link to="/list">{t('People List')}</Link>|{" "}
          <Link to="/tree">{t('Tree View')}</Link>|{" "}
          
          <select onChange={(e) => changeLanguage(e.target.value)} value={i18n.language}>
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="mai">मैथिली</option>
            <option value="kaithi">कैथी</option>
          </select>

        </nav>
        <Suspense fallback={<div>Loading...</div>}>
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
        <Route path="/combined-tree-view/:personId" element={<CombinedTreeGraphPage />} />
        <Route path="/combined-tree-graph/:personId" element={<CombinedTreeGraphPage />} />
        <Route path="/combined-tree/:personId" element={<CombinedTreeGraphPage />} />
        <Route path="/panji/:personId" element={<PanjiPage />} />
        <Route path="/panji1/:personId" element={<PanjiPage1 />} />




        </Routes>
        </Suspense>
      </div>
    </Router>
  );

  }

export default App;