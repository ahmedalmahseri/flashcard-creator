import React, { useState } from 'react';

const CreateSetPage = ({ onNavigate }) => {
  const [setName, setSetName] = useState(''); // state for flashcard set name
  const [cards, setCards] = useState([{ question: '', answer: '' }]); // state for flashcards
  const [successMessage, setSuccessMessage] = useState(''); // success message

  const addCard = () => {
    setCards([...cards, { question: '', answer: '' }]); // add a blank card
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent the page from reloading
  
    const newSet = { title: setName, cards }; // gather form data
  
    console.log('Form Data Being Sent:', newSet); // Debug: Log form data being sent
  
    fetch('http://localhost:5001/api/sets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSet),
    })
      .then((response) => {
        console.log('Raw Response:', response); // Debug: Log raw response
        return response.json();
      })
      .then((data) => {
        console.log('Server Response:', data); // Debug: Log the backend response
        setSuccessMessage('Flashcard set created successfully!');
        setSetName(''); // Reset form
        setCards([{ question: '', answer: '' }]);
        onNavigate('home');
      })
      .catch((error) => {
        console.error('Error creating flashcard set:', error); // Debug: Log any errors
      });
  };

  const isFormValid = setName.trim() !== '' && cards.length > 0 && cards.every(card => card.question.trim() && card.answer.trim());

  return (
    <div>
      {/* section for page header */}
      <h1>Create a Flashcard Set</h1>

      {/* button to go back to the home page */}
      <button onClick={() => onNavigate('home')}>Back to Home</button>

      {/* display success message */}
      {successMessage && <p>{successMessage}</p>}

      {/* form section */}
      <form onSubmit={handleSubmit}>
        {/* label for the set name */}
        <label>
          Set Name:
          {/* input for the set name */}
          <input
            type="text"
            value={setName} // controlled input for set name (a string)
            onChange={(e) => setSetName(e.target.value)} // updates setName state
            placeholder="Enter set name" // placeholder text for input
          />
        </label>

        {/* section to render all flashcards */}
        <div>
          {cards.map((card, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              {/* input for question */}
              <input
                type="text"
                placeholder="Question" // text placeholder for clarity
                value={card.question} // controlled input for question
                onChange={(e) => {
                  const updatedCards = [...cards]; // copy of the current cards
                  updatedCards[index].question = e.target.value; // update the question
                  setCards(updatedCards); // update the state
                }}
              />

              {/* input for answer */}
              <input
                type="text"
                placeholder="Answer" // text placeholder for clarity
                value={card.answer} // controlled input for answer
                onChange={(e) => {
                  const updatedCards = [...cards]; // copy of the current cards
                  updatedCards[index].answer = e.target.value; // update the answer
                  setCards(updatedCards); // update the state
                }}
              />
            </div>
          ))}
        </div>

        {/* button to add a new card */}
        <button type="button" onClick={addCard}>
          Add Card
        </button>

        {/* button to submit the form */}
        <button type="submit" disabled={!isFormValid}>
          Create Set
        </button>
      </form>
    </div>
  );
};

// export the component
export default CreateSetPage;
