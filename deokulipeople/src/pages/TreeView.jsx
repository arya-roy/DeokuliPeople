// src/pages/TreeView.jsx
import React, { useState, useEffect, useRef } from "react";
import Tree from "react-d3-tree";
import { useTranslation } from "react-i18next";
import CustomNode from "../components/CustomNode"; // Custom node renderer
import { loadPeopleData } from "../utils/loadPeopleData";

function TreeView() {
  const { i18n } = useTranslation();
  const [peopleData, setPeopleData] = useState(null);
  const [treeData, setTreeData] = useState(null);
  const treeContainer = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [currentZoom, setCurrentZoom] = useState(1.75);

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
    if (!peopleData) return;

    if (treeContainer.current) {
      const dimensions = treeContainer.current.getBoundingClientRect();
      setTranslate({ x: dimensions.width / 2, y: 100 });
    }

    const idToNodeMap = {};
    const roots = [];

    peopleData.forEach((person) => {
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

    peopleData.forEach((person) => {
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
  }, [peopleData]);

  if (!peopleData) {
    return <div>Loading tree data...</div>;
  }

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
          onZoom={(zoom) => setCurrentZoom(zoom.k)}
        />
      )}
    </div>
  );
}

export default TreeView;
