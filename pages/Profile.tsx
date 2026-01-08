import React, { useState } from 'react';
import { useApp } from '../store/AppContext';

const Profile: React.FC = () => {
  const { user, updateUserProfile, logout } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  if (!user) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setMessage('');
    
    // Validate
    if (!formData.name.trim()) {
      setMessage('Name is required');
      setIsSaving(false);
      return;
    }
    if (!formData.phone.trim()) {
      setMessage('Phone number is required');
      setIsSaving(false);
      return;
    }
    if (!formData.address.trim()) {
      setMessage('Address is required');
      setIsSaving(false);
      return;
    }

    // Basic phone validation
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      setMessage('Please enter a valid 10-digit phone number');
      setIsSaving(false);
      return;
    }

    // Update profile
    updateUserProfile({
      name: formData.name,
      phone: formData.phone,
      address: formData.address
    });

    setMessage('Profile updated successfully! 🎉');
    setIsEditing(false);
    setTimeout(() => setMessage(''), 3000);
    setIsSaving(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      address: user.address || ''
    });
    setIsEditing(false);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-floral-pastel via-white to-floral-pastel dark:from-stone-900 dark:via-stone-850 dark:to-stone-900 py-20">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <a href="#/dashboard" className="text-rose-primary dark:text-rose-400 font-bold hover:underline text-sm mb-6 inline-block">
            ← Back to Dashboard
          </a>
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-rose text-white flex items-center justify-center text-4xl font-serif shadow-lg">
              {user.name[0]}
            </div>
            <div>
              <h1 className="text-4xl font-serif mb-2 text-stone-900 dark:text-white">{user.name}</h1>
              <p className="text-stone-500 dark:text-stone-400">{user.role} Account</p>
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-[20px] ${
            message.includes('successfully') 
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-900 text-green-700 dark:text-green-400' 
              : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400'
          }`}>
            {message}
          </div>
        )}

        {/* Main Card */}
        <div className="card dark:bg-stone-800 dark:border dark:border-stone-700 mb-8">
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-stone-200 dark:border-stone-700">
            <h2 className="text-2xl font-serif text-stone-900 dark:text-white">Personal Information</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary text-sm"
              >
                Edit Profile
              </button>
            ) : (
              <span className="text-sm text-stone-500 dark:text-stone-400">Editing...</span>
            )}
          </div>

          {!isEditing ? (
            // Display Mode
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">Full Name</label>
                <p className="text-lg font-bold text-stone-900 dark:text-white">{user.name}</p>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">Email Address</label>
                <p className="text-lg text-stone-600 dark:text-stone-300">{user.email}</p>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">Phone Number</label>
                <p className="text-lg text-stone-600 dark:text-stone-300">{user.phone || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">Address</label>
                <p className="text-lg text-stone-600 dark:text-stone-300 whitespace-pre-wrap">{user.address || 'Not provided'}</p>
              </div>
            </div>
          ) : (
            // Edit Mode
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-3">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-primary w-full"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-3">Email Address (Read-only)</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="input-primary w-full opacity-50 cursor-not-allowed"
                  title="Email address (read-only)"
                  aria-label="Email address"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-3">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-primary w-full"
                  placeholder="10-digit phone number"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-3">Delivery Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input-primary w-full resize-none"
                  rows={4}
                  placeholder="Your complete delivery address"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="px-6 py-3 rounded-full border-2 border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Account Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card dark:bg-stone-800 dark:border dark:border-stone-700">
            <h3 className="text-lg font-serif mb-4 text-stone-900 dark:text-white">Account Security</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
              Protect your account with a strong password.
            </p>
            <button className="w-full px-4 py-2.5 rounded-full border-2 border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors text-sm font-bold">
              Change Password
            </button>
          </div>

          <div className="card dark:bg-stone-800 dark:border dark:border-stone-700">
            <h3 className="text-lg font-serif mb-4 text-stone-900 dark:text-white">Preferences</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
              Manage your communication and notification settings.
            </p>
            <button className="w-full px-4 py-2.5 rounded-full border-2 border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors text-sm font-bold">
              Manage Settings
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-8 card dark:bg-red-900/20 dark:border dark:border-red-900/50 border-2 border-dashed border-red-200">
          <h3 className="text-lg font-serif mb-4 text-red-700 dark:text-red-400">Danger Zone</h3>
          <p className="text-sm text-red-600 dark:text-red-400 mb-6">
            Sign out of your account. You'll need to login again to access your orders and profile.
          </p>
          <button
            onClick={logout}
            className="w-full px-4 py-3 rounded-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white font-bold transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
