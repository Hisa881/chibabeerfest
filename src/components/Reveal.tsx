"use client";

import { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export function Reveal({ children, className = "" }: RevealProps) {
  return <div className={className}>{children}</div>;
}

export function HoverCard({ children, className = "" }: RevealProps) {
  return (
    <div
      className={`transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      {children}
    </div>
  );
}