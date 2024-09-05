import { DetailedHTMLProps, DialogHTMLAttributes, forwardRef } from "react";

export const Dialog = forwardRef(function Dialog(props: DetailedHTMLProps<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>, ref: any) {
    return <dialog ref={ref} className="w-full max-w-3xl rounded-md p-4 bg-slate-800 text-slate-200" {...props}/> 
})