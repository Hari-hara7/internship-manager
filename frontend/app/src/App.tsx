import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import InternshipForm from './components/InternshipForm';
import EditInternship from './pages/EditInternship';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/add-internship" element={<InternshipForm />} />
        <Route path="/edit-internship/:id" element={<EditInternship />} />
        <Route path="/" element={<div className="text-center mt-20 text-4xl">Welcome to the Internship Portal!</div>} />
      </Routes>
    </Router>
  );
};

export default App;
