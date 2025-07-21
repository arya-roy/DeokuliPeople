import React from "react";
import { useTranslation } from "react-i18next";
import "./i18n/i18n.js";
import peopleData from "./data/people.json";
import deokuliAnerieyePeopleData from "./data/Deokuli_A_All.json";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import PeopleList from "./pages/PeopleList";
import TreeView from "./pages/TreeView";
import PersonDetail from "./pages/PersonDetail";
import GroupSummary from "./pages/GroupSummary";
import GroupPeopleList from "./pages/GroupPeopleList.jsx";
import GroupSummaryTable from "./pages/GroupSummaryTable.jsx";

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <div>
        <nav className="p-4 bg-gray-200 shadow-md flex gap-4">
          
           <Link to="/">Home</Link> |{" "}
          <Link to="/">People List</Link>
          <Link to="/tree">Tree View</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/list" element={<PeopleList />} />
        <Route path="/tree" element={<TreeView />} />
        <Route path="/person/:id" element={<PersonDetail />} />
        <Route path="/group/:groupName" element={<GroupSummary />} />
        <Route path="/group-people" element={<GroupPeopleList />} />
        <Route path="/group-summary-table" element={<GroupSummaryTable />} />
        <Route path="/summary" element={<GroupSummary />} />
        </Routes>
      </div>
    </Router>
  );

  }

export default App;