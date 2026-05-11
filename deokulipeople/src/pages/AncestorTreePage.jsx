// src/pages/AncestorTreePage.jsx
import React, { useState, useEffect } from "react";
import "../styles/TreeStyles.css";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loadPeopleData } from "../utils/loadPeopleData";

function AncestorTreePage() {
    const { personId } = useParams();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();
    const [data, setData] = useState(null);

    useEffect(() => {
        let active = true;

        loadPeopleData(i18n.language).then((loadedData) => {
            if (active) {
                setData(loadedData || []);
            }
        });

        return () => {
            active = false;
        };
    }, [i18n.language]);

    if (!data) {
        return <div>{t("loading", "Loading...")}</div>;
    }

    const idMap = new Map(data.map((p) => [p.PersonID, p]));

    // Recursive ancestor fetch
    const buildAncestorList = (id, generation = 0, isFirst = true) => {
        const person = idMap.get(id);
        if (!person) return [];

        const current = {
            generation,
            person,
        };

        const parentId = person.ParentID;
        if (!parentId || !idMap.has(parentId)) {
            return isFirst ? [current] : [current];
        }

        return [current, ...buildAncestorList(parentId, generation + 1, false)];
    };


    const ancestors = buildAncestorList(personId);

    const currentPerson = idMap.get(personId);


    console.log("Language:", i18n.language);
    console.log("personId from URL:", personId);
    console.log("Sample data length:", data.length);
    console.log("Sample PersonID in data:", data.slice(0, 5).map(p => p.PersonID));
    console.log("Does personId exist in data?", idMap.has(personId));


    return (
        <div style={{ padding: "1rem" }}>
            <h2>{t("ancestorTreeTitle", "🧬 Ancestor Tree")}</h2>
            <button onClick={() => navigate(-1)} style={{ marginBottom: "1rem" }}>
                {t("back", "⬅️ Go Back")}
            </button>

            {ancestors.length === 0 || !currentPerson ? (
                <p>{t("noAncestors", "No ancestors found.")}</p>
            ) : (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {ancestors.map(({ generation, person }, index) => {
                        const isCurrent = person.PersonID === personId;

                        return (
                            <li
                                key={person.PersonID}
                                className={`generation-${Math.min(generation, 20)}`}
                                style={{
                                    marginBottom: "1rem",
                                    border: "1px solid #ccc",
                                    padding: "0.5rem",
                                    borderRadius: "8px",
                                }}
                            >

                                {isCurrent && (
                                    <div style={{ marginBottom: "0.5rem" }}>
                                        👤 <strong>{t("youAreHere", "You are here")}</strong>
                                    </div>
                                )}
                                <div>
                                    <strong>{t("generation", "Generation")}:</strong> {generation}
                                </div>
                                <div>
                                    <strong>{t("name", "Name")}:</strong> {person.Name}
                                </div>
                                <div>
                                    <strong>{t("fatherName", "Father's Name")}:</strong> {person["Father's Name"] || "-"}
                                </div>
                                <div>
                                    <strong>{t("motherVillage", "Mother's Village")}:</strong> {person["Mother's Village"] || "-"}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default AncestorTreePage;
