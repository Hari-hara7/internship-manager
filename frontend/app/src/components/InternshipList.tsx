import React, { useState } from 'react';
import { updateInternship, deleteInternship } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, FileText } from 'lucide-react';

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
      setError('Failed to delete internship');
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-internship/${id}`);
  };

  return (
    <div className="space-y-6">
      {internships.map((internship) => (
        <div
          key={internship._id}
          className="p-6 bg-white border border-gray-200 rounded-xl shadow-md transition hover:shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-2">{internship.title}</h3>

          {/* New: Posted by user */}
     

          <p className="text-sm text-gray-600 mb-1">
            <strong>Company:</strong> {internship.companyName}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Mentor:</strong> {internship.mentorName}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Description:</strong> {internship.description}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Start Date:</strong> {new Date(internship.startDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <strong>End Date:</strong> {new Date(internship.endDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600 mb-3">
            <strong>Status:</strong> {internship.status}
          </p>

          <a
            href={internship.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
          >
            <FileText className="w-4 h-4" /> View Certificate
          </a>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => handleEdit(internship._id)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              <Pencil className="w-4 h-4" /> Edit
            </button>
            <button
              onClick={() => handleDelete(internship._id)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        </div>
      ))}
      {error && <p className="text-red-600 text-center mt-4">{error}</p>}
    </div>
  );
};

export default InternshipList;
