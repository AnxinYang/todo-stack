import { ChangeEvent, CSSProperties, LegacyRef, useEffect, useState } from 'react';
import styles from './Input.module.css';


interface InputProps {
    ref?: LegacyRef<HTMLInputElement>
    name?: string,
    className?: string
    containerStyle?: CSSProperties
    inputStyle?: CSSProperties
    labelStyle?: CSSProperties
    label?: string
    type?: string
    inline?: boolean
    required?: boolean
    disabled?: boolean
    value?: string | number
    onChange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void
    onKeyPress?: (value: string, e: React.KeyboardEvent<HTMLInputElement>) => void
    placeholder?: string
}


export function Input(props: InputProps) {
    const [value, setValue] = useState(props.value ?? '');

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    return (
        <div className={styles.container + ' ' + props.className ?? ''} style={{
            display: props.inline ? 'inline-block' : 'block',
            ...props.containerStyle
        }}>
            <InputLabel label={props.label} style={props.labelStyle} />
            <input
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => {
                    const newValue = e.target.value;
                    props.onChange && props.onChange(newValue, e)
                    setValue(newValue)
                }}
                onKeyPress={(e) => {
                    props.onKeyPress && props.onKeyPress(value + '', e)
                }}
                style={props.inputStyle}
                disabled={props.disabled}
                required={props.required} />
        </div>
    )
}


export function InputLabel(props: {
    label?: string
    style?: CSSProperties
}) {
    if (!props.label) return null;
    return (
        <label style={props.style}>{props.label}</label>
    )
}