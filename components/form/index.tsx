import { ReactNode } from "react";

interface FormProps {
    children?: ReactNode
    onSubmit?: ((data: any) => void) | ((data: any) => Promise<any>)
}


export default function Form(props: FormProps) {
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const data: any = {}

            formData.forEach((value, key) => {
                data[key] = value
            })
            props.onSubmit && props.onSubmit(data)
        }}>
            {props.children}
        </form>
    )
}