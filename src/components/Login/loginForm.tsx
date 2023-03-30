import React from "react";
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { Input, fieldType } from "../common/FormsControl/formsConrol";
import {required} from '../../utils/validators/validator';
import m from '../common/FormsControl/formsControls.module.css'
import { loginFormValuesType } from "./login";
import style from './login.module.css'

type loginFormOwnProps = {
    captchaURL: string | null
}

type loginFormKeyType = keyof loginFormValuesType

const LoginForm: React.FC<InjectedFormProps<loginFormValuesType, loginFormOwnProps>
 & loginFormOwnProps> = (props) => {
    return(
        <form className={style.form} onSubmit={props.handleSubmit}>
            <div>
                <Field<fieldType<loginFormKeyType>> component={Input} name ='email'
                placeholder='email' validate={[required]}/>
            </div>
            <div>
                <Field<fieldType<loginFormKeyType>> component={Input} name='password' placeholder='password'
                validate={[required]} type='password'/>
            </div>
            <div>
                <Field<fieldType<loginFormKeyType>> type='checkbox' component='input' name='rememberMe'/> remember me
            </div>

            {props.captchaURL && <img alt="captcha" src={props.captchaURL}/>}
            {props.captchaURL && <div>
                <Field<fieldType<loginFormKeyType>> component={Input} name='captcha' validate={[required]} placeholder='captcha'/> 
            </div>}

            {props.error && <div className={m.errorAuth}>{props.error}</div>}
            <div>
                <button className={style.button}>
                    Login
                </button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<loginFormValuesType, loginFormOwnProps> ({
    form: 'login'
})(LoginForm)

export default LoginReduxForm