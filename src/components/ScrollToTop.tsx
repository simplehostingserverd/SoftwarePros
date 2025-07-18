'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconButton } from '@mui/joy';
import { KeyboardArrowUp } from '@mui/icons-material';

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
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
