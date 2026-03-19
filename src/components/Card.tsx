import type { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  noPadding?: boolean;
}

export default function Card({ children, className = "", noPadding = false, ...rest }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100/50 overflow-hidden ${noPadding ? "" : "p-6"} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
