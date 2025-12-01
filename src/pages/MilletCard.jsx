// src/components/MilletCard.jsx
import React from "react";

export default function MilletCard({ millet }) {
  return (
    <div className="card">
      <div className="card-image-wrap">
        <img src={millet.image} alt={millet.name} className="card-img" />
      </div>

      <div className="card-body">
        <h2 className="card-title">{millet.name}</h2>
        <h4 className="card-sub">Benefits:</h4>
        <ul className="benefits">
          {millet.benefits.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        <div className="nutrition-box">
          <h5>Nutrition (per 100g):</h5>
          <div className="nut-grid">
            <div>Protein: <strong>{millet.nutrition.protein}</strong></div>
            <div>Fiber: <strong>{millet.nutrition.fiber}</strong></div>
            <div>Iron: <strong>{millet.nutrition.iron}</strong></div>
            <div>Calcium: <strong>{millet.nutrition.calcium}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
