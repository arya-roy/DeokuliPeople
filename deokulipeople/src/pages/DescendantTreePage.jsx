// src/pages/DescendantTreePage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/TreeStyles.css";
import { loadPeopleData } from "../utils/loadPeopleData";

function DescendantTreePage() {
  const { personId } = useParams();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const [data, setData] = useState(null);

  useEffect(() => {
    let active = true;
    loadPeopleData(i18n.language).then((loadedData) => {
      if (active) {
        setData(loadedData || []);
      }
    });
    return () => {
      active = false;
    };
  }, [i18n.language]);

  if (!data) {
    return <div>{t("loading", "Loading...")}</div>;
  }

  // Create a lookup map
  const idMap = new Map();
  data.forEach((person) => {
    idMap.set(person.PersonID, person);
  });

  // Debug logs
  console.log("Language:", i18n.language);
  console.log("personId from URL:", personId);
  console.log("Sample data length:", data.length);
  console.log("Sample PersonID in data:", data.slice(0, 5).map((p) => p.PersonID));
  console.log("Does personId exist in data?", idMap.has(personId));

  // Recursive function to get descendants grouped by generation
  const buildDescendants = (id, generation = 0) => {
    const person = idMap.get(id);
    if (!person) return [];

    const current = {
      generation,
      person,
    };

    const children = data.filter((p) => p.ParentID === id);
    const descendants = [];

    for (const child of children) {
      descendants.push(...buildDescendants(child.PersonID, generation + 1));
    }

    return [current, ...descendants];
  };

  const descendants = buildDescendants(personId);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{t("descendantTree")}</h2>
      <button onClick={() => navigate(-1)}>{t("back", "⬅️ Go Back")}</button>

      {descendants.length === 0 ? (
        <p>{t("noDescendants", "No descendants found.")}</p>
      ) : (
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          {descendants.map(({ generation, person }) => (
              <li
                  key={person.PersonID}
                  className={`generation-${generation}`}
                  style={{
                      marginBottom: "1rem",
                      border: "1px solid #ccc",
                      padding: "0.5rem",
                      borderRadius: "8px"
                  }}
              >

              <strong>{t("generation", "Generation")}: {generation}</strong><br />
              {t("name", "Name")}: {person.Name}<br />
              {t("fatherName", "Father's Name")}: {person["Father's Name"] || "-"}<br />
              {t("motherVillage", "Mother's Village")}: {person["Mother's Village"] || "-"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DescendantTreePage;
