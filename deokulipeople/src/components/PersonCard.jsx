import React from "react";
import "./PersonCard.css";

const PersonCard = ({ person }) => {
  return (
    <div className="person-card">
      <div>
        <h3>{person.Name}</h3>
        <p><strong>Father:</strong> {person["Father's Name"] || "—"}</p>
        <p><strong>Mother:</strong> {person["Mother's Name"] || "—"}</p>
        <p><strong>Mother's Village:</strong> {person["Mother's Village"] || "—"}</p>
        <p><strong>Alive:</strong> {person.Alive || "—"}</p>
      </div>
      <div>
        <p><strong>Marriage Village:</strong> {person["Marriage village"] || "—"}</p>
        <p><strong>Alias:</strong> {person["Alias Name"] || "—"}</p>
        <p><strong>1st Wife:</strong> {person["1st wife"] || "—"}</p>
        <p><strong>2nd Wife:</strong> {person["2nd Wife"] || "—"}</p>
      </div>
    </div>
  );
};

export default PersonCard;
