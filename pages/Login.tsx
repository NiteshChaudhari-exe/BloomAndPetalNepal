
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';

export const Login: React.FC = () => {
  const { login, register } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate a brief network delay for UX
    setTimeout(() => {
      if (isRegister) {
        register(name, email);
      } else {
        login(email);
      }
      window.location.hash = '#/';
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-floral-pastel">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-xl shadow-rose-100/50 overflow-hidden border border-rose-50 transition-all duration-500">
        <div className="h-32 bg-rose-primary relative overflow-hidden flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
            alt="Flowers"
          />
          <span className="relative z-10 text-4xl transform hover:scale-110 transition-transform cursor-default">🌸</span>
        </div>
        
        <div className="p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif mb-2 text-stone-900">
              {isRegister ? 'Join Our Bloom' : 'Welcome Back'}
            </h2>
            <p className="text-stone-500 text-sm">
              {isRegister ? 'Create an account for personalized gifting' : 'Sign in to manage your bouquets and orders'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="John Doe"
                  className="w-full px-5 py-3 rounded-2xl border border-stone-100 bg-stone-50 outline-none focus:ring-2 focus:ring-rose-200 focus:bg-white transition-all text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Email Address</label>
              <input 
                required
                type="email" 
                placeholder="name@example.com"
                className="w-full px-5 py-3 rounded-2xl border border-stone-100 bg-stone-50 outline-none focus:ring-2 focus:ring-rose-200 focus:bg-white transition-all text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Password</label>
              <input 
                required
                type="password" 
                placeholder="••••••••"
                className="w-full px-5 py-3 rounded-2xl border border-stone-100 bg-stone-50 outline-none focus:ring-2 focus:ring-rose-200 focus:bg-white transition-all text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 mt-4 bg-rose-primary text-white rounded-2xl font-bold text-lg shadow-lg shadow-rose-200 transition-all transform active:scale-95 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-rose-800'}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : isRegister ? 'Create Account' : 'Continue to Shop'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-rose-50 text-center space-y-4">
            <div className="text-xs text-stone-400">
              {isRegister ? 'Already have an account?' : "Don't have an account?"} 
              <button 
                onClick={() => setIsRegister(!isRegister)} 
                className="ml-1 text-rose-primary font-bold hover:underline"
              >
                {isRegister ? 'Login Instead' : 'Register Now'}
              </button>
            </div>
            
            {!isRegister && (
              <div className="bg-rose-50 p-4 rounded-2xl text-left border border-rose-100">
                <p className="text-[10px] font-bold text-rose-400 uppercase tracking-tighter mb-2">💡 Quick Access Hint</p>
                <ul className="text-[11px] text-rose-700 space-y-1">
                  <li> </li>
                  <li>• Registration creates a standard Customer account</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
