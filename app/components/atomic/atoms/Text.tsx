import React from 'react';

export interface TextProps {
  children: React.ReactNode;
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'muted' | 'danger' | 'success' | 'warning';
  className?: string;
}

export default function Text({ 
  children, 
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  color = 'primary',
  className = '',
  ...props 
}: TextProps) {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl'
  };
  
  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };
  
  const colorClasses = {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    muted: 'text-gray-500',
    danger: 'text-red-600',
    success: 'text-green-600',
    warning: 'text-yellow-600'
  };
  
  const classes = [
    sizeClasses[size],
    weightClasses[weight],
    colorClasses[color],
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}