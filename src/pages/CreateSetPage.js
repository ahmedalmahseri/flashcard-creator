import React, { useState } from 'react';

const CreateSetPage = ({ onNavigate }) => {
  const [setName, setSetName] = useState(''); // state for flashcard set name
  const [cards, setCards] = useState([]); // state for flashcards

  const addCard = () => {
    setCards([...cards, { question: '', answer: '' }]);
  };

  return (
    <div>
      {/* section for page header */}
      <h1>Create a Flashcard Set</h1>

      {/* button to go back to the home page */}
      <button onClick={() => onNavigate('home')}>Back to Home</button>

      {/* form section */}
      <form>
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
      </form>
    </div>
  );
};

// export the component
export default CreateSetPage;
