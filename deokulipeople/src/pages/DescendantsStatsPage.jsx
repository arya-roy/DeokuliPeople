// src/pages/DescendantsStatsPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import englishData from "../i18n/locales/en/Deokuli_A_All.json";
import hindiData from "../i18n/locales/hi/DeokuliAneriyeAll_hi.json";

const DescendantsStatsPage = () => {
  const { personId } = useParams();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  // Select data based on language
  const getLocalizedData = () => {
    switch (i18n.language) {
      case "hi":
        return hindiData;
      case "mai":
      case "kaithi":
        return hindiData;
      case "en":
      default:
        return englishData;
    }
  };

  const data = getLocalizedData();

  // Lookup Map
  const idMap = new Map(data.map(p => [p.PersonID, p]));

 // const { personId } = useParams();
console.log("PersonID from URL:", personId);

const selectedPerson = data.find(p => p.PersonID === personId);
console.log("Matched person:", selectedPerson);

if (!selectedPerson) {
  console.warn("Person not found for ID:", personId);
}


  // Recursive function to collect descendants grouped by generation
  const getDescendantsGrouped = (startId) => {
    const groups = {};
    const stack = [{ id: startId, generation: 0 }];

    while (stack.length) {
      const { id, generation } = stack.pop();
      const children = data.filter(p => p.ParentID === id);

      if (children.length > 0) {
        if (!groups[generation + 1]) {
          groups[generation + 1] = [];
        }

        for (const child of children) {
          groups[generation + 1].push(child);
          stack.push({ id: child.PersonID, generation: generation + 1 });
        }
      }
    }

    return groups;
  };

  if (!personId || !idMap.has(personId)) {
    return <div>Invalid Person ID</div>;
  }

  const groupedDescendants = getDescendantsGrouped(personId);
  const totalCount = Object.values(groupedDescendants).flat().length;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{t("descendantTreeTitle", "Descendant Stats Tree")}</h2>
      <button onClick={() => navigate(-1)}>{t("back", "⬅️ Go Back")}</button>

      <p><strong>{t("totalDescendants", "Total Descendants")}: {totalCount}</strong></p>

      {Object.keys(groupedDescendants).sort((a, b) => a - b).map((gen) => (
        <div key={gen} style={{ margin: "1rem 0", padding: "1rem", background: "#f0f0f0", borderRadius: "8px" }}>
          <h3>{t("generation", "Generation")} {gen} ({groupedDescendants[gen].length})</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {groupedDescendants[gen].map(person => (
              <div key={person.PersonID} style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "5px", minWidth: "150px" }}>
                <strong>{person.Name}</strong><br />
                <small>{person["Father's Name"] || "N/A"}</small>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DescendantsStatsPage;
