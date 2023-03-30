import axios from 'axios'
import { profileType, usersType, photosType } from '../redux/types/types'
import { filterType } from '../redux/usersPage-reducer'

const instance = axios.create ({
    withCredentials: true,
    headers: {
        'API-KEY': '0a1aefe8-f9d7-4680-bd5f-3335ccb19fc7'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

type getUsersType = {
    items: Array<usersType>
    totalCount: number
    filter: filterType
    error: string | null
}

type responseType<D = {}, RC = resultCodesEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}
enum resultCodesEnum {
    sucsess = 0,
    error = 1
}
enum resultCodeForCaptchaEnum {
    captchaIsRequaired = 10
}
type meResponseDataType = {
    id: number
    email: string
    login: string
}
type loginResponseDataType = {
    id: number
}

type photosResponseDataType = {
    photos: photosType
}

type getCaptchaResponseDataType = {
    url: string
}

export const usersAPI = {
    getUsers(currentPage: number, usersPageLimit: number, filter: filterType) {
        return instance.get<getUsersType>(`users?page=${currentPage}&count=${usersPageLimit}&term=${filter.term}` + (filter.friend === null ? '' : `&friend=${filter.friend}`))
        .then(response => {
            return response.data
        })
    },
    setProfile(userId: number) {
        console.log('method is deprecated, use profileAPI.setProfile')
        return profileAPI.setProfile(userId)
    },
    isAuth() {
        console.log('method is deprecated, use authAPI.isAuth')
        return authAPI.isAuth()
    },
    follow(id: number) {
        return instance.post<responseType>(`follow/${id}`, {})
        .then(response => {
            return response.data
        })
    },
    unFollow(id: number) {
        return instance.delete<responseType>(`follow/${id}`,)
        .then(response => {
            return response.data
        })
    }
}

export const profileAPI = {
    setProfile(userId: number) {
        return instance.get<profileType>(`profile/${userId}`)
        .then(response => {
            return response.data
        })
    },
    setStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
        .then(response => {
            return response.data
        })
    },
    updateStatus(status: string) {
        return instance.put<responseType>(`profile/status`, {status})
        .then(response => {
            return response.data
        })
    },
    loadPhoto(photo:any) {
        const formData = new FormData()
        formData.append('image', photo)

        return instance.put<responseType<photosResponseDataType>>(`profile/photo`, formData,
        {headers: {
            'Content-Type': 'multipart/form-data'
        }})
        .then(response => {
            return response.data
        })
    },
    updateProfile(formData: profileType) {
        return instance.put<responseType>(`profile`, formData)
        .then(response => {
            return response.data
        })
    },
}

export const authAPI = {
    isAuth() {
        return instance.get<responseType<meResponseDataType>>(`auth/me`)
        .then(response => {
            return response.data
        })
    },
    login(email: string, password: string, rememberMe = false,
    captcha: null | string = null ) {
        return instance.post
        <responseType<loginResponseDataType, resultCodesEnum | resultCodeForCaptchaEnum>>
        (`auth/login`, {email, password, rememberMe, captcha})
        .then(response => {
            return response.data
        })
    },
    logout() {
        return instance.delete(`auth/login`)
        .then(response => {
            return response.data
        })
    },
}

export const securityAPI = {
    setCaptchaURL() {
        return instance.get<getCaptchaResponseDataType>(`security/get-captcha-url`)
        .then(response => {
            return response.data
        })
    }
}



