import { ButtonHTMLAttributes, DetailedHTMLProps, RefAttributes } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

export function BreadCrumbLink(props: NavLinkProps & RefAttributes<HTMLAnchorElement>) {
  return (
    <NavLink
      className={({ isActive }) =>
        `${isActive ? "outline outline-cyan-500" : "hover:bg-slate-700 hover:outline outline-blue-500"} bg-slate-800 outline-1 rounded-md px-4 py-2 inline-block`
      }
      {...props}
    >
      {props.children}
    </NavLink>
  );
}

export function BreadCrumbButton(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <button type="button" className={"rounded-md bg-gray-800 px-4 py-2 bg-slate-800 hover:outline outline-blue-500 outline-1 inline-block"} {...props}>
      {props.children}
    </button>
  );
}
