// components/FeaturedCarousel.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const featured = [
  {
    name: "Shri. Ramesh Roy",
    title: "Pachkhuti",
    description: "Respected elder from Pachkhuti, community leader.",
    image: "/images/rameshroy.jpg",
  },
  {
    name: "Shree Amrendra Mishra",
    title: "Mishra Ghar",
    description: "Spiritual guide of Mishra Ghar with great influence.",
    image: "/images/amrendramishra.jpg",
  },
];

export default function FeaturedCarousel() {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">🌟 Featured People & Families</h2>
      <Swiper modules={[Pagination]} pagination={{ clickable: true }} spaceBetween={20} slidesPerView={1}>
        {featured.map((person, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex flex-col items-center">
              <img
                src={person.image}
                alt={person.name}
                className="w-32 h-32 object-cover rounded-full mb-2"
              />
              <div className="text-lg font-medium">{person.name}</div>
              <div className="text-sm text-gray-500">{person.title}</div>
              <p className="text-center text-sm text-gray-600 mt-2">{person.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
