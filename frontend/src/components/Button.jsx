import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
  icon,
  'aria-label': ariaLabel,
  'aria-expanded': ariaExpanded,
  'aria-controls': ariaControls,
  ...rest
}) => {
  const [ripples, setRipples] = useState([]);

  const handleBtnClick = (e) => {
    if (disabled || isLoading) return;

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);

    if (onClick) {
      onClick(e);
    }
  };

  const baseStyles = 'relative overflow-hidden inline-flex items-center justify-center font-bold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none active:translate-y-0 active:scale-[0.98] transform-gpu';

  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white hover:shadow-[0_8px_20px_rgba(99,102,241,0.3)] dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:-translate-y-[2px] border-0 shimmer-container shimmer-delayed-effect',
    secondary: 'bg-white dark:bg-indigo-950/40 text-gray-700 dark:text-indigo-400 border border-gray-300 dark:border-0 hover:bg-gray-50 dark:hover:bg-indigo-950/60 hover:-translate-y-[1px] hover:shadow-sm',
    outline: 'border border-theme-border text-theme-text bg-theme-surface hover:bg-theme-bg hover:-translate-y-[1px] hover:shadow-sm',
    danger: 'bg-red-500 text-white hover:bg-red-600 hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(239,68,68,0.25)] border-0',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
    full: 'w-full px-6 py-3.5 text-sm',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      onClick={handleBtnClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      {...rest}
    >
      {/* Ripple Elements */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          onAnimationEnd={() => {
            setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
          }}
        />
      ))}

      <span className="flex items-center justify-center gap-2">
        {isLoading && (
          <LoadingSpinner size="small" color={variant === 'primary' ? 'white' : 'primary'} />
        )}
        {icon && !isLoading && (
          <span className="w-4 h-4 flex items-center justify-center transition-transform group-hover:scale-110">{icon}</span>
        )}
        <span>{children}</span>
      </span>
    </button>
  );
};

export default Button;
