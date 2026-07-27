import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({
  badge,
  icon: Icon,
  title,
  subtitle,
  align = 'center', // 'center' or 'left'
  className = ''
}) => {
  const isCenter = align === 'center';
  
  return (
    <div className={`relative mb-8 md:mb-10 select-none ${isCenter ? 'text-center mx-auto' : 'text-left'} ${className}`}>
      
      {/* Decorative blurred background circle behind heading */}
      <div 
        className={`absolute top-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full blur-[100px] pointer-events-none -z-10 transition-opacity duration-300 opacity-[0.05] dark:opacity-[0.08] ${
          isCenter ? 'left-1/2 -translate-x-1/2' : 'left-0 -translate-x-1/4'
        }`}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`flex ${isCenter ? 'justify-center' : 'justify-start'} mb-3`}
      >
        <span className="inline-flex items-center gap-2 h-[42px] md:h-[48px] px-6 md:px-8 rounded-full font-bold text-[13px] md:text-[14px] uppercase tracking-[0.12em] bg-gradient-to-br from-[#EEF4FF] to-[#E0F2FE] border border-[rgba(79,70,229,0.18)] text-[#4F46E5] shadow-[0_8px_24px_rgba(79,70,229,0.12)] dark:bg-[rgba(30,41,59,0.8)] dark:backdrop-blur-md dark:border-[#60A5FA] dark:shadow-[0_0_20px_rgba(59,130,246,0.25)] dark:text-white transition-all duration-300">
          {Icon && <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#4F46E5] dark:text-[#60A5FA]" />}
          {badge}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]"
        style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`mt-3 md:mt-4 text-[#64748B] dark:text-slate-400 leading-[1.7] font-medium max-w-[700px] ${
            isCenter ? 'mx-auto' : ''
          }`}
          style={{ fontSize: 'clamp(15px, 1.5vw, 18px)' }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
