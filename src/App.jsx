import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Admin from './Admin';
import Employee from './Employee';
import { UserRoleProvider } from './UserRoleContext';

const App = () => {
  console.log("App component rendered");

  return (
    <UserRoleProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </UserRoleProvider>
  );
};

export default App;