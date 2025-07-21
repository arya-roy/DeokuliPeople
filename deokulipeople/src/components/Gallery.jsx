// components/Gallery.jsx
import React from 'react';

const images = [
  { src: "/images/temple1.jpg", caption: "Main Temple" },
  { src: "/images/aerial.jpg", caption: "Aerial View" },
  { src: "/images/yajna.jpg", caption: "Yajna 2024" },
];

export default function Gallery() {
  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-4">📸 Deokuli Dham Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <div key={idx}>
            <img src={img.src} alt={img.caption} className="rounded-lg" />
            <p className="text-sm text-gray-600 text-center mt-1">{img.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
