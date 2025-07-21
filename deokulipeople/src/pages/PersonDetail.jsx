import React from "react";
import { useParams } from "react-router-dom";
import peopleData from "../data/people.json";
import deokuliAnerieyePeopleData from "../data/Deokuli_A_All.json";

const PersonDetail = () => {
  const { id } = useParams();
  const person = deokuliAnerieyePeopleData.find((p) => String(p.PersonID) === id);

  if (!person) return <div>Person not found</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{person.Name}</h2>
      <ul className="space-y-1">
        <li><strong>Father:</strong> {person["Father's Name"]}</li>
        <li><strong>Mother:</strong> {person["Mother's Name"]}</li>
        <li><strong>Mother's Village:</strong> {person["Mother's Village"]}</li>
        <li><strong>Alive:</strong> {person.Alive}</li>
        <li><strong>Marriage Village:</strong> {person["Marriage village"]}</li>
        <li><strong>Alias Name:</strong> {person["Alias Name"]}</li>
        <li><strong>1st Wife:</strong> {person["1st wife"]}</li>
        <li><strong>2nd Wife:</strong> {person["2nd Wife"]}</li>
      </ul>
    </div>
  );
};

export default PersonDetail;
