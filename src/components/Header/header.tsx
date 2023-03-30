import {Button} from 'antd';
import React from 'react';
import {NavLink } from 'react-router-dom';
import m from './header.module.css';
import { appStateType } from '../../redux/redux-store';
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk } from '../../redux/auth-reducer';
import { AnyAction } from 'redux';

type propsType = {
    
}


const Header: React.FC<propsType> = (props) => {

    const isAuth = useSelector((state:appStateType) => state.auth.isAuth)
    const login = useSelector((state:appStateType) => state.auth.login)
    const dispatch = useDispatch()
    const logoutThunkDispatch = () => {
        dispatch(logoutThunk() as unknown as AnyAction)
    } 

    return (
        <header className={m.header}>
            <div className={`${m.container} _container`}>
                <div className={m.logoWrapper}>
                    <NavLink to='/profile' className={m.logo}>
                        <img alt='img' src='https://thumbs.dreamstime.com/z/%D0%BB%D0%BE%D0%B3%D0%BE-%D0%B4%D0%BE%D0%BC%D0%B0-%D0%B0%D1%80%D1%85%D0%B8%D1%82%D0%B5%D0%BA%D1%82%D1%83%D1%80%D0%B0-%D0%B4%D0%BE%D0%BC-%D0%B6%D0%B8%D0%B7%D0%BD%D1%8C-%D0%B4%D0%BE%D0%BC%D0%B0%D1%88%D0%BD%D0%B8%D0%B9-%D0%BA%D0%BE%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%86%D0%B8%D1%8F-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B4%D0%BB%D1%8F-165826974.jpg' />
                    </NavLink>
                </div>
                <div>
                    {isAuth
                        ? <div>
                            {login} - <Button onClick={logoutThunkDispatch}>logout</Button>
                        </div>
                        : <Button>
                            <NavLink to='/login'>login</NavLink>
                         </Button>
                    }
                </div>
            </div>
        </header>
    );
}


export default Header;