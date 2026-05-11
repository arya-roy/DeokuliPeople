import React from "react";
import { Card, CardContent } from "../ui/Card.jsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function LatestPeople({ latestPeople }) {
  const { t } = useTranslation();

  return (
    <section className="home-latest">
      <div className="home-latest-header">
        <div>
          <h2>{t("latestPeople")}</h2>
          <p>{t("recentPeopleDescription")}</p>
        </div>
        <Link to="/list" className="feature-link">
          {t("viewAllPeople")}
        </Link>
      </div>
      <div className="latest-grid">
        {latestPeople.map((person) => (
          <Card key={person.PersonID} className="latest-card">
            <CardContent>
              <div className="latest-name">{person.Name || person.PersonID}</div>
              <div className="latest-meta">{t("person_id")}:{person.PersonID}</div>
              <div className="latest-meta">{t("father_name")}: {person["Father's Name"] || t("unknown")}</div>
              <div className="latest-meta">{t("alive")}: {person.Alive || t("unknown")}</div>
              <Link to={`/person/${person.PersonID}`} className="feature-link mt-3 inline-block">
                {t("viewProfile")}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}