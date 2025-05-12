'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '../../lib/animations'; // Assuming path alias is configured

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

export default function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  return (
    <motion.main
      variants={fadeInUp} // Apply the fadeInUp animation
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex-grow" // Add flex-grow if needed for layout
    >
      {children}
    </motion.main>
  );
} 