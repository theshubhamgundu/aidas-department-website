
import React, { useState } from 'react';
import { Menu, X, GraduationCap, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  onLoginClick: (type: 'student' | 'admin') => void;
}

export const Navigation = ({ onLoginClick }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Faculty', href: '#faculty' },
    { name: 'Research', href: '#research' },
    { name: 'Events', href: '#events' },
    { name: 'Clubs', href: '#clubs' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Placements', href: '#placements' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg z-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI & Data Science
              </h1>
              <p className="text-xs text-gray-600">VIT University</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Login Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLoginClick('student')}
              className="flex items-center space-x-1"
            >
              <User className="w-4 h-4" />
              <span>Student Login</span>
            </Button>
            <Button
              size="sm"
              onClick={() => onLoginClick('admin')}
              className="flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              <Shield className="w-4 h-4" />
              <span>Admin Login</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-3 space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onLoginClick('student')}
                className="w-full flex items-center justify-center space-x-1"
              >
                <User className="w-4 h-4" />
                <span>Student Login</span>
              </Button>
              <Button
                size="sm"
                onClick={() => onLoginClick('admin')}
                className="w-full flex items-center justify-center space-x-1 bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Login</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
