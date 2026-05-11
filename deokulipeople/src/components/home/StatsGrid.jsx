import React from "react";
import { useTranslation } from "react-i18next";

export default function StatsGrid({ summary, loading }) {
  const { t } = useTranslation();

  return (
    <section className="home-stats-grid">
      <div className="hero-stat-card">
        <div className="stat-label">{t("totalMembers")}</div>
        <p className="stat-value">{loading ? "..." : summary.totalMembers}</p>
        <div className="stat-note">{t("totalMembersNote")}</div>
      </div>
      <div className="hero-stat-card">
        <div className="stat-label">{t("livingMembers")}</div>
        <p className="stat-value">{loading ? "..." : summary.livingMembers}</p>
        <div className="stat-note">{t("livingMembersNote")}</div>
      </div>
      <div className="hero-stat-card">
        <div className="stat-label">{t("familyLines")}</div>
        <p className="stat-value">{loading ? "..." : summary.familyLines}</p>
        <div className="stat-note">{t("familyLinesNote")}</div>
      </div>
      <div className="hero-stat-card">
        <div className="stat-label">{t("languagesSupported")}</div>
        <p className="stat-value">4</p>
        <div className="stat-note">{t("languagesSupportedNote")}</div>
      </div>
    </section>
  );
}