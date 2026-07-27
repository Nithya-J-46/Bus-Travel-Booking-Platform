import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Check, X } from 'lucide-react';

const PasswordInput = ({
  label,
  id,
  placeholder = '',
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  showStrength = false,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const hasContent = value !== undefined && value !== null && value.toString() !== '';
  const isFloating = isFocused || hasContent;
  const isSuccess = hasContent && !error;

  // Password strength calculation
  const getStrengthData = (pwd) => {
    if (!pwd) return { score: 0, text: '', color: 'bg-slate-200 dark:bg-slate-800' };
    
    const requirements = [
      pwd.length >= 8,
      /[a-z]/.test(pwd),
      /[A-Z]/.test(pwd),
      /[0-9]/.test(pwd),
      /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    ];
    
    const passedCount = requirements.filter(Boolean).length;
    
    let text = 'Weak';
    let color = 'bg-red-500';
    if (passedCount === 5) {
      text = 'Very Strong';
      color = 'bg-emerald-500';
    } else if (passedCount >= 3) {
      text = 'Medium';
      color = 'bg-amber-500';
    }
    
    return {
      score: (passedCount / 5) * 100,
      text,
      color,
      passedCount,
      requirements: [
        { label: 'At least 8 characters', met: pwd.length >= 8 },
        { label: 'One lowercase letter', met: /[a-z]/.test(pwd) },
        { label: 'One uppercase letter', met: /[A-Z]/.test(pwd) },
        { label: 'One number', met: /[0-9]/.test(pwd) },
        { label: 'One special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(pwd) }
      ]
    };
  };

  const strength = getStrengthData(value);

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
          
          {/* Lock Icon */}
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
            <Lock className="w-5 h-5" />
          </div>
          
          {/* Main Password Input */}
          <input
            id={id}
            type={showPassword ? 'text' : 'password'}
            placeholder={isFocused ? (placeholder || ' ') : ' '}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            required={required}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${id}-error` : undefined}
            className="block w-full border-0 bg-transparent pl-11 pr-11 py-3 pt-5.5 pb-1.5 text-sm text-theme-text focus:outline-none disabled:text-slate-400 transition-all duration-300"
            {...props}
          />
          
          {/* Eye Toggle button */}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            disabled={disabled}
            className={`absolute inset-y-0 right-0 pr-3.5 flex items-center transition-colors cursor-pointer duration-300 hover:scale-110
              ${isFocused ? 'text-indigo-550 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}
            `}
            tabIndex="-1"
          >
            {showPassword ? <EyeOff className="w-5 h-5 animate-pulse" /> : <Eye className="w-5 h-5" />}
          </button>

          {/* Floating Label */}
          {label && (
            <label
              htmlFor={id}
              className={`absolute left-11 transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) transform origin-[0] pointer-events-none select-none
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
      
      {error && !showStrength && (
        <p 
          id={`${id}-error`} 
          className="mt-1.5 text-xs text-red-500 dark:text-red-400 font-semibold pl-1.5 transition-all animate-[slideIn_0.2s_ease-out]"
        >
          {error}
        </p>
      )}

      {/* Dynamic strength meter checklist */}
      {showStrength && value && (
        <div className="mt-3 bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-800/50 p-3.5 rounded-xl transition-all">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[11px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">
              Strength
            </span>
            <span className={`text-xs font-extrabold ${strength.passedCount === 5 ? 'text-emerald-500' : strength.passedCount >= 3 ? 'text-amber-500' : 'text-red-500'}`}>
              {strength.text}
            </span>
          </div>

          {/* Bar */}
          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full transition-all duration-300 ${strength.color}`}
              style={{ width: `${strength.score}%` }}
            />
          </div>

          {/* Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1.5 mt-2">
            {strength.requirements.map((req, index) => (
              <div key={index} className="flex items-center text-xs">
                {req.met ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500 mr-1.5 flex-shrink-0" />
                ) : (
                  <X className="w-3.5 h-3.5 text-slate-350 dark:text-slate-650 mr-1.5 flex-shrink-0" />
                )}
                <span className={req.met ? 'text-emerald-700 dark:text-emerald-450 font-bold' : 'text-slate-450'}>
                  {req.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
