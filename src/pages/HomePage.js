import React, { useState, useEffect } from 'react';

const HomePage = ({ onNavigate }) => {
  const [flashcardSets, setFlashcardSets] = useState([]); // State for flashcard sets
  const [loading, setLoading] = useState(true); // State for loading status

  // this gets flashcard sets from the backend.
  useEffect(() => {
    fetch('http://localhost:5001/api/sets') // changed to 5001 due to backend error
      .then((response) => response.json()) // convert response to json
      .then((data) => {
        setFlashcardSets(data); // saves flashcard sets in state
        setLoading(false); // sets loading to false
      })
      .catch((error) => {
        console.error('Failed to fetch flashcard sets:', error); // handles errors
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading sets...</p>;

  return (
    <div>
      <h1>Home Page</h1>
      <h1>Welcome to Flashcard Creator</h1>
      <p>Create and manage your flashcard sets easily!</p>

      {/* Navigation buttons */}
      <button onClick={() => onNavigate('create-set')}>Create a New Set</button>

      {/* Flashcard sets section */}
      <h2>Your Flashcard Sets</h2>
      {flashcardSets.length > 0 ? (
        <ul>
          {flashcardSets.map((set) => (
            <li key={set._id}>
              <h3>{set.title}</h3>
              <p>{set.description || 'No description provided.'}</p>
              {/* Button to study this set */}
              <button onClick={() => onNavigate('study', set._id)}>
                Study This Set
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No flashcard sets found. Create one to get started!</p>
      )}
    </div>
  );
};

export default HomePage;
