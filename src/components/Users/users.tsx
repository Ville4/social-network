import m  from "./users.module.css"
import React, { useEffect, useState } from "react"
import userPhoto from '../../assets/images/user.jpg'
import Preloader from "../common/preloader/preloader"
import { NavLink, useSearchParams } from "react-router-dom"
import UsersSearchForm from "./usersSearchForm"
import { filterType, followThunk, getUsersThunk, setUsersThunk, unFollowThunk } from "../../redux/usersPage-reducer"
import { useDispatch, useSelector } from "react-redux"
import { currentPageSelector, filterSelector, followingInProgressSelector, isFetchingSelector, totalUsersCountSelector,
     usersPageLimitSelector, 
     usersSelector} from "../../redux/users-selectors"
import { AnyAction } from "redux"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"


type propsType = {

}

export const Users: React.FC<propsType> = (props) => {

    const totalUsersCount = useSelector(totalUsersCountSelector)
    const currentPage = useSelector(currentPageSelector)
    const usersPageLimit = useSelector(usersPageLimitSelector)
    const filter = useSelector(filterSelector)
    const users = useSelector(usersSelector)
    const followingInProgress = useSelector(followingInProgressSelector)
    const isFetching = useSelector(isFetchingSelector)

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(()=> {

        let currentFriendStatus: any = searchParams.get('friend')
        console.log(currentFriendStatus)
        if(currentFriendStatus === 'true') {
            currentFriendStatus = true
            console.log(currentFriendStatus)
        } if (currentFriendStatus === 'null') {
            currentFriendStatus = null
            console.log(currentFriendStatus)
        } else {
            currentFriendStatus = false
            console.log(currentFriendStatus)
        }
        const currentTermStatus = searchParams.get('term')
        const currentPageStatus = searchParams.get('page')

        let actualPage = currentPage
        if(currentPageStatus) actualPage = Number(currentPageStatus)

        let actualFilter = filter
        if(currentTermStatus) actualFilter = {...actualFilter, term: currentTermStatus}
        if(currentFriendStatus) actualFilter = {...actualFilter, friend: currentFriendStatus}

        
        dispatch(getUsersThunk(actualPage, usersPageLimit, actualFilter) as unknown as AnyAction)
    }, [])

    useEffect(() => {
        const term = filter.term
        const friend = filter.friend

        let urlQuery =
            (term === '' ? '' : `&term=${term}`)
            + (friend === null ? '' : `&friend=${friend}`)
            + (currentPage === 1 ? '' : `&page=${currentPage}`)

        setSearchParams(urlQuery)
    }, [filter, currentPage])

  
    const dispatch = useDispatch()
    const onChangedPage = (p: number) => {
        dispatch(setUsersThunk(p, usersPageLimit, filter) as unknown as AnyAction)
    }
    const onFilterChanged = (filter: filterType) => {
        dispatch(setUsersThunk(1, usersPageLimit, filter) as unknown as AnyAction)
    }
    const follow = (id: number) => {
        dispatch(followThunk(id) as unknown as AnyAction)
    }
    const unFollow = (id: number) => {
        dispatch(unFollowThunk(id) as unknown as AnyAction)
    }
 
    let pagesCount = Math.ceil(totalUsersCount / usersPageLimit)
    let portionSize = 5
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [currentPortion, setCurrentPortion] = useState(1)
    let leftBorderPortion = (currentPortion - 1) * portionSize + 1
    let rightBorderPortion = currentPortion * portionSize
    let pages: any = []


    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (<div className={m.wrapper}>
        {isFetching ? <Preloader/> : null}
        <UsersSearchForm setCurrentPortion={setCurrentPortion} onFilterChanged={onFilterChanged}/>
        <div className={m.container}> 
            <div className={m.pagination}>
                {currentPortion > 1 && <button onClick={()=>{setCurrentPortion(currentPortion - 1)}}><LeftOutlined/></button> }
                {pages.filter((p:number) => p >= leftBorderPortion && p <= rightBorderPortion)
                    .map((p:number) => {
                    return <span key={p}
                    className={p === currentPage ? m.selected : null}
                    onClick={(e) => { onChangedPage(p) }}>{p}</span>
                })}
                {portionCount > currentPortion && <button onClick={()=>{setCurrentPortion(currentPortion + 1)}}><RightOutlined/></button>}
            </div>
            
            {

                users.map(user => <div key={user.id} className={m.body} >
                    <div className={m.imgWrapper}>
                        <div className={m.imgContainer}>
                            <div className={m.img}>
                                <NavLink to={'/profile/' + user.id}>
                                    <img src={user.photos.small != null ? user.photos.small : userPhoto} alt='avatar' />
                                </NavLink>
                            </div>
                        </div>
                        <div className={m.buttonWrapper}>
                            {user.followed 
                            ? <button disabled={followingInProgress
                                .some(id => id === user.id)} onClick={() => {unFollow(user.id)}}
                                className={m.button}>Unfollow</button> 
                            :<button disabled={followingInProgress
                                .some(id => id === user.id)} onClick={() => {follow(user.id)}}
                                className={m.button}>Follow</button>}
                        </div>
                    </div>
                    <div className={m.info}>
                        <div className={m.nameWrapper}>
                            <h2 className={m.name}>{user.name}</h2>
                            <div className={m.status}>{user.status}</div>
                        </div>
                        <div className={m.locationWrapper}>
                            <div>{'...info'}</div>
                            <div>{'...info'}</div>
                        </div>
                    </div>
                </div>
                )
            }
        </div>
    </div>
    )
}

