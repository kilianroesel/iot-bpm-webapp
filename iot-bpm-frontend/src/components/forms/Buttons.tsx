import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

export function Button(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <button type="submit" className="rounded-md bg-blue-300 px-4 py-2 inline-block hover:bg-blue-400" {...props} />
  );
}

export function SubmitButton(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <button type="submit" className="rounded-md bg-green-100 px-4 py-2 inline-block hover:bg-green-200" {...props}>
      {props.children || "Submit"}
    </button>
  );
}

export function DeleteButton(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <button type="submit" className="rounded-md bg-red-300 px-4 py-2 inline-block hover:bg-red-400" {...props}>
      {props.children || "Delete"}
    </button>
  );
}

export function CancelButton(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
      <button type="submit" className="rounded-md bg-red-100 px-4 py-2 inline-block hover:bg-red-200" {...props}>
        {props.children || "Cancel"}
      </button>
    );
  }

  export function IconButton(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
      <button type="submit" className="inline-block h-full hover:text-gray-600" {...props}>
        {props.children || "Cancel"}
      </button>
    );
  }
