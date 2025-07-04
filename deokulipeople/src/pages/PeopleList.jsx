import React from "react";
import peopleData from "../data/people.json";
import { Link } from "react-router-dom";

const PeopleList = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">People List</h1>
      <ul>
        {peopleData.map((person) => (
          <li key={person.PersonID}>
            <Link to={`/person/${person.PersonID}`} className="text-blue-600 hover:underline">
              {person.Name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeopleList;
