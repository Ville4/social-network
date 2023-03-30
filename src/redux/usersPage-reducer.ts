import { usersAPI } from "../api/api";
import {usersType} from './types/types'
import { actionsType, BaseThunkType } from "./redux-store";



let initialState = {
   users: [
   ] as Array<usersType>,
   totalUsersCount: 0,
   usersPageLimit: 5,
   currentPage: 1,
   isFetching: false,
   followingInProgress: [] as Array<number>,
   filter: {
        term: '' as null | string,
        friend: null as null | boolean
   }
}  

type initialStateType = typeof initialState
export type filterType = typeof initialState.filter

const usersPageReducer = (state = initialState, action: usersPageActionsTypes)
: initialStateType => {

    switch (action.type) {
        case 'FOLLOW': 
            return {
                ...state,
                users: state.users.map (u => {
                    if(u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map (u => {
                    if(u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case 'SET_USERS': 
        
            return {
                
                ...state,
                users: action.users ,
            }
        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.page
            }
        case 'TOGGLE_IS_FETHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'FOLLOWING_IN_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload
            }
            
            
        default:
            return state;
    }
    
}

type usersPageActionsTypes = actionsType<typeof actions>

export const actions = {
    follow: (userId:number)=> {
        return {
            type: 'FOLLOW',
            userId
        } as const
    },
    unFollow: (userId:number) => {
        return {
            type: 'UNFOLLOW',
            userId
        } as const
    },
    setUsers: (users: Array<usersType>)=> ({type: 'SET_USERS', users} as const),
    setTotalUsersCount: (totalCount:number) => {
        return {
            type: 'SET_TOTAL_USERS_COUNT',
            totalCount
        } as const
    },
    setCurrentPage: (page:number) => {
        return {
            type: 'SET_CURRENT_PAGE',
            page
        } as const
    },
    toggleIsFetching: (isFetching:boolean) => {
        return {
            type: 'TOGGLE_IS_FETHING',
            isFetching
        } as const
    },
    toggleFollowingProgress: (isFetching:boolean, userId:number) => {
        return {
            type: 'FOLLOWING_IN_PROGRESS',
            isFetching,
            userId
        } as const
    }, 
    setFilter: (filter: filterType) => {
        return {
            type: 'SET_FILTER',
            payload: filter
        } as const
    }
}

type thunkType = BaseThunkType<usersPageActionsTypes>

export const setUsersThunk = (currentPage:number, usersPageLimit:number, filter: filterType)
: thunkType => {
    return async (dispatch) => {
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setFilter(filter))
        const data = await usersAPI.getUsers(currentPage, usersPageLimit, filter)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
}

export const getUsersThunk = (currentPage:number, usersPageLimit:number, filter: filterType): 
thunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setFilter(filter))
        const data = await usersAPI.getUsers(currentPage, usersPageLimit, filter)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
}

export const followThunk = (userId:number): thunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleFollowingProgress(true, userId));
        const data = await usersAPI.follow(userId)
            if (data.resultCode === 0) {
                dispatch(actions.follow(userId))
            }
            dispatch(actions.toggleFollowingProgress(false, userId));
    }
}

export const unFollowThunk = (userId:number): thunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleFollowingProgress(true, userId));
        const data = await usersAPI.unFollow(userId)
            if (data.resultCode === 0) {
                dispatch(actions.unFollow(userId))
            }
            dispatch(actions.toggleFollowingProgress(false, userId));
    }
}

export default usersPageReducer;
