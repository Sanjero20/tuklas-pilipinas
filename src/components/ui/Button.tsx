import type React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "secondary";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

function Button({
  children,
  variant = "default",
  onClick,
  className = "",
}: ButtonProps) {
  const variantStyles = {
    default: "bg-ink hover:bg-accent text-paper",
    secondary: "bg-paper hover:bg-ink border-ink border hover:text-paper",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer px-8 py-3 font-mono ${variant ? variantStyles[variant] : ""} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
