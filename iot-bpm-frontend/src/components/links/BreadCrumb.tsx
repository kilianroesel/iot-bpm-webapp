import { ButtonHTMLAttributes, DetailedHTMLProps, RefAttributes } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

export function BreadCrumbLink(props: NavLinkProps & RefAttributes<HTMLAnchorElement>) {
  return (
    <NavLink
      className={({ isActive }) =>
        `${isActive ? "bg-blue-800" : "bg-blue-700 hover:bg-blue-600"} rounded-md bg-blue-300 px-4 py-2 inline-block`
      }
      {...props}
    >
      {props.children}
    </NavLink>
  );
}

export function BreadCrumbButton(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <button type="button" className={"rounded-md bg-blue-700 px-4 py-2 hover:bg-blue-600 inline-block"} {...props}>
      {props.children}
    </button>
  );
}
