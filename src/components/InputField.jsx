import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function InputField() {
  const [recipientName, setRecipientName] = useState('');
  const [event, setEvent] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setRecipientName(e.target.value);
    if (errors.name) setErrors({ ...errors, name: '' });
  };

  const handleEventChange = (e) => {
    setEvent(e.target.value);
    if (errors.event) setErrors({ ...errors, event: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!recipientName.trim()) {
      newErrors.name = 'Recipient name is required';
    }
    if (!event.trim()) {
      newErrors.event = 'Event name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate('/Certificate', { state: { recipientName, event } });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Hero Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Create Your Certificate
          </h1>
          <p className="text-gray-300 text-lg">
            Generate professional certificates in seconds
          </p>
        </div>

        {/* Form Card */}
        <form 
          onSubmit={handleSubmit} 
          className="bg-white/10 backdrop-blur-lg p-8 md:p-10 rounded-2xl shadow-2xl border border-white/20 transform transition-all hover:scale-[1.02] duration-300"
        >
          {/* Name Input */}
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2 text-sm">
              👤 Recipient Name
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-lg bg-white/20 border-2 ${
                errors.name ? 'border-red-400' : 'border-white/30'
              } text-white placeholder-gray-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all`}
              placeholder="Enter recipient's full name"
              value={recipientName}
              onChange={handleNameChange}
            />
            {errors.name && (
              <p className="text-red-300 text-sm mt-1 animate-shake">⚠️ {errors.name}</p>
            )}
          </div>

          {/* Event Input */}
          <div className="mb-8">
            <label className="block text-white font-semibold mb-2 text-sm">
              🎉 Event Name
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-lg bg-white/20 border-2 ${
                errors.event ? 'border-red-400' : 'border-white/30'
              } text-white placeholder-gray-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all`}
              placeholder="Enter event or course name"
              value={event}
              onChange={handleEventChange}
            />
            {errors.event && (
              <p className="text-red-300 text-sm mt-1 animate-shake">⚠️ {errors.event}</p>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-bold py-4 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-[1.02] active:scale-95 transition-all duration-200 text-lg"
          >
            ✨ Generate Certificate
          </button>
        </form>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center border border-white/20">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-white text-xs font-semibold">Instant</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center border border-white/20">
            <div className="text-2xl mb-1">🎨</div>
            <div className="text-white text-xs font-semibold">Beautiful</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center border border-white/20">
            <div className="text-2xl mb-1">📥</div>
            <div className="text-white text-xs font-semibold">Download</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputField;