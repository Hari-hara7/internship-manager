import React, { useEffect, useState } from 'react';
import { getInternships } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import InternshipList from '../components/InternshipList';
import { GraduationCap, AlertCircle } from 'lucide-react';

const StudentDashboard = () => {
  const [internships, setInternships] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchInternships = async () => {
      try {
        const { data } = await getInternships(token);
        setInternships(data);

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUserId(decodedToken.userId);

      } catch (err) {
        setError('Failed to fetch internships');
      }
    };

    fetchInternships();
  }, [token, navigate]);

  return (
    <div className="bg-white min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-2 mb-6">
        <GraduationCap size={28} className="text-black" />
        <h2 className="text-3xl font-semibold text-black">Your Internships</h2>
      </div>
      {error && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-100 p-3 rounded mb-4">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}
      <InternshipList internships={internships} userId={userId} />
    </div>
  );
};

export default StudentDashboard;
