// components/NewsSection.jsx
import React from 'react';

const news = [
  {
    date: "2025-01-28",
    title: "Makar Mela Celebrated",
    description: "The village celebrated the Makar Mela with full devotion at the main temple.",
  },
  {
    date: "2025-07-01",
    title: "Sawan Planned Next Month",
    description: "Preparations have started for the upcoming Sawan. Volunteers welcome.",
  },
];

export default function NewsSection() {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">📢 News & Announcements</h2>
      {news.map((item, idx) => (
        <div key={idx} className="border-b pb-3 mb-3">
          <div className="text-sm text-gray-500">{item.date}</div>
          <div className="font-medium">{item.title}</div>
          <p className="text-sm text-gray-700">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
