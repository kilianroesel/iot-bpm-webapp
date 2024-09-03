import { DetailedHTMLProps, FormHTMLAttributes, HTMLAttributes, LabelHTMLAttributes } from "react";

export function Form(props: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) {
    return <form className="space-y-4" {...props}/>
}

export function FormLabel(props: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>) {
    return <label className="block" {...props} />
}

export function FormHeader(props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    return <h3 className="font-medium" {...props} />
}
