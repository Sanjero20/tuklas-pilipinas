/* eslint-disable @typescript-eslint/no-empty-object-type */
import type React from "react";

interface InputProps extends React.ComponentProps<"input"> {}

function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`border-ink w-full border p-2 outline-none ${className}`}
    />
  );
}

export default Input;
