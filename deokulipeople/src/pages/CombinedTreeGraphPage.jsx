import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Tree from "react-d3-tree";
import { buildCombinedTree } from "../utils/transformToTreeData"; // ✅ Correct import
import { useTranslation } from "react-i18next";
import { loadPeopleData } from "../utils/loadPeopleData";


const CombinedTreeGraphPage = () => {
  const { personId } = useParams();
  console.log("PersonID from URL:", personId); // 👈 log this

  const { i18n, t } = useTranslation();
  const [treeData, setTreeData] = useState(null);
  const [peopleData, setPeopleData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    loadPeopleData(i18n.language).then((data) => {
      if (active) {
        setPeopleData(data || []);
      }
    });
    return () => {
      active = false;
    };
  }, [i18n.language]);

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
}, [personId, peopleData]);

  if (!peopleData) {
    return <div>{t("loading", "Loading...")}</div>;
  }

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
