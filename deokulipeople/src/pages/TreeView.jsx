// src/pages/TreeView.jsx
import React, { useState, useEffect, useRef } from "react";
import Tree from "react-d3-tree";
import { useNavigate } from "react-router-dom";
import peopleData from "../data/people.json";

import deokuliAnerieyePeopleDataEnglish from "../i18n/locales/en/Deokuli_A_All.json";
import deokuliAnerieyePeopleDataHindi from "../i18n/locales/hi/DeokuliAneriyeAll_hi.json";
import CustomNode from "../components/CustomNode"; // ⬅️ Import it

function TreeView() {
  const [treeData, setTreeData] = useState(null);
  const treeContainer = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (treeContainer.current) {
      const dimensions = treeContainer.current.getBoundingClientRect();
      setTranslate({ x: dimensions.width / 2, y: 100 });
    }

    const idToNodeMap = {};
    const nameToIdMap = {};
    const roots = [];

    deokuliAnerieyePeopleDataEnglish.forEach((person) => {
      const node = {
        name: person["Name"] || "Unknown",
        attributes: {
          "Father's Name": person["Father's Name"] || "",
          "Mother's Village": person["Mother's Village"] || "",
          "Parent ID": person["ParentID"] || "99",
          Alive: person["Alive"] || "",
        },
        children: [],
        _id: person["PersonID"],
      };
      idToNodeMap[person["PersonID"]] = node;
      nameToIdMap[person["Name"]] = person["PersonID"];
    });

    deokuliAnerieyePeopleDataEnglish.forEach((person) => {
      const fatherName = person["Father's Name"];
      const childId = person["PersonID"];
      const fatherId = person["ParentID"];

      if (fatherId && idToNodeMap[fatherId]) {
        idToNodeMap[fatherId].children.push(idToNodeMap[childId]);
      } else {
        roots.push(idToNodeMap[childId]);
      }
    });

    const finalTreeData =
      roots.length === 1
        ? roots[0]
        : {
            name: "Family Tree",
            children: roots,
          };

    setTreeData(finalTreeData);
  }, []);

  return (
    <div
      style={{ width: "100%", height: "100vh", backgroundColor: "#f7f7f7" }}
      ref={treeContainer}
    >
      {treeData && (
        <Tree
  data={treeData}
  translate={translate}
  zoomable
  zoom={0.75}
  collapsible
  orientation="vertical"
  pathFunc="step" // Try "step", "diagonal", or "straight"
  nodeSize={{ x: 220, y: 120 }}
  separation={{ siblings: 1.2, nonSiblings: 2 }}
  renderCustomNodeElement={(rd3tProps) => <CustomNode {...rd3tProps} />}
/>

      )}
    </div>
  );
}

export default TreeView;
