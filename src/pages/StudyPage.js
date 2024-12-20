import React, { useState, useEffect } from 'react'; // remember to import useEffect

const StudyPage = ({ onNavigate, setId }) => {
  const [flashcardSet, setFlashcardSet] = useState(null); // store the flashcard set
  const [currentIndex, setCurrentIndex] = useState(0); // track which flashcard is being shown
  const [showAnswer, setShowAnswer] = useState(false); // track whether to show question or answer
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(''); // error message

  // Fetch the flashcard set when the component loads
  useEffect(() => {
    fetch(`http://localhost:5001/api/sets/${setId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load flashcard set'); // handle failed response
        }
        return response.json(); // convert to json
      })
      .then((data) => {
        console.log('Fetched flashcard set:', data); // log data
        setFlashcardSet(data); // save data to state
        setLoading(false); // stop loading
      })
      .catch((error) => {
        console.error('Error fetching flashcard set:', error); // log error
        setError('Could not load flashcards. Please try again later.'); // show error message
        setLoading(false); // stop loading
      });
  }, [setId]); // run this effect whenever setId changes

  const handleNext = () => {
    if (currentIndex < flashcardSet.cards.length - 1) {
      setCurrentIndex(currentIndex + 1); // go to the next card
      setShowAnswer(false); // reset to question
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // go to the previous card
      setShowAnswer(false); // reset to question
    }
  };

  const toggleFlip = () => {
    setShowAnswer(!showAnswer); // flip between question and answer
  };

  // if still loading show a loading message
  if (loading) {
    return <p>Loading flashcards...</p>;
  }

  // if there's an error show the error message
  if (error) {
    return <p>{error}</p>;
  }

  // if no flashcards exist show a fallback message
  if (!flashcardSet || flashcardSet.cards.length === 0) {
    return <p>No flashcards found in this set.</p>;
  }

  const currentCard = flashcardSet.cards[currentIndex]; // get the current card

  return (
    <div>
      <h1>{flashcardSet.title}</h1>
      <button onClick={() => onNavigate('home')}>Back to Home</button>

      {/* Flashcard container */}
      <div className="flashcard" onClick={toggleFlip} style={{ cursor: 'pointer' }}>
        <h2>{showAnswer ? 'Answer' : 'Question'}</h2>
        <p>{showAnswer ? currentCard.answer : currentCard.question}</p>
      </div>

      {/* Navigation buttons */}
      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentIndex === flashcardSet.cards.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StudyPage;
