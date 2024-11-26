import React from 'react';

const CreateSetPage = ({ onNavigate }) => {
  return (
    <div>
      <h1>Create a New Flashcard Set</h1>
      <button onClick={() => onNavigate('home')}>Back to Home</button>
    </div>
  );
};

export default CreateSetPage;
