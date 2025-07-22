// src/pages/TreeView.jsx
import React, { useState, useEffect, useRef } from "react";
import Tree from "react-d3-tree";
import { useTranslation } from "react-i18next";
import CustomNode from "../components/CustomNode"; // Custom node renderer

// Language-specific data
import deokuliAnerieyePeopleData_en from "../i18n/locales/en/Deokuli_A_All.json";
import deokuliAnerieyePeopleData_hi from "../i18n/locales/hi/DeokuliAneriyeAll_hi.json";
//import deokuliAnerieyePeopleData_kaithi from "../i18n/locales/kaithi/DeokuliAneriyeAll_kaithi.json";
//import deokuliAnerieyePeopleData_mai from "../i18n/locales/mai/DeokuliAneriyeAll_mai.json";

function TreeView() {
  const { i18n } = useTranslation();
  const [treeData, setTreeData] = useState(null);
  const treeContainer = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [currentZoom, setCurrentZoom] = useState(1.75);

  // Select correct language data
  let localizedData = deokuliAnerieyePeopleData_en;
  if (i18n.language === "hi") {
    localizedData = deokuliAnerieyePeopleData_hi;
  } else if (i18n.language === "kaithi") {
    localizedData = deokuliAnerieyePeopleData_hi;
  } else if (i18n.language === "mai") {
    localizedData = deokuliAnerieyePeopleData_hi;
  }

  useEffect(() => {
    if (treeContainer.current) {
      const dimensions = treeContainer.current.getBoundingClientRect();
      setTranslate({ x: dimensions.width / 2, y: 100 });
    }

    const idToNodeMap = {};
    const roots = [];

    // First pass: map PersonID to tree nodes
    localizedData.forEach((person) => {
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
    });

    // Second pass: build parent-child relationships
    localizedData.forEach((person) => {
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
  }, [i18n.language]); // <-- Refresh tree on language change

  return (
    <div
      style={{ width: "100%", height: "100vh", backgroundColor: "#f7f7f7" }}
      ref={treeContainer}
    >
      {treeData && (
        <Tree
          data={treeData}
          translate={translate}
          zoom={currentZoom}
          collapsible
          orientation="vertical"
          pathFunc="step"
          nodeSize={{ x: 520, y: 320 }}
          separation={{ siblings: 1.2, nonSiblings: 2 }}
          renderCustomNodeElement={(rd3tProps) => (
    <CustomNode {...rd3tProps} zoom={currentZoom} />
  )}
  onZoom={(zoom) => setCurrentZoom(zoom.k)} // <- Capture zoom scale
        />
      )}
    </div>
  );
}

export default TreeView;
