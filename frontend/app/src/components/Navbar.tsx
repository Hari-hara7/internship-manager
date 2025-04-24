import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, LogOut, Briefcase } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-zinc-900 dark:text-white"
        >
          <Briefcase className="w-5 h-5" />
          Internship Portal
        </Link>

        <div className="flex items-center gap-4">
          {!token ? (
            <>
              <Button variant="ghost" className="flex items-center gap-1" asChild>
                <Link to="/login">
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
              </Button>
              <Button variant="outline" className="flex items-center gap-1" asChild>
                <Link to="/register">
                  <UserPlus className="w-4 h-4" />
                  Register
                </Link>
              </Button>
            </>
          ) : (
            <Button
              variant="destructive"
              className="flex items-center gap-1"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          )}
        </div>
      </div>
      <Separator />
    </nav>
  );
};

export default Navbar;
