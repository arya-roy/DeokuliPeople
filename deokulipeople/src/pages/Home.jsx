import React from "react";
import { useHomeData } from "../hooks/useHomeData";
import HeroSection from "../components/home/HeroSection";
import StatsGrid from "../components/home/StatsGrid";
import QuickActions from "../components/home/QuickActions";
import LatestPeople from "../components/home/LatestPeople";
import HomeInsights from "../components/home/HomeInsights";
import "./Home.css";

export default function HomeDashboard() {
  const { summary, latestPeople, loading } = useHomeData();

  return (
    <div className="home-page">
      <HeroSection />
      <StatsGrid summary={summary} loading={loading} />
      <QuickActions />
      <LatestPeople latestPeople={latestPeople} />
      <HomeInsights />
    </div>
  );
}
