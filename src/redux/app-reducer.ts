import { authThunk } from './auth-reducer';
import { actionsType } from './redux-store';

export type initialStateType = {
    initialized: boolean
}

let initialState: initialStateType  = {
    initialized: false,
}

const appReducer = (state: initialStateType = initialState, action: appActionsType)
: initialStateType=> {

    switch (action.type) {
        case 'SET-INITIALIZE':{
            return {
                ...state,
                initialized: true
            }
        }
        default: 
            return state;
    }
}

type appActionsType = actionsType<typeof actions>

export const actions = {
    setInitialize: () => {
        return {
            type: 'SET-INITIALIZE'
        } as const
    }    
}

export const initializeThunk = () => {
    return (dispatch: any) => {
        let promise = dispatch(authThunk())
        promise.then(() => {
            dispatch(actions.setInitialize())
        })
    }
}

export default appReducer;