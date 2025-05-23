import { DetailedHTMLProps, DialogHTMLAttributes, useEffect, useRef } from "react";

export function Dialog(props: DetailedHTMLProps<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>) {
  const ref = useRef<HTMLDialogElement>(null);

  // By opening and closing the html dialog element programatically it prevents the user to interact with elements outside of the dialog
  useEffect(() => {
    const myRef = ref;
    ref.current?.showModal();
    return () => {
      myRef.current?.close();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className="fixed bottom-0 left-0 right-0 top-0 w-full max-w-4xl rounded-md border border-black p-4 text-black"
      {...props}
    />
  );
}
