import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import CreateSetPage from './pages/CreateSetPage';
import StudyPage from './pages/StudyPage';
import './App.css';

function App() {
  const [page, setPage] = useState('home'); 
  const [selectedSetId, setSelectedSetId] = useState(null); // the id of the selected set

  // function to navigate between pages and save setId if needed
  const handleNavigate = (nextPage, setId = null) => {
    setPage(nextPage); // update current page
    if (setId) setSelectedSetId(setId); // store the selected set id
  };

  return (
    <div>
      {page === 'home' && <HomePage onNavigate={handleNavigate} />}
      {page === 'create-set' && <CreateSetPage onNavigate={handleNavigate} />}
      {page === 'study' && <StudyPage onNavigate={handleNavigate} setId={selectedSetId} />}
    </div>
  );
}

export default App;
