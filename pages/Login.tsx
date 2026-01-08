
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const Login: React.FC = () => {
  const { login, register } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Customer' | 'Admin'>('Customer');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (value.trim() && !validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Validate name for register
    if (isRegister && !name.trim()) {
      alert('Please enter your full name');
      return;
    }

    setLoading(true);
    
    // Simulate a brief network delay for UX
    setTimeout(() => {
      if (isRegister) {
        register(name, email, role);
      } else {
        login(email);
      }
      window.location.hash = '#/';
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-floral-pastel via-white to-rose-50 dark:from-stone-900 dark:via-stone-850 dark:to-stone-900 flex items-center justify-center px-4 py-12">
      {/* Background Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-10 w-80 h-80 bg-rose-accent/10 rounded-full blur-3xl animate-glow"></div>
        <div className="absolute bottom-32 right-10 w-80 h-80 bg-electric/10 rounded-full blur-3xl animate-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-md w-full card dark:bg-stone-800/50 dark:border-stone-700 rounded-[40px] overflow-hidden shadow-2xl shadow-rose-200/30 dark:shadow-rose-900/20 border dark:border-stone-700 animate-fade-in">
        {/* Header with Gradient */}
        <div className="h-40 bg-gradient-to-br from-rose-primary via-rose-accent to-neon-purple relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-2 left-4 w-2 h-2 bg-white rounded-full blur-sm animate-pulse"></div>
            <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-white rounded-full blur-sm animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <div className="absolute bottom-4 left-1/2 w-1 h-1 bg-white rounded-full blur-sm animate-pulse" style={{ animationDelay: '0.6s' }}></div>
          </div>
          <span className="relative z-10 text-6xl transform hover:scale-110 transition-transform duration-300 cursor-default animate-bounce-soft">🌸</span>
        </div>
        
        <div className="p-10 space-y-6">
          {/* Header Text */}
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-4xl font-serif dark:text-white mb-3">
              {isRegister ? '✨ Join Our Bloom' : '👋 Welcome Back'}
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
              {isRegister ? 'Create an account for personalized gifting experiences' : 'Sign in to manage your bouquets and orders'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="space-y-2 animate-slide-in" style={{ animationDelay: '0.15s' }}>
                <label className="text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 ml-1 block">Full Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="John Doe"
                  className="input-primary dark:bg-stone-700 dark:text-white dark:border-stone-600 dark:placeholder-stone-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2 animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <label className="text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 ml-1 block">Email Address</label>
              <input 
                required
                type="email" 
                placeholder="name@example.com"
                className={`input-primary dark:bg-stone-700 dark:text-white dark:border-stone-600 dark:placeholder-stone-500 border-2 ${emailError ? 'border-red-500' : ''}`}
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                title="Enter your email address"
                aria-label="Email address"
              />
              {emailError && (
                <p className="text-red-500 text-xs font-bold flex items-center gap-1">
                  ❌ {emailError}
                </p>
              )}
            </div>

            <div className="space-y-2 animate-slide-in" style={{ animationDelay: '0.25s' }}>
              <label className="text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 ml-1 block">Password</label>
              <input 
                required
                type="password" 
                placeholder="••••••••"
                className="input-primary dark:bg-stone-700 dark:text-white dark:border-stone-600 dark:placeholder-stone-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {isRegister && (
              <div className="space-y-3 animate-slide-in" style={{ animationDelay: '0.3s' }}>
                <label className="text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 ml-1 block">Account Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'Customer' as const, label: 'Customer', icon: '🛍️' },
                    { id: 'Admin' as const, label: 'Admin', icon: '⚙️' }
                  ].map((opt, idx) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setRole(opt.id)}
                      className={`p-4 rounded-2xl border-2 transition-all text-center flex flex-col items-center gap-2 font-semibold text-sm animate-fade-in ${
                        role === opt.id
                          ? 'border-rose-primary bg-gradient-to-br from-rose-50 to-rose-100/50 dark:from-rose-900/30 dark:to-rose-800/20 text-stone-900 dark:text-rose-300 shadow-lg shadow-rose-500/20'
                          : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-rose-200 dark:hover:border-rose-600 hover:bg-stone-50 dark:hover:bg-stone-700/30'
                      }`}
                      style={{ animationDelay: `${0.35 + idx * 0.05}s` }}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 mt-6 bg-gradient-to-r from-rose-primary to-rose-accent text-white rounded-full font-bold text-lg shadow-lg shadow-rose-500/40 transition-all transform hover:scale-105 dark:from-rose-500 dark:to-rose-400 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 animate-fade-in`}
              style={{ animationDelay: '0.3s' }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : isRegister ? '✓ Create Account' : '→ Continue to Shop'}
            </button>
          </form>

          {/* Divider and Toggle */}
          <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-700">
            <div className="text-center text-xs text-stone-500 dark:text-stone-400">
              {isRegister ? 'Already have an account?' : "Don't have an account?"} 
              <button 
                onClick={() => setIsRegister(!isRegister)} 
                className="ml-2 text-rose-primary dark:text-rose-400 font-bold hover:underline transition-colors"
              >
                {isRegister ? 'Login Instead' : 'Register Now'}
              </button>
            </div>
            
            {!isRegister && (
              <div className="glass dark:glass-dark p-4 rounded-3xl border border-rose-100 dark:border-rose-900/30 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <p className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-tighter mb-3">💡 Quick Access Tips</p>
                <ul className="text-[12px] text-rose-700 dark:text-rose-300 space-y-2 leading-relaxed">
                  <li>✓ Use any email to get started</li>
                  <li>✓ Registration creates your account instantly</li>
                  <li>✓ Your orders sync across devices</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
