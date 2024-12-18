import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import CreateSetPage from './pages/CreateSetPage';
import StudyPage from './pages/StudyPage';
import './App.css';

function App() {
  const [page, setPage] = useState('home'); 

  return (
    <div>
      {page === 'home' && <HomePage onNavigate={setPage} />}
      {page === 'create-set' && <CreateSetPage onNavigate={setPage} />}
      {page === 'study' && <StudyPage onNavigate={setPage} />}
    </div>
  );
}

export default App;
