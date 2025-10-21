import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  variant?: 'default' | 'filled' | 'outlined';
}

export default function Select({ 
  label,
  error,
  helperText,
  options,
  placeholder,
  variant = 'default',
  className = '',
  id,
  ...props 
}: SelectProps) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseClasses = 'w-full px-3 py-2 border rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white';
  
  const variantClasses = {
    default: 'border-gray-300',
    filled: 'border-transparent bg-gray-100 focus:bg-white',
    outlined: 'border-2 border-gray-300 bg-transparent'
  };
  
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : '';
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    errorClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={classes}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}