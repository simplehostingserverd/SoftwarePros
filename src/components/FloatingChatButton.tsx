'use client';

import { useState } from 'react';

interface SocialMediaOption {
  name: string;
  icon: string;
  color: string;
  url: string;
  isActive: boolean;
}

export default function FloatingChatButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialMediaOption | null>(null);

  // ============================================================================
  // CUSTOMIZE YOUR SOCIAL MEDIA LINKS HERE
  // ============================================================================
  // Update these URLs with your actual social media profiles
  // For WhatsApp: Use https://wa.me/YOUR_PHONE_NUMBER?text=YOUR_MESSAGE
  // For Instagram: Use https://instagram.com/YOUR_USERNAME
  // For X (Twitter): Use https://x.com/YOUR_USERNAME
  // For Telegram: Use https://t.me/YOUR_USERNAME
  // ============================================================================

  const socialOptions: SocialMediaOption[] = [
    {
      name: 'WhatsApp',
      icon: '💬',
      color: 'bg-green-500 hover:bg-green-600',
      url: 'https://wa.me/1234567890?text=Hi%20SoftwarePros,%20I%20need%20help%20with%20healthcare%20software%20development',
      isActive: true,
    },
    {
      name: 'Instagram',
      icon: '📷',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
      url: 'https://instagram.com/softwarepros',
      isActive: true,
    },
    {
      name: 'X (Twitter)',
      icon: '🐦',
      color: 'bg-black hover:bg-gray-800',
      url: 'https://x.com/softwarepros',
      isActive: true,
    },
    {
      name: 'Telegram',
      icon: '📱',
      color: 'bg-blue-500 hover:bg-blue-600',
      url: 'https://t.me/softwarepros',
      isActive: true,
    },
  ];

  const handlePlatformSelect = (platform: SocialMediaOption) => {
    setSelectedPlatform(platform);
    // Open the selected platform in a new tab
    window.open(platform.url, '_blank');
    // Close the expanded menu after selection
    setTimeout(() => {
      setIsExpanded(false);
      setSelectedPlatform(null);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Chat Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`relative w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 ${
          isExpanded ? 'rotate-45' : ''
        }`}
        aria-label="Chat with us"
      >
        <span className="text-2xl">💬</span>

        {/* Live indicator */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full m-1" />
        </div>
      </button>

      {/* Chat Here Now Live Text */}
      <div className="absolute bottom-20 right-0 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg border border-gray-200 whitespace-nowrap">
        <div className="text-sm font-semibold text-blue-600">Chat Here Now</div>
        <div className="text-xs text-gray-600">Live Support</div>
        {/* Arrow pointing down */}
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
      </div>

      {/* Expanded Social Media Options */}
      {isExpanded && (
        <div className="absolute bottom-20 right-0 space-y-3 transition-all duration-300 ease-in-out">
          {socialOptions.map((option, index) => (
            <button
              key={option.name}
              onClick={() => handlePlatformSelect(option)}
              className={`w-14 h-14 ${option.color} text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center ${
                selectedPlatform?.name === option.name ? 'ring-4 ring-blue-300' : ''
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
              aria-label={`Chat on ${option.name}`}
            >
              <span className="text-xl">{option.icon}</span>
            </button>
          ))}

          {/* Close button */}
          <button
            onClick={() => setIsExpanded(false)}
            className="w-14 h-14 bg-gray-500 hover:bg-gray-600 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center"
          >
            <span className="text-xl">✕</span>
          </button>
        </div>
      )}

      {/* Success message when platform is selected */}
      {selectedPlatform && (
        <div className="absolute bottom-20 right-0 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          Opening {selectedPlatform.name}...
        </div>
      )}
    </div>
  );
}
