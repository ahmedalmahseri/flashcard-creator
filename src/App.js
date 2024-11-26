import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import CreateSetPage from './pages/CreateSetPage';
import StudyPage from './pages/StudyPage';

function App() {
  const [page, setPage] = useState('home'); // Simple state to manage navigation

  return (
    <div>
      {page === 'home' && <HomePage onNavigate={setPage} />}
      {page === 'create-set' && <CreateSetPage onNavigate={setPage} />}
      {page === 'study' && <StudyPage onNavigate={setPage} />}
    </div>
  );
}

export default App;
