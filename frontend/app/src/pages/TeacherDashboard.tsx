import React, { useEffect, useState } from 'react';
import { getInternships } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import InternshipList from '../components/InternshipList';
import { LayoutDashboard } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

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
  }, [token, navigate]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <LayoutDashboard className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              All Internships
            </h2>
          </div>
          <Separator className="mb-6" />

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <InternshipList internships={internships} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherDashboard;
