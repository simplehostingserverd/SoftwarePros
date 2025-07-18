'use client';

import { KeyboardArrowUp } from '@mui/icons-material';
import { IconButton } from '@mui/joy';
// Removed framer-motion for build compatibility
import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <div
          className="animate-fade-in"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1000,
          }}
        >
          <IconButton
            onClick={scrollToTop}
            size="lg"
            variant="solid"
            color="primary"
            sx={{
              borderRadius: '50%',
              width: 56,
              height: 56,
              boxShadow: 'lg',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 'xl',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <KeyboardArrowUp />
          </IconButton>
        </div>
      )}
    </>
  );
}
