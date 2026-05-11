import React from "react";
import FeaturedCarousel from "../FeaturedCarousel.jsx";
import NewsSection from "../NewsSection.jsx";

export default function HomeInsights() {
  return (
    <section className="home-insights">
      <NewsSection />
      <FeaturedCarousel />
    </section>
  );
}