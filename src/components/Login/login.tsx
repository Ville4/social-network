import React from "react";
import LoginReduxForm from "./loginForm";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from '../../redux/auth-reducer'
import { Navigate } from "react-router-dom";
import { appStateType } from "../../redux/redux-store";
import { AnyAction } from "redux";
import m from './login.module.css'

export type loginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

const Login: React.FC = () => {

    const captchaURL = useSelector((state:appStateType) => state.auth.captchaURL)
    const isAuth = useSelector((state:appStateType) => state.auth.isAuth)

    const dispatch = useDispatch()
    const onSubmit = (formData: loginFormValuesType) => {
        dispatch(loginThunk(formData.email, formData.password, formData.rememberMe, formData.captcha) as unknown as AnyAction)
    }

    if(isAuth) return <Navigate to='/profile'/>
    return(   
        <div className={m.wrapper}> 
            <h1 className={m.title}>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaURL={captchaURL}/>       
        </div>
    )
}


export default Login