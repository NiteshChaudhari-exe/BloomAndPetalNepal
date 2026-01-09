import React, { useState } from 'react';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter an email address');
      return;
    }

    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      // Store subscriber info in localStorage
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
      }
      
      setStatus('success');
      setMessage('Thank you for subscribing! 🌸');
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }, 800);
  };

  return (
    <div className="space-y-4">
      <h4 className="text-white font-semibold font-serif text-lg">🌸 Newsletter</h4>
      <p className="text-sm text-stone-500">Subscribe to get special offers and updates!</p>
      
      <form onSubmit={handleSubscribe} className="space-y-3">
        <div className="flex gap-2">
          <input 
            type="email" 
            placeholder="Your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            className="flex-1 px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white text-sm placeholder-stone-600 focus:ring-2 focus:ring-rose-500 outline-none transition-all disabled:opacity-50"
            title="Enter your email to subscribe to our newsletter"
            aria-label="Email for newsletter subscription"
          />
          <button 
            type="submit"
            disabled={status === 'loading'}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Subscribe to newsletter"
          >
            {status === 'loading' ? '⏳' : '✓'}
          </button>
        </div>

        {/* Status Message */}
        {message && (
          <p className={`text-xs font-medium animate-fade-in ${
            status === 'success' 
              ? 'text-green-400' 
              : status === 'error'
              ? 'text-rose-400'
              : 'text-stone-400'
          }`}>
            {status === 'success' && '✨ '}
            {status === 'error' && '⚠️ '}
            {message}
          </p>
        )}
      </form>

      <p className="text-[10px] text-stone-600">We never share your email. Unsubscribe anytime.</p>
    </div>
  );
};

export const Footer: React.FC = () => (
  <footer className="bg-stone-900 dark:bg-stone-950 text-stone-400 dark:text-stone-500 py-20 px-4 mt-20 border-t border-stone-800">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌸</span>
            <h3 className="text-white text-xl font-serif font-bold">Bloom & Petal</h3>
          </div>
          <p className="text-sm leading-relaxed text-stone-500">
            Bringing nature's finest to your doorstep across Nepal. Specializing in fresh blooms and handcrafted floral gifts since 2018.
          </p>
          <div className="pt-4">
            <p className="text-xs text-stone-600 mb-4 font-semibold uppercase tracking-widest">Follow Us</p>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook" 
                className="w-10 h-10 rounded-full bg-stone-800 hover:bg-rose-600 flex items-center justify-center transition-all duration-300 hover:shadow-neon"
                title="Visit our Facebook page"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0"/></svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram" 
                className="w-10 h-10 rounded-full bg-stone-800 hover:bg-rose-600 flex items-center justify-center transition-all duration-300 hover:shadow-neon"
                title="Visit our Instagram profile"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.396 3.678 1.378c-.982.982-1.247 2.093-1.306 3.374C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.612.059 1.281.324 2.392 1.306 3.374.981.982 2.093 1.247 3.374 1.306C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.392-.324 3.374-1.306.982-.982 1.247-2.093 1.306-3.374.059-1.28.072-1.689.072-7.612 0-5.923-.013-6.332-.072-7.612-.059-1.281-.324-2.392-1.306-3.374-.981-.982-2.093-1.247-3.374-1.306C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter" 
                className="w-10 h-10 rounded-full bg-stone-800 hover:bg-rose-600 flex items-center justify-center transition-all duration-300 hover:shadow-neon"
                title="Visit our Twitter profile"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.555-2.005.959-3.127 1.184A4.916 4.916 0 0 0 16.616 3c-2.717 0-4.92 2.206-4.92 4.917 0 .386.044.762.127 1.124C7.691 8.816 4.066 6.864 1.64 3.94c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.418A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.142 0 14.307-7.721 14.307-14.417 0-.22-.005-.439-.015-.657A10.243 10.243 0 0 0 24 4.557z"/></svg>
              </a>
            </div>
          </div>
        </div>
        {/* Shop */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold font-serif text-lg">🛍️ Shop</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#/shop" className="text-stone-500 hover:text-rose-400 transition-colors duration-300">Fresh Flowers</a></li>
            <li><a href="#/shop" className="text-stone-500 hover:text-rose-400 transition-colors duration-300">Bouquets</a></li>
            <li><a href="#/shop" className="text-stone-500 hover:text-rose-400 transition-colors duration-300">Gift Sets</a></li>
            <li><a href="#/shop" className="text-stone-500 hover:text-rose-400 transition-colors duration-300">Custom Orders</a></li>
          </ul>
        </div>
        {/* Support */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold font-serif text-lg">🤝 Support</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="text-stone-500 hover:text-rose-400 transition-colors duration-300">Delivery Policy</a></li>
            <li><a href="#" className="text-stone-500 hover:text-rose-400 transition-colors duration-300">Refund Policy</a></li>
            <li><a href="#" className="text-stone-500 hover:text-rose-400 transition-colors duration-300">FAQ</a></li>
            <li><a href="#" className="text-stone-500 hover:text-rose-400 transition-colors duration-300">Contact Us</a></li>
          </ul>
        </div>
        {/* Newsletter */}
        <NewsletterSection />
      </div>
    </div>

    {/* Divider */}
    <div className="border-t border-stone-800 my-12"></div>

    {/* Bottom */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-xs text-stone-600">
        &copy; {new Date().getFullYear()} Bloom & Petal Nepal. All rights reserved. Made with 🌸 by <a href="#" className="text-rose-500 hover:text-rose-400 transition-colors">our team</a>.
      </p>
      <div className="flex items-center gap-4">
        <p className="text-xs text-stone-600 font-semibold uppercase tracking-widest">Payment Methods</p>
        <div className="flex gap-3">
          <div className="bg-stone-800 px-2 py-1 rounded text-white text-[10px] font-bold hover:bg-stone-700 transition-colors cursor-pointer" title="Pay with eSewa">eSewa</div>
          <div className="bg-stone-800 px-2 py-1 rounded text-white text-[10px] font-bold hover:bg-stone-700 transition-colors cursor-pointer" title="Pay with IME Pay">IME Pay</div>
          <div className="bg-stone-800 px-2 py-1 rounded text-white text-[10px] font-bold hover:bg-stone-700 transition-colors cursor-pointer" title="Pay with Khalti">Khalti</div>
        </div>
      </div>
    </div>
  </footer>
);
