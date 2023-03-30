import {applyMiddleware, combineReducers, legacy_createStore as createStore, compose, Action } from 'redux'
import profilePageReducer from './profilePage-reducer'
import messagesPageReducer from './messagesPage-reducer'
import usersPageReducer from './usersPage-reducer'
import authReducer from './auth-reducer'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from './app-reducer'


let reducers = combineReducers({
    profilePage: profilePageReducer,
    messagesPage: messagesPageReducer,
    usersPage: usersPageReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

// типизация для actions 
type propertiseType<T> = T extends {[key:string]: infer U} ? U : never
export type actionsType<T extends {[key:string]: (...arg: any[]) => any}> = ReturnType<propertiseType<T>>

// типизация для thunk 
export type BaseThunkType< A extends Action, R = Promise<void>> = ThunkAction<R, appStateType, unknown, A>

type reducersType = typeof reducers
export type appStateType = ReturnType<reducersType>

// Для корректной работы useDispatch()
export type AppDispatch = typeof store.dispatch

// Для расширения в браузере
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore
(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

//let store = createStore(reducers, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;

export default store;