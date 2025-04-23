import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInternshipById, updateInternship } from '../utils/api';

const EditInternship = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [internship, setInternship] = useState<any>(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    mentorName: '',
    description: '',
    startDate: '',
    endDate: '',
    certificateUrl: ''
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
   
    const fetchInternship = async () => {
      try {
        const { data } = await getInternshipById(token!, id);
        setInternship(data);
        setFormData({
          title: data.title,
          companyName: data.companyName,
          mentorName: data.mentorName,
          description: data.description,
          startDate: data.startDate,
          endDate: data.endDate,
          certificateUrl: data.certificateUrl
        });
      } catch (err) {
        setError('Failed to fetch internship details');
      }
    };

    fetchInternship();
  }, [id, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateInternship(token!, id, formData);
      alert('Internship updated successfully');
      navigate('/student-dashboard'); 
    } catch (err) {
      setError('Failed to update internship');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500">{error}</p>}
      {internship && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Internship Title"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="mentorName"
            value={formData.mentorName}
            onChange={handleChange}
            placeholder="Mentor Name"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="url"
            name="certificateUrl"
            value={formData.certificateUrl}
            onChange={handleChange}
            placeholder="Certificate URL"
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-700">
            Update Internship
          </button>
        </form>
      )}
    </div>
  );
};

export default EditInternship;
