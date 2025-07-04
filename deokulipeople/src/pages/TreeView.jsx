// src/pages/TreeView.jsx
import React, { useState, useEffect, useRef } from "react";
import Tree from "react-d3-tree";
import peopleData from "../data/people.json";

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

    // Step 1: Create all nodes
    peopleData.forEach((person) => {
      const node = {
        name: person["Name"] || "Unknown",
        attributes: {
          "Father's Name": person["Father's Name"] || "",
          "Mother's Village": person["Mother's Village"] || "",
          Alive: person["Alive"] || "",
        },
        children: [],
      };
      idToNodeMap[person["PersonID"]] = node;
      nameToIdMap[person["Name"]] = person["PersonID"];
    });

    // Step 2: Assign children
    peopleData.forEach((person) => {
      const fatherName = person["Father's Name"];
      const childId = person["PersonID"];
      const fatherId = nameToIdMap[fatherName];

      if (fatherId && idToNodeMap[fatherId]) {
        idToNodeMap[fatherId].children.push(idToNodeMap[childId]);
      } else {
        roots.push(idToNodeMap[childId]); // No valid father, so root node
      }
    });

    // Step 3: Ensure valid root structure
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
          pathFunc="elbow"
        />
      )}
    </div>
  );
}

export default TreeView;
