import React, { useState } from 'react';

const CreateSetPage = ({ onNavigate }) => {
  const [setName, setSetName] = useState(''); // state for flashcard set name
  const [setDescription, setSetDescription] = useState(''); // state for flashcard set description
  const [cards, setCards] = useState([{ question: '', answer: '' }]); // state for flashcards
  const [successMessage, setSuccessMessage] = useState(''); // success message
  const [errorMessage, setErrorMessage] = useState(''); // error message

  const addCard = () => {
    setCards([...cards, { question: '', answer: '' }]); // add a blank card
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent the page from reloading

    const newSet = { title: setName, description: setDescription, cards }; // gather form data

    // clear previous messages
    setErrorMessage('');
    setSuccessMessage('');

    fetch('http://localhost:5001/api/sets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSet), // convert the data to JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create flashcard set.');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Flashcard set created:', data); // Debugging log
        setSuccessMessage('Flashcard set created successfully!'); // Display success
        setSetName(''); // Reset form
        setSetDescription(''); // Reset description
        setCards([{ question: '', answer: '' }]);
      })
      .catch((error) => {
        console.error('Error creating flashcard set:', error); // Debugging log
        setErrorMessage('Error creating flashcard set. Please try again.'); // Show error to user
      });
  };

  const isFormValid = setName.trim() !== '' && cards.length > 0 && cards.every(card => card.question.trim() && card.answer.trim());

  return (
    <div>
      <h1>Create a Flashcard Set</h1>
      <button onClick={() => onNavigate('home')}>Back to Home</button>

      {/* Display error or success messages */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Set Name:
          <input
            type="text"
            value={setName}
            onChange={(e) => setSetName(e.target.value)}
            placeholder="Enter set name"
          />
        </label>

        <label>
          Set Description: {/* Added a description field */}
          <textarea
            value={setDescription}
            onChange={(e) => setSetDescription(e.target.value)}
            placeholder="Enter a brief description (optional)"
            rows="3"
            style={{ width: '100%' }}
          />
        </label>

        <div>
          {cards.map((card, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <input
                type="text"
                placeholder="Question"
                value={card.question}
                onChange={(e) => {
                  const updatedCards = [...cards];
                  updatedCards[index].question = e.target.value;
                  setCards(updatedCards);
                }}
              />
              <input
                type="text"
                placeholder="Answer"
                value={card.answer}
                onChange={(e) => {
                  const updatedCards = [...cards];
                  updatedCards[index].answer = e.target.value;
                  setCards(updatedCards);
                }}
              />
            </div>
          ))}
        </div>

        <button type="button" onClick={addCard}>
          Add Card
        </button>

        <button type="submit" disabled={!isFormValid}>
          Create Set
        </button>
      </form>
    </div>
  );
};

export default CreateSetPage;
