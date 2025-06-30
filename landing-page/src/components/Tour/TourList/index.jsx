import React from "react";
import { TourCard } from "../TourCard";
import "./style.css";

export const TourList = ({ tours }) => {
  return (
    <div className="tour-list-container">
      <div className="tour-list">
        {tours.map((tour, index) => (
          <TourCard
            key={index}
            imageUrl={tour.thumbnailUrl}
            country={tour.location}
            title={tour.title}
            price={tour.price}
            rating={tour.avgRating}
            ratingCount={tour.ratingCount}
            tourId={tour.id}
          />
        ))}
      </div>

    </div>
  );
};