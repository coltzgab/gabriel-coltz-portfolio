import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = "px-8 py-3 font-display font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden group rounded-full";

  const variants = {
    primary: "bg-organic-cyan text-organic-black hover:bg-white hover:shadow-[0_0_20px_rgba(71,228,190,0.5)]",
    secondary: "bg-organic-purple text-organic-white hover:bg-organic-cyan hover:text-organic-black",
    outline: "border border-organic-cyan text-organic-cyan hover:bg-organic-cyan hover:text-organic-black"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};