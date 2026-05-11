import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { loadPeopleData } from "../../utils/loadPeopleData";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "mai", name: "मैथिली" },
  { code: "kaithi", name: "कैथी" },
];

export default function AdminPage() {
  const { t } = useTranslation();
  const [people, setPeople] = useState([]);
  const [selectedLocale, setSelectedLocale] = useState("en");
  const [editingPerson, setEditingPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadData();
  }, [selectedLocale]);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await loadPeopleData(selectedLocale);
      setPeople(data);
    } catch (error) {
      setMessage("Error loading data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (personData) => {
    // For now, just show a message that database editing is available via scripts
    setMessage("Database editing is available via command line scripts. Use 'npm run migrate' to set up the database and edit data programmatically.");
    setEditingPerson(null);
  };

  const handleDelete = async (personId) => {
    setMessage("Database editing is available via command line scripts. Use 'npm run migrate' to set up the database and edit data programmatically.");
  };

  return (
    <div className="admin-page p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Panel - View People Data</h1>

      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
        <strong>Note:</strong> This admin interface currently shows read-only data from JSON files.
        Database editing functionality is available via command line scripts for security and performance.
        Use <code>npm run migrate</code> to set up the database and manage data programmatically.
      </div>

      {message && (
        <div className="mb-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
          {message}
          <button
            onClick={() => setMessage("")}
            className="float-right ml-4 font-bold"
          >
            ×
          </button>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select Language:</label>
        <select
          value={selectedLocale}
          onChange={(e) => setSelectedLocale(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Database Management Scripts</h2>
        <div className="bg-gray-100 p-4 rounded">
          <p className="mb-2"><strong>Setup Database:</strong> <code>npm run migrate</code></p>
          <p className="mb-2"><strong>Test Database:</strong> <code>npm run test-db</code></p>
          <p className="mb-2"><strong>Edit Data:</strong> Use the database scripts in <code>src/database/</code></p>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2">Person ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Father's Name</th>
                <th className="border border-gray-300 px-4 py-2">Alive</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {people.map((person) => (
                <tr key={person.PersonID} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{person.PersonID}</td>
                  <td className="border border-gray-300 px-4 py-2">{person.Name}</td>
                  <td className="border border-gray-300 px-4 py-2">{person["Father's Name"]}</td>
                  <td className="border border-gray-300 px-4 py-2">{person.Alive}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => setEditingPerson(person)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                      disabled
                    >
                      Edit (DB Only)
                    </button>
                    <button
                      onClick={() => handleDelete(person.PersonID)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      disabled
                    >
                      Delete (DB Only)
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingPerson && (
        <PersonForm
          person={editingPerson}
          onSave={handleSave}
          onCancel={() => setEditingPerson(null)}
        />
      )}
    </div>
  );
}

function PersonForm({ person, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    PersonID: person.PersonID || "",
    ParentID: person.ParentID || "",
    Name: person.Name || "",
    "Father's Name": person["Father's Name"] || "",
    "Mother's Name": person["Mother's Name"] || "",
    "Mother's Village": person["Mother's Village"] || "",
    Alive: person.Alive || "",
    "Marriage village": person["Marriage village"] || "",
    "Alias Name": person["Alias Name"] || "",
    "1st wife": person["1st wife"] || "",
    "2nd Wife": person["2nd Wife"] || "",
    Comment: person.Comment || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          View Person Details (Read-Only)
        </h2>

        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
          <p className="text-yellow-800">
            This form is currently read-only. Database editing is available via command line scripts.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Person ID:</label>
              <input
                type="text"
                value={formData.PersonID}
                onChange={(e) => handleChange("PersonID", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Parent ID:</label>
              <input
                type="text"
                value={formData.ParentID}
                onChange={(e) => handleChange("ParentID", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                disabled
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Name:</label>
            <input
              type="text"
              value={formData.Name}
              onChange={(e) => handleChange("Name", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              disabled
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Father's Name:</label>
              <input
                type="text"
                value={formData["Father's Name"]}
                onChange={(e) => handleChange("Father's Name", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Alive:</label>
              <select
                value={formData.Alive}
                onChange={(e) => handleChange("Alive", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                disabled
              >
                <option value="">Select</option>
                <option value="YES">Yes</option>
                <option value="NO">No</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}