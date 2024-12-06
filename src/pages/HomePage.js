import React from 'react';

const HomePage = ({ onNavigate }) => {
  return (
    <div>
      <h1>Home Page</h1>
      <h1>Welcome to Flashcard Creator</h1>
      <p>Create and manage your flashcard sets easily!</p>
      <button onClick={() => onNavigate('create-set')}>Create a New Set</button>
      <button onClick={() => onNavigate('study')}>Study Flashcards</button>
    </div>
  );
};

export default HomePage;
