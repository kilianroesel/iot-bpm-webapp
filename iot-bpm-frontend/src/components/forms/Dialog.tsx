import { DetailedHTMLProps, DialogHTMLAttributes, useEffect, useRef } from "react";

export function Dialog(props: DetailedHTMLProps<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>) {
  const ref = useRef<HTMLDialogElement>(null);

  // By opening and closing the html dialog element programatically it prevents the user to interact with elements outside of the dialog
  useEffect(() => {
    ref.current?.showModal();
    return () => {
      ref.current?.close();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className="fixed bottom-0 left-0 right-0 top-0 w-full max-w-3xl rounded-md bg-slate-800 p-4 text-slate-200"
      {...props}
    />
  );
}
