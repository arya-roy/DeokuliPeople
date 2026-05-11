import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { loadPeopleData } from "../utils/loadPeopleData";

export function useHomeData() {
  const { i18n } = useTranslation();
  const [summary, setSummary] = useState({
    totalMembers: 0,
    livingMembers: 0,
    familyLines: 0,
  });
  const [latestPeople, setLatestPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    loadPeopleData(i18n.language)
      .then((data) => {
        if (!active || !Array.isArray(data)) return;

        const cleanData = data.filter((person) => person.PersonID && person.PersonID.trim());
        const totalMembers = cleanData.length;
        const livingMembers = cleanData.filter((person) => String(person.Alive).trim().toUpperCase() === "YES").length;
        const familyLines = cleanData.filter((person) => !person.ParentID || !person.ParentID.trim()).length;

        const latestPeople = [...cleanData]
          .sort((a, b) => {
            const aNum = Number(String(a.PersonID).replace(/\D/g, "")) || 0;
            const bNum = Number(String(b.PersonID).replace(/\D/g, "")) || 0;
            return bNum - aNum;
          })
          .slice(0, 5);

        setSummary({ totalMembers, livingMembers, familyLines });
        setLatestPeople(latestPeople);
        setLoading(false);
      })
      .catch((err) => {
        if (active) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [i18n.language]);

  return { summary, latestPeople, loading, error };
}