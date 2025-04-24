import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, login } from '../utils/api';
import { User, Mail, Lock, UserCheck } from 'lucide-react';

const AuthForm = ({ type }: { type: 'login' | 'register' }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (type === 'register') {
        await register(formData);
        navigate('/login');
      } else {
        const { data } = await login(formData);
        localStorage.setItem('token', data.token);
        navigate(data.user.role === 'teacher' ? '/teacher-dashboard' : '/add-internship');
      }
    } catch (err) {
      setError('Something went wrong!');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-black">
        {type === 'register' ? 'Register' : 'Login'}
      </h2>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'register' && (
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <User className="text-gray-500 mr-2" size={20} />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full focus:outline-none"
              required
            />
          </div>
        )}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
          <Mail className="text-gray-500 mr-2" size={20} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full focus:outline-none"
            required
          />
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
          <Lock className="text-gray-500 mr-2" size={20} />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full focus:outline-none"
            required
          />
        </div>
        {type === 'register' && (
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <UserCheck className="text-gray-500 mr-2" size={20} />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-white focus:outline-none"
              required
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
        )}
        <button
          type="submit"
          className="w-full p-3 bg-black text-white rounded-lg hover:bg-gray-900 transition duration-300"
        >
          {type === 'register' ? 'Register' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
