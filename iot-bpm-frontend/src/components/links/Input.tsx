import { DetailedHTMLProps, InputHTMLAttributes, SelectHTMLAttributes } from "react";

export function Input(props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <input
      className="w-full rounded-md block"
      {...props}
    />
  );
}

export function Select(props: DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>) {
    return (
      <select
        className="w-full rounded-md"
        {...props}
      />
    );
  }
