import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInternship } from '../utils/api';
import {
  User,
  Briefcase,
  BookOpenText,
  Building2,
  CalendarDays,
  FileText
} from 'lucide-react';

const InternshipForm = () => {
  const [formData, setFormData] = useState({
    mentorName: '',
    title: '',
    description: '',
    companyName: '',
    startDate: '',
    endDate: ''
  });
  const [certificate, setCertificate] = useState<File | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCertificate(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataWithFile = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataWithFile.append(key, value);
    });
    if (certificate) {
      formDataWithFile.append('certificate', certificate);
    }

    try {
      if (token) {
        await createInternship(token, formDataWithFile);
        navigate('/student-dashboard');
      }
    } catch (err) {
      setError('Failed to create internship!');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-black">Add Internship</h2>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Mentor Name */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
          <User className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            name="mentorName"
            value={formData.mentorName}
            onChange={handleChange}
            placeholder="Mentor Name"
            className="w-full focus:outline-none"
            required
          />
        </div>
        {/* Internship Title */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
          <Briefcase className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Internship Title"
            className="w-full focus:outline-none"
            required
          />
        </div>
        {/* Description */}
        <div className="flex items-start border border-gray-300 rounded-lg px-3 py-2">
          <BookOpenText className="text-gray-500 mr-2 mt-1" size={20} />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full focus:outline-none resize-none"
            required
          />
        </div>
        {/* Company Name */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
          <Building2 className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full focus:outline-none"
            required
          />
        </div>
        {/* Start Date */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
          <CalendarDays className="text-gray-500 mr-2" size={20} />
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full focus:outline-none"
            required
          />
        </div>
        {/* End Date */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
          <CalendarDays className="text-gray-500 mr-2" size={20} />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full focus:outline-none"
            required
          />
        </div>
        {/* Certificate File Upload */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
          <FileText className="text-gray-500 mr-2" size={20} />
          <input
            type="file"
            name="certificate"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-600 focus:outline-none"
            required
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-black text-white rounded-lg hover:bg-gray-900 transition duration-300"
        >
          Submit Internship
        </button>
      </form>
    </div>
  );
};

export default InternshipForm;
