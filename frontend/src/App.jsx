import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import FreelancerDetailPage from './pages/FreelancerDetailPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/add-freelancer' element={<CreatePage />} />
        <Route path='/freelancer/:id' element={<FreelancerDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;