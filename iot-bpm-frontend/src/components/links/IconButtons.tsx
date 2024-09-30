import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { HiOutlinePencil, HiOutlinePlusCircle, HiOutlineTrash } from "react-icons/hi2";

export function IconButton(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return <button type="button" className="inline-block h-full text-purple-600 hover:text-purple-500" {...props} />;
}

export function IconEditButton(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return <button type="button" className="inline-block h-full text-blue-600 hover:text-blue-500" {...props} >
        {props.children || <HiOutlinePencil size="22"/>}
    </button>;
  }

export function IconAddButton(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <button type="button" className="inline-block h-full text-green-600 hover:text-green-500" {...props}>
      {props.children || <HiOutlinePlusCircle size="22" />}
    </button>
  );
}

export function IconDeleteButton(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <button type="button" className="inline-block h-full text-red-600 hover:text-red-500" {...props}>
      {props.children || <HiOutlineTrash size="22" />}
    </button>
  );
}
