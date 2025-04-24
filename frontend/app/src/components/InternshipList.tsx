import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateInternship, deleteInternship } from '../utils/api';

import { Pencil, Trash2, FileText } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const InternshipList = ({ internships }: { internships: any[] }) => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleDelete = async (id: string) => {
    try {
      await deleteInternship(token!, id);
      alert('Internship deleted successfully');
      window.location.reload();
    } catch (err) {
      setError('❌ Failed to delete internship.');
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-internship/${id}`);
  };

  return (
    <div className="grid gap-6">
      {internships.map((internship) => (
        <Card
          key={internship._id}
          className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg hover:shadow-xl transition"
        >
          <CardContent className="p-6 space-y-3">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
              {internship.title}
            </h3>

            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>Company:</strong> {internship.companyName}</p>
              <p><strong>Mentor:</strong> {internship.mentorName}</p>
              <p><strong>Description:</strong> {internship.description}</p>
              <p><strong>Start Date:</strong> {new Date(internship.startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(internship.endDate).toLocaleDateString()}</p>
              <p>
                <strong>Status:</strong>{' '}
                <Badge variant="outline" className="capitalize">{internship.status}</Badge>
              </p>
            </div>

            <a
              href={internship.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline mt-2"
            >
              <FileText className="w-4 h-4" /> View Certificate
            </a>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="default"
                size="sm"
                className="flex gap-2 items-center bg-black hover:bg-zinc-800"
                onClick={() => handleEdit(internship._id)}
              >
                <Pencil className="w-4 h-4" /> Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="flex gap-2 items-center"
                onClick={() => handleDelete(internship._id)}
              >
                <Trash2 className="w-4 h-4" /> Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      {error && <p className="text-red-600 text-center mt-4">{error}</p>}
    </div>
  );
};

export default InternshipList;

