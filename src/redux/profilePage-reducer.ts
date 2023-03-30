import { usersAPI, profileAPI } from "../api/api";
import { actionsType, BaseThunkType } from "./redux-store";
import {postType, photosType, profileType} from './types/types'

let initialState = {
    Posts: [
        {id: 1, message: 'Heloo'},
        {id: 2, message: 'I wanna pick pudgee'},
    ] as Array<postType>,
    userProfile: null as profileType | null,
    status: '',
}

type initialStateType = typeof initialState

const profilePageReducer = (state = initialState, action: profilePageActionsType)
: initialStateType => {

    switch (action.type) {
        case 'ADD-POST':{
            return {
                ...state,
                Posts: [...state.Posts, {id: 3, message: action.newPost}]
            }
        }
        case 'SET-USER-PROFILE': {
            return {
                ...state,
                userProfile: action.profile
            }
        }
        case 'SET-STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'LOAD-PHOTO': {
            return {
                ...state,
                userProfile: {...state.userProfile, photos: action.photos} as profileType
            }
        }
        default: 
            return state;
    }
}

type profilePageActionsType = actionsType<typeof actions>

export const actions = {
    addPostActionCreator: (newPost:string) => {
        return {
            type: 'ADD-POST',
            newPost
        } as const
    },
    setStatus: (status:string) => {
        return {
            type: 'SET-STATUS',
            status
        } as const
    },
    setUserProfile: (profile: profileType) => {
        return {
            type: 'SET-USER-PROFILE',
            profile
        } as const
    },
    loadPhotoSuccess: (photos: photosType) => {
        return {
            type: 'LOAD-PHOTO',
            photos
        } as const
    }
}

type thunkType = BaseThunkType<profilePageActionsType>

export const setProfileThunk = (userId: number): thunkType => async (dispatch) => {
    const data = await usersAPI.setProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getStatusThunk = (userId: number): thunkType => async (dispatch) => {
    const data = await profileAPI.setStatus(userId)
    dispatch(actions.setStatus(data))
}


export const updateStatusThunk = (status: string): thunkType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    if(data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }  
}


export const loadPhoto = (file:any): thunkType => async (dispatch) => {
    const data = await profileAPI.loadPhoto(file)
    if(data.resultCode === 0) {
        dispatch(actions.loadPhotoSuccess(data.data.photos))
    }   
}


export const updateProfile = (formData:profileType): thunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    const data = await profileAPI.updateProfile(formData)
    if(data.resultCode === 0) {
        if(userId !== null) {
            dispatch(setProfileThunk(userId))
        } else {
            console.log(' ID error')
        }
        
    }   
}



export default profilePageReducer;