import { DetailedHTMLProps, InputHTMLAttributes, SelectHTMLAttributes } from "react";

export function Input(props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return <input className="block w-full rounded-md text-black" {...props} />;
}

export function Select(props: DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>) {
  return (
    <select disabled={!props.children} className="w-full rounded-md text-black" {...props} >
      <option value="" disabled hidden>Select...</option>
      {props.children ? props.children : <option>Loading...</option>}
    </select>
  );
}
