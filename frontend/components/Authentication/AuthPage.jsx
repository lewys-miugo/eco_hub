'use client';

import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div  className="min-h-screen bg-cover bg-center flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
      style={{ backgroundImage: "url('./solar_bg.jpg')" }}>
      {/* Optional overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Foreground form content */}
      <div className="relative w-full max-w-md backdrop-blur-xs rounded-xl shadow-lg p-2">
        {isLogin ? (
          <RegisterForm onToggle={toggleForm} />
          
        ) : (
          <LoginForm onToggle={toggleForm} />
        )}
      </div>
    </div>
  );
}