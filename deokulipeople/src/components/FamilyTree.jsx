// src/components/TreeView.jsx
import React, { useState, useEffect, useRef } from 'react';
import Tree from 'react-d3-tree';
import peopleData from '../data/people.json';
import PersonCard from './PersonCard';

const TreeView = () => {
  const treeContainer = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Convert flat list to nested tree data
  const buildTreeData = () => {
    const personMap = {};
    peopleData.forEach(person => {
      personMap[person['Name']] = { ...person, children: [] };
    });

    let root = null;
    peopleData.forEach(person => {
      const father = person["Father's Name"];
      if (father && personMap[father]) {
        personMap[father].children.push(personMap[person["Name"]]);
      } else {
        // No known father, assume root
        if (!root) root = personMap[person["Name"]];
      }
    });

    return root ? [personMap[root.Name]] : [];
  };

  useEffect(() => {
    const { offsetWidth, offsetHeight } = treeContainer.current;
    setDimensions({ width: offsetWidth, height: offsetHeight });
  }, []);

  const renderCustomNode = ({ nodeDatum }) => (
    <foreignObject width={220} height={120}>
      <div style={{ width: '200px', height: '110px', background: 'white', borderRadius: '8px' }}>
        <PersonCard person={nodeDatum} />
      </div>
    </foreignObject>
  );

  return (
    <div style={{ width: '100%', height: '100vh' }} ref={treeContainer}>
      {dimensions.width > 0 && (
        <Tree
          data={buildTreeData()}
          dimensions={dimensions}
          renderCustomNodeElement={renderCustomNode}
          orientation="vertical"
          separation={{ siblings: 1.5, nonSiblings: 2 }}
          pathFunc="elbow"
        />
      )}
    </div>
  );
};

export default TreeView;
