import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader } from "lucide-react";

type Variant = "primary" | "secondary" | "success" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary: "bg-[#57288F] text-white hover:bg-[#452073] focus:ring-[#57288F]",
  secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 focus:ring-gray-200",
  success: "bg-[#4CA37D] text-white hover:bg-[#3d8566] focus:ring-[#4CA37D]",
  ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  isLoading?: boolean;
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  isLoading = false,
  className = "",
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-sm ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <Loader className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
}
