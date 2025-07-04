import React from "react";
import { useTranslation } from "react-i18next";
import "./i18n/i18n.js";
import peopleData from "./data/people.json";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PeopleList from "./pages/PeopleList";
import TreeView from "./pages/TreeView";
import PersonDetail from "./pages/PersonDetail";

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <div>
        <nav className="p-4 bg-gray-200 shadow-md flex gap-4">
          <Link to="/">People List</Link>
          <Link to="/tree">Tree View</Link>
        </nav>
        <Routes>
          <Route path="/" element={<PeopleList />} />
          <Route path="/tree" element={<TreeView />} />
          <Route path="/person/:id" element={<PersonDetail />} />
        </Routes>
      </div>
    </Router>
  );

  }

export default App;