
import { motion } from "motion/react";
import React from "react";

interface BrutalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const BrutalButton: React.FC<BrutalButtonProps> = ({ children, onClick, className = "", disabled }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative px-8 py-3 rounded-full font-bold text-lg
        bg-white text-black transition-all
        shadow-[0_0_20px_rgba(255,255,255,0.3)]
        hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export const NeonButton: React.FC<BrutalButtonProps> = ({ children, onClick, className = "", disabled }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative px-10 py-4 rounded-full font-bold text-xl
        bg-white text-black transition-all
        shadow-[0_0_20px_rgba(255,255,255,0.4)]
        hover:shadow-[0_0_40px_rgba(255,255,255,0.6)]
        disabled:opacity-50
        flex items-center gap-2
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};
