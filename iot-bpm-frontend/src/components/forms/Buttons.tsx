import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

export function Button(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <button
      type="submit"
      className="inline-block rounded-md bg-blue-600 px-4 py-2 font-medium text-black hover:bg-blue-500"
      {...props}
    />
  );
}

export function SubmitButton(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <button
      type="submit"
      className="inline-block rounded-md bg-green-600 px-4 py-2 font-medium text-black hover:bg-green-500"
      {...props}
    >
      {props.children || "Submit"}
    </button>
  );
}

export function DeleteButton(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <button
      type="submit"
      className="inline-block rounded-md bg-red-600 px-4 py-2 font-medium text-black hover:bg-red-500"
      {...props}
    >
      {props.children || "Delete"}
    </button>
  );
}

export function CancelButton(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <button
      type="submit"
      className="inline-block rounded-md bg-gray-600 px-4 py-2 font-medium text-black hover:bg-gray-500"
      {...props}
    >
      {props.children || "Cancel"}
    </button>
  );
}
