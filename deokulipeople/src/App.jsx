import React, { Suspense, lazy } from "react";
import "./i18n/i18n.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/layout/Navigation";
import { ROUTES } from "./constants/routes";

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
const AdvancedSearchPage = lazy(() => import("./pages/AdvancedSearchPage"));
const RelationshipFinderPage = lazy(() => import("./pages/RelationshipFinderPage"));
const AdminPage = lazy(() => import("./pages/admin/AdminPage"));

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.PEOPLE_LIST} element={<PeopleList />} />
            <Route path={ROUTES.TREE_VIEW} element={<TreeView />} />
            <Route path={ROUTES.PERSON_DETAIL} element={<PersonDetail />} />
            <Route path={ROUTES.GROUP_DETAIL} element={<GroupDetailPage />} />
            <Route path={ROUTES.GROUP_SUMMARY} element={<GroupSummary />} />
            <Route path={ROUTES.GROUP_PEOPLE} element={<GroupPeopleList />} />
            <Route path={ROUTES.GROUP_SUMMARY_TABLE} element={<GroupSummaryTable />} />
            <Route path={ROUTES.SUMMARY} element={<GroupSummary />} />
            <Route path={ROUTES.ANCESTORS} element={<AncestorTreePage />} />
            <Route path={ROUTES.DESCENDANTS} element={<DescendantTreePage />} />
            <Route path={ROUTES.DESCENDANTS_STATS} element={<DescendantsStatsPage />} />
            <Route path={ROUTES.COMBINED} element={<CombinedTreePage />} />
            <Route path={ROUTES.COMBINED_TREE_VIEW} element={<CombinedTreeGraphPage />} />
            <Route path={ROUTES.COMBINED_TREE_GRAPH} element={<CombinedTreeGraphPage />} />
            <Route path={ROUTES.COMBINED_TREE} element={<CombinedTreeGraphPage />} />
            <Route path={ROUTES.PANJI} element={<PanjiPage />} />
            <Route path={ROUTES.PANJI1} element={<PanjiPage1 />} />
            <Route path={ROUTES.ADVANCED_SEARCH} element={<AdvancedSearchPage />} />
            <Route path={ROUTES.RELATIONSHIP_FINDER} element={<RelationshipFinderPage />} />
            <Route path={ROUTES.ADMIN} element={<AdminPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;