# Floating Chat Button Setup Guide

## Overview
The floating chat button has been added to your website and appears on all pages in the bottom-right corner. It provides quick access to your social media channels for customer support.

## Features
- **Main Chat Button**: Blue circular button with chat icon and live indicator
- **"Chat Here Now Live" Text**: Appears above the button
- **Social Media Options**: WhatsApp, Instagram, X (Twitter), Telegram
- **Responsive Design**: Works on all screen sizes
- **Smooth Animations**: Hover effects and transitions

## Customization

### 1. Update Social Media Links
Edit `src/components/FloatingChatButton.tsx` and update the URLs in the `socialOptions` array:

```typescript
const socialOptions: SocialMediaOption[] = [
  {
    name: 'WhatsApp',
    icon: '💬',
    color: 'bg-green-500 hover:bg-green-600',
    url: 'https://wa.me/YOUR_PHONE_NUMBER?text=YOUR_MESSAGE', // Update this
    isActive: true,
  },
  {
    name: 'Instagram',
    icon: '📷',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
    url: 'https://instagram.com/YOUR_USERNAME', // Update this
    isActive: true,
  },
  // ... update other platforms
];
```

### 2. WhatsApp Setup
- Use format: `https://wa.me/PHONE_NUMBER?text=MESSAGE`
- Replace `PHONE_NUMBER` with your actual WhatsApp number (include country code)
- Customize the `text` parameter for your default message
- Example: `https://wa.me/15551234567?text=Hi%20SoftwarePros,%20I%20need%20help`

### 3. Social Media Usernames
- **Instagram**: `https://instagram.com/yourusername`
- **X (Twitter)**: `https://x.com/yourusername`
- **Telegram**: `https://t.me/yourusername`

### 4. Disable Platforms
To hide a platform, set `isActive: false`:

```typescript
{
  name: 'Telegram',
  icon: '📱',
  color: 'bg-blue-500 hover:bg-blue-600',
  url: 'https://t.me/softwarepros',
  isActive: false, // This will hide the Telegram option
}
```

## How It Works
1. **Main Button**: Click to expand/collapse social media options
2. **Social Media Icons**: Click any platform to open in a new tab
3. **Auto-close**: Menu automatically closes after selection
4. **Live Indicator**: Red pulsing dot shows the button is active

## Styling Customization
The button uses Tailwind CSS classes. You can modify:
- **Colors**: Change `bg-blue-600` to other color classes
- **Size**: Modify `w-16 h-16` for different dimensions
- **Position**: Change `bottom-6 right-6` for positioning
- **Animations**: Adjust `duration-300` and other transition classes

## Troubleshooting
- **Button not visible**: Check if `FloatingChatButton` is imported in `ClientLayout.tsx`
- **Links not working**: Verify URLs are correct and accessible
- **Styling issues**: Ensure Tailwind CSS is properly configured

## Support
If you need help customizing the chat button, refer to the component file at:
`src/components/FloatingChatButton.tsx`
