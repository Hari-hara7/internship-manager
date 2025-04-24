
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import InternshipForm from './components/InternshipForm';
import EditInternship from './pages/EditInternship';

import  image from './assets/image.jpg';

import { Card, CardContent } from '@/components/ui/card';//frontend/app/src/assets/image.jpg
import { Button } from '@/components/ui/button';

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
    <Card className="max-w-2xl w-full">
      <CardContent className="p-6">
        <img
          src={image}
          alt="Internship Hero"
          className="w-full h-64 object-contain mb-6"
        />
        <h1 className="text-3xl font-bold mb-4 text-zinc-800">Welcome to the Internship Portal!</h1>
        <p className="text-zinc-600 mb-6">
          Explore, manage, and track internships efficiently for both students and teachers. Start your journey now!
        </p>
        <Button asChild>
          <a href="/login">Get Started</a>
        </Button>
      </CardContent>
    </Card>
  </div>
);

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/add-internship" element={<InternshipForm />} />
        <Route path="/edit-internship/:id" element={<EditInternship />} />
      </Routes>
    </Router>
  );
};

export default App;
