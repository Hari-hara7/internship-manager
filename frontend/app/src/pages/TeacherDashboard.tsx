import React, { useEffect, useState } from 'react';
import { getInternships } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import InternshipList from '../components/InternshipList';
import { LayoutDashboard } from 'lucide-react';

const TeacherDashboard = () => {
  const [internships, setInternships] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
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
      } catch (err) {
        setError('⚠️ Failed to fetch internships. Please try again later.');
      }
    };

    fetchInternships();
  }, [token, navigate]); // fixed: removed `history` which is not defined

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <LayoutDashboard className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">All Internships</h2>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
          {error}
        </div>
      )}

      <InternshipList internships={internships} />
    </div>
  );
};

export default TeacherDashboard;
