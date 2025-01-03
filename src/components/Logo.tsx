import React from 'react';

export const Logo: React.FC = () => {
  return (
    <svg width="200" height="60" viewBox="0 0 200 60">
      {/* 5-pointed star */}
      <path
        d="M30 12 L34 20 L43 20 L36 26 L38 34 L30 28 L22 34 L24 26 L17 20 L26 20 Z"
        fill="#FFD700"
        stroke="#FFA500"
        strokeWidth="1"
      />
      <text
        x="55"
        y="30"
        fontFamily="Arial"
        fontSize="24"
        fontWeight="bold"
        textAnchor="start"
        fill="#1976d2"
        dominantBaseline="middle"
      >
        Esperanza
      </text>
    </svg>
  );
};
