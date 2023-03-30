
import { appStateType } from './redux-store'

export const usersSelector = (state: appStateType) => {
    return state.usersPage.users
}

export const usersPageLimitSelector = (state: appStateType) => {
    return state.usersPage.usersPageLimit
}

export const totalUsersCountSelector = (state: appStateType) => {
    return state.usersPage.totalUsersCount
}

export const currentPageSelector = (state: appStateType) => {
    return state.usersPage.currentPage
}

export const isFetchingSelector = (state: appStateType) => {
    return state.usersPage.isFetching
}

export const followingInProgressSelector = (state: appStateType) => {
    return state.usersPage.followingInProgress
}

export const filterSelector = (state: appStateType) => {
    return state.usersPage.filter
}
