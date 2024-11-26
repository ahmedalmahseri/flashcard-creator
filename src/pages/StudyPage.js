import React from 'react';

const StudyPage = ({ onNavigate }) => {
  return (
    <div>
      <h1>Study Flashcards</h1>
      <button onClick={() => onNavigate('home')}>Back to Home</button>
    </div>
  );
};

export default StudyPage;
