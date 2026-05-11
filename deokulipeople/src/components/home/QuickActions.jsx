import React from "react";
import { Card } from "../ui/Card.jsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function QuickActions() {
  const { t } = useTranslation();

  return (
    <section className="quick-actions">
      <h2>{t("quickAccess")}</h2>
      <div className="action-grid">
        <Card className="feature-card">
          <div>
            <h3>{t("peopleList")}</h3>
            <p>{t("peopleDesc")}</p>
          </div>
          <Link to="/list" className="feature-link">
            {t("viewPeople")}
          </Link>
        </Card>
        <Card className="feature-card">
          <div>
            <h3>{t("treeView")}</h3>
            <p>{t("treeDesc")}</p>
          </div>
          <Link to="/tree" className="feature-link">
            {t("viewTree")}
          </Link>
        </Card>
        <Card className="feature-card">
          <div>
            <h3>{t("communitySummary")}</h3>
            <p>{t("summaryDesc")}</p>
          </div>
          <Link to="/summary" className="feature-link">
            {t("viewSummary")}
          </Link>
        </Card>
      </div>
    </section>
  );
}