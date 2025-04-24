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

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
        <div>
          <Label htmlFor="mentorName">Mentor Name</Label>
          <div className="flex items-center gap-2">
            <User size={20} className="text-gray-500" />
            <Input
              id="mentorName"
              name="mentorName"
              value={formData.mentorName}
              onChange={handleChange}
              placeholder="Mentor Name"
              required
            />
          </div>
        </div>

        {/* Internship Title */}
        <div>
          <Label htmlFor="title">Internship Title</Label>
          <div className="flex items-center gap-2">
            <Briefcase size={20} className="text-gray-500" />
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Internship Title"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <div className="flex items-start gap-2">
            <BookOpenText size={20} className="text-gray-500 mt-1" />
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              required
            />
          </div>
        </div>

        {/* Company Name */}
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <div className="flex items-center gap-2">
            <Building2 size={20} className="text-gray-500" />
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              required
            />
          </div>
        </div>

        {/* Start Date */}
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <div className="flex items-center gap-2">
            <CalendarDays size={20} className="text-gray-500" />
            <Input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* End Date */}
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <div className="flex items-center gap-2">
            <CalendarDays size={20} className="text-gray-500" />
            <Input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Certificate Upload */}
        <div>
          <Label htmlFor="certificate">Upload Certificate</Label>
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-gray-500" />
            <Input
              type="file"
              id="certificate"
              name="certificate"
              onChange={handleFileChange}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-black text-white hover:bg-gray-900">
          Submit Internship
        </Button>
      </form>
    </div>
  );
};

export default InternshipForm;
