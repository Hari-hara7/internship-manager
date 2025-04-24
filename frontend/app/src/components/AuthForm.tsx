import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, login } from '../utils/api';
import { User, Mail, Lock, UserCheck } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const AuthForm = ({ type }: { type: 'login' | 'register' }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
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
          <div className="flex items-center gap-2">
            <User className="text-gray-500" size={20} />
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>
        )}
        <div className="flex items-center gap-2">
          <Mail className="text-gray-500" size={20} />
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <Lock className="text-gray-500" size={20} />
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        {type === 'register' && (
          <div className="flex items-center gap-2">
            <UserCheck className="text-gray-500" size={20} />
            <Select value={formData.role} onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        <Button type="submit" className="w-full">
          {type === 'register' ? 'Register' : 'Login'}
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;
