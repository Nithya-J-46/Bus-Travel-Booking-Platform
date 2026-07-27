import React, { useState } from 'react';

const InputField = ({
  label,
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  icon,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasContent = value !== undefined && value !== null && value.toString() !== '';
  const isFloating = isFocused || hasContent;
  const isSuccess = hasContent && !error;

  return (
    <div className={`mb-4 text-left ${className}`}>
      
      {/* Outer border container that transitions to gradient on focus */}
      <div className={`relative rounded-xl p-[1.5px] transition-all duration-300
        ${isFocused 
          ? 'bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] scale-[1.01]' 
          : error 
            ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
            : isSuccess
              ? 'bg-emerald-500/80 dark:bg-emerald-600/80 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
              : 'bg-theme-border hover:bg-theme-border/80'
        }
      `}>
        {/* Inner white/slate container */}
        <div className="relative rounded-[11.5px] overflow-hidden bg-theme-surface transition-colors duration-300">
          
          {/* Input Icon (Glows on focus) */}
          {icon && (
            <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-all duration-400 ease-out
              ${isFocused 
                ? 'text-indigo-500 dark:text-indigo-400 scale-110 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)] rotate-3' 
                : error
                  ? 'text-red-500'
                  : isSuccess
                    ? 'text-emerald-500'
                    : 'text-slate-400 dark:text-slate-500'
              }
            `}>
              {icon}
            </div>
          )}
          
          {/* Main Input Element */}
          <input
            id={id}
            type={type}
            placeholder={isFocused ? (placeholder || ' ') : ' '}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            required={required}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`block w-full border-0 bg-transparent px-4 py-3 pt-5.5 pb-1.5 text-sm text-theme-text focus:outline-none disabled:text-slate-400 transition-all duration-300
              ${icon ? 'pl-11' : 'pl-4'} 
            `}
            {...props}
          />

          {/* Floating Label */}
          {label && (
            <label
              htmlFor={id}
              className={`absolute transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) transform origin-[0] pointer-events-none select-none
                ${icon ? 'left-11' : 'left-4'}
                ${isFloating 
                  ? 'top-1.5 scale-[0.8] -translate-y-1 text-indigo-600 dark:text-indigo-400 font-extrabold tracking-wide' 
                  : 'top-3.5 scale-100 translate-y-0 text-sm text-slate-400 dark:text-slate-500 font-medium'
                }
              `}
            >
              {label} {required && <span className="text-red-500 font-bold" aria-hidden="true">*</span>}
            </label>
          )}
        </div>
      </div>

      {/* Slide-in Error messages */}
      {error && (
        <p 
          id={`${id}-error`} 
          className="mt-1.5 text-xs text-red-500 dark:text-red-400 font-semibold pl-1.5 transition-all animate-[slideIn_0.2s_ease-out]"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
