import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="home-hero">
      <div className="home-hero-card">
        <span className="hero-tag">📜 {t("communitySummary")}</span>
        <h1 className="hero-title">{t("welcome")}</h1>
        <p className="hero-copy">{t("description")}</p>

        <div className="hero-buttons">
          <Link to="/list" className="hero-button primary">
            {t("peopleList")}
          </Link>
          <Link to="/tree" className="hero-button secondary">
            {t("treeView")}
          </Link>
          <Link to="/summary" className="hero-button secondary">
            {t("communitySummary")}
          </Link>
        </div>

        <div className="hero-highlights">
          <div className="hero-highlight">
            <strong>{t("latestPeople")}</strong>
            <span>{t("recentPeopleDescription")}</span>
          </div>
          <div className="hero-highlight">
            <strong>{t("languagesSupported")}</strong>
            <span>{t("glimpses")}</span>
          </div>
        </div>
      </div>

      <div className="home-hero-visual">
        <div className="hero-illustration">
          <div className="hero-illustration-text">{t("heroIllustrationText")}</div>
        </div>
      </div>
    </section>
  );
}