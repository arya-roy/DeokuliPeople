// src/components/AncestorListView.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import localized data
import personDataEn from "../i18n/locales/en/Deokuli_A_All.json";
import personDataHi from "../i18n/locales/hi/DeokuliAneriyeAll_hi.json";
//import personDataMai from "../i18n/locales/mai/DeokuliAneriyeAll_mai.json";
//import personDataKaithi from "../i18n/locales/kaithi/DeokuliAneriyeAll_kaithi.json";

const AncestorListView = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  // Pick language-specific data
  const language = i18n.language;
  let personData;
  switch (language) {
    case "hi":
      personData = personDataHi;
      break;
    case "mai":
      personData = personDataHi;
      break;
    case "kaithi":
      personData = personDataHi;
      break;
    default:
      personData = personDataEn;
  }

  const idToPerson = {};
  personData.forEach((p) => {
    idToPerson[p._id] = p;
  });

  const computeAncestors = (personId, generation = 0, result = []) => {
    const person = idToPerson[personId];
    if (!person) return result;

    result.push({ ...person, generation });

    const fatherId = person.ParentID;
    if (fatherId) {
      computeAncestors(fatherId, generation + 1, result);
    }

    return result;
  };

  const ancestors = computeAncestors(id);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{t("ancestorListTitle", "Ancestor List")}</h2>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>{t("generation", "Generation")}</th>
            <th>{t("name", "Name")}</th>
            <th>{t("father", "Father")}</th>
            <th>{t("alive", "Alive?")}</th>
          </tr>
        </thead>
        <tbody>
          {ancestors.map((person) => (
            <tr key={person._id}>
              <td>{person.generation}</td>
              <td>
                <Link to={`/person/${person._id}`}>
                  {person.name || person.Name}
                </Link>
              </td>
              <td>
                {person.ParentID && idToPerson[person.ParentID]
                  ? idToPerson[person.ParentID].name
                  : "-"}
              </td>
              <td>{person.Alive || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AncestorListView;
