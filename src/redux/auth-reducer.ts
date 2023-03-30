import { usersAPI, authAPI, securityAPI } from "../api/api" 
import {FormAction, stopSubmit} from 'redux-form'
import { actionsType, BaseThunkType } from "./redux-store"


let initialState = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string, 
    isAuth: false,
    captchaURL: null as null | string
}

export type initialStateType = typeof initialState

const authReducer = (state: initialStateType = initialState, action: authActionsType)
: initialStateType => {

    switch (action.type) {
        case 'SET-USER-DATA':{
            return {
                ...state,
                ...action.data
            }
        }
        case 'SET-CAPTCHA-URL':{
            return {
                ...state,
                captchaURL: action.captcha
            }
        }
        default: 
            return state;
    }
}

type authActionsType = actionsType<typeof actions>

export const actions = {
    setUserData: (id: number | null, email: string | null,
    login: string | null, isAuth: boolean) => {
        return {
            type: 'SET-USER-DATA',
            data: {
                id,
                email,
                login,
                isAuth
            }
        } as const
    },
    setCaptchaURLSuccess: (captcha: string) => {
        return {
            type: 'SET-CAPTCHA-URL',
            captcha
        } as const
    }, 

}

type thunkType = BaseThunkType<authActionsType | FormAction>

export const authThunk = (): thunkType => async (dispatch) => {
    const data = await usersAPI.isAuth()
    if (data.resultCode === 0) {
        let {id, email, login} = data.data
        dispatch(actions.setUserData(id, email, login, true))
    }
}


export const loginThunk = (email: string, password: string, rememberMe: boolean,
captcha: string): thunkType => async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe, captcha)

    if (data.resultCode === 0) {
        dispatch(authThunk())
    } else {
        if (data.resultCode === 10) {
            dispatch(setCaptchaURL()) 
        }
        const message = data.messages.length > 0 ? data.messages[0] : 'error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}


export const logoutThunk = (): thunkType =>  async (dispatch: any) => {
    const data = await authAPI.logout()
    if (data.resultCode === 0) {
        dispatch(actions.setUserData(null, null, null, false))
    }
}

export const setCaptchaURL = (): thunkType =>  async (dispatch) => {
    const data = await securityAPI.setCaptchaURL()
    dispatch(actions.setCaptchaURLSuccess(data.url))
}





export default authReducer;