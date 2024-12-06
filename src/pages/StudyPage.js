import React, { useState } from 'react';

const StudyPage = ({ onNavigate }) => {
  // example flashcards
  const mockFlashcards = [
    { question: 'What does Buck do in Rainbow Six Siege?', answer: 'His ability is a secondary shotgun' },
    { question: 'What is the best show of all time?', answer: 'Lost' },
    { question: 'Greatest episode in cinema history', answer: '"The Constant" Season 5 Episode 5 of Lost' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // track which flashcard is being shown
  const [showAnswer, setShowAnswer] = useState(false); // track whether to show the question or answer

  const currentCard = mockFlashcards[currentIndex]; // get the current flashcard

  const handleNext = () => {
    if (currentIndex < mockFlashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false); // reset to question when moving to the next card
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false); // reset to question when moving to the previous card
    }
  };

  const toggleFlip = () => {
    setShowAnswer(!showAnswer); // click between question and answer
  };

  return (
    <div>
      <h1>Study Flashcards</h1>
      <button onClick={() => onNavigate('home')}>Back to Home</button>

      {/* flashcard container */}
      <div className="flashcard" onClick={toggleFlip} style={{ cursor: 'pointer' }}>
        <h2>{showAnswer ? 'Answer' : 'Question'}</h2>
        <p>{showAnswer ? currentCard.answer : currentCard.question}</p>
      </div>

      {/* navigation buttons */}
      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentIndex === mockFlashcards.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StudyPage;
