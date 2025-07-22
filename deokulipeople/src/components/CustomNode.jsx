// src/components/CustomNode.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const CustomNode = ({ nodeDatum, toggleNode }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation(); // prevent interfering with expand/collapse
    navigate(`/person/${nodeDatum._id}`);
  };

  const isAlive = nodeDatum.attributes?.Alive?.toLowerCase() === "yes";

  return (
    <g>
      <circle r={20} fill={isAlive ? "#4CAF50" : "#999"} stroke="#333" />
      {/* Clickable Name */}
      <text
        x={0}
        y={-50}
        textAnchor="middle"
        fontSize={24}
        fill="blue"
        style={{ cursor: "pointer", textDecoration: "underline" }}
        onClick={handleClick}
      >
        {nodeDatum.name}
      </text>
      {/* Expand/Collapse indicator */}
      {nodeDatum.children || nodeDatum._children ? (
        <text
          x={0}
          y={5}
          textAnchor="middle"
          fontSize={10}
          fill="#fff"
          style={{ cursor: "pointer" }}
          onClick={toggleNode}
        >
          {nodeDatum._children ? "+" : "-"}
        </text>
      ) : null}
    </g>
  );
};

export default CustomNode;
