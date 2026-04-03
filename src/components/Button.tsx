import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="cursor-pointer rounded-lg bg-[#54454c] px-4 py-2 text-white outline hover:bg-[#705C65]"
      {...props}
    >
      {children}
    </button>
  );
}
