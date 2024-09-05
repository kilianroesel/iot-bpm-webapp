import { DetailedHTMLProps, InputHTMLAttributes, SelectHTMLAttributes } from "react";

export function Input(props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <input
      className="w-full rounded-md block text-black"
      {...props}
    />
  );
}

export function Select(props: DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>) {
    return (
      <select
        className="w-full rounded-md text-black"
        {...props}
      />
    );
  }
