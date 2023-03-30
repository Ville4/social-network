import React from "react"
import { WrappedFieldProps } from "redux-form"
import { validatorType } from "../../../utils/validators/validator"
import m from './formsControls.module.css'

export const Textarea: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    const showError = meta.touched && meta.error
    return (
        <div className={showError ? m.error : null}>
            <textarea className={m.formItem} {...input} {...props} ></textarea>
            { showError && <div className={m.error}>{meta.error}</div>}
        </div>
    )
}

export const Input: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    const showError = meta.touched && meta.error
    return (
        <div className={showError ? m.error : null}>
            <input className={m.formItem} {...input} {...props} />
            { showError && <div className={m.error}>{meta.error}</div>}
        </div>
    )
}

export type fieldType<K> = {
    name: K
    component: React.FC<WrappedFieldProps> | string
    placeholder?: string
    validate?: Array<validatorType>
    type?: string
}