import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';

// Hidden instances (Sanctum, Cognitae, Gaming) are preserved in the codebase 
// but removed from the active routing to focus purely on Expositor.

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route Root directly to Expositor to isolate focus */}
        <Route path="/" element={<Navigate to="/expositor" replace />} />

        {/* Expositor Core Application */}
        <Route path="/expositor/*" element={<AppShell />} />
      </Routes>
    </Router>
  );
};

export default App;
