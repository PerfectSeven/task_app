import React from 'react';
import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Todo from './pages/Todo';
import Rewards from './pages/Rewards';


function App() {
  return (
    <Router>
      <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/rewards" element={<Rewards />} />
      </Routes>
      </UserProvider>
    </Router>
    
  );
}

export default App;
