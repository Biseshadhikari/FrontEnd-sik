// CourseCard.js
import React from 'react';

const CourseCard = ({ title, category, popularity }) => {
  return (
    <div className="bg-white p-4 border rounded-md">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">{category}</p>
      <p className="text-sm text-gray-500">{`Popularity: ${popularity}`}</p>
    </div>
  );
};

export default CourseCard;
