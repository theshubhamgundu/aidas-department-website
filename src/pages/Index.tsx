
import React from 'react';
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Faculty } from '@/components/Faculty';
import { Research } from '@/components/Research';
import { Events } from '@/components/Events';
import { Clubs } from '@/components/Clubs';
import { Gallery } from '@/components/Gallery';
import { Placements } from '@/components/Placements';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { LoginModal } from '@/components/LoginModal';

const Index = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginType, setLoginType] = useState<'student' | 'admin'>('student');

  const handleLoginClick = (type: 'student' | 'admin') => {
    setLoginType(type);
    setShowLoginModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation onLoginClick={handleLoginClick} />
      <Hero />
      <About />
      <Faculty />
      <Research />
      <Events />
      <Clubs />
      <Gallery />
      <Placements />
      <Contact />
      <Footer />
      
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          type={loginType}
        />
      )}
    </div>
  );
};

export default Index;
