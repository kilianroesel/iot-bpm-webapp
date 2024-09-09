import { DetailedHTMLProps, DialogHTMLAttributes, forwardRef } from "react";

export const Dialog = forwardRef(function Dialog(props: DetailedHTMLProps<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>, ref: any) {
    return <dialog ref={ref} className="fixed top-0 left-0 bottom-0 right-0 w-full max-w-3xl rounded-md p-4 bg-slate-800 text-slate-200" {...props}/> 
})