import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, LogOut, Briefcase } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 

  const handleLogout = () => {
    localStorage.removeItem('token');  
    localStorage.removeItem('user');  
    navigate('/login');  
  };

  return (
    <nav className="bg-white text-black p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-semibold">
          <Briefcase size={24} />
          <span>Internship Portal</span>
        </Link>
        <div className="flex items-center space-x-6">
          {!token ? (
            <>
              <Link to="/login" className="flex items-center space-x-1 hover:text-gray-700 transition">
                <LogIn size={18} />
                <span>Login</span>
              </Link>
              <Link to="/register" className="flex items-center space-x-1 hover:text-gray-700 transition">
                <UserPlus size={18} />
                <span>Register</span>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
