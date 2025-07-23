import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Tree from "react-d3-tree";
import { buildCombinedTree } from "../utils/transformToTreeData"; // ✅ Correct import

import deokuliAnerieyePeopleData_en from "../i18n/locales/en/Deokuli_A_All.json";
import deokuliAnerieyePeopleData_hi from "../i18n/locales/hi/DeokuliAneriyeAll_hi.json";
import { useTranslation } from "react-i18next";


const CombinedTreeGraphPage = () => {
  const { personId } = useParams();
console.log("PersonID from URL:", personId); // 👈 log this

  const { i18n, t } = useTranslation();
  const [treeData, setTreeData] = useState(null);
  const navigate = useNavigate();

  let peopleData = deokuliAnerieyePeopleData_en;
  if (i18n.language === "hi" || i18n.language === "mai"|| i18n.language === "kaithi") {
    peopleData = deokuliAnerieyePeopleData_hi;
  }


  useEffect(() => {
  if (!personId || !peopleData) return;

  const selectedPerson = peopleData.find((p) => {
    const match = String(p.PersonID) === String(personId);
    if (match) console.log("Matched person:", p);
    return match;
  });

  console.log("Selected Person:", selectedPerson); // ✅ Safe now

  if (!selectedPerson) return;

  const tree = buildCombinedTree(personId, peopleData);
  console.log("Generated Tree Structure:", tree);

  setTreeData(tree);
}, [personId, i18n.language]);


  return (

    <div>
      
      <button onClick={() => navigate(-1)}>{t("back", "⬅️ Go Back")}</button>
      
      

    <div style={{ width: "100%", height: "100vh" }}>
      {treeData ? (
        <Tree
          data={treeData}
          orientation="vertical"
          pathFunc="elbow"
          collapsible={true}
          translate={{ x: window.innerWidth / 2, y: 100 }}
          nodeSize={{ x: 200, y: 100 }}
        />
      ) : (
        <p>Loading tree...</p>
      )}
    </div>
    </div>
  );
};

export default CombinedTreeGraphPage;
