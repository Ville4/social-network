import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { appStateType } from "../redux/redux-store";

const mapStateToPropsForNavigate = (state: appStateType) => {
    return {
    isAuth: state.auth.isAuth
    }
}

type mapPropsType = {
    isAuth: boolean
}

type mapDispatchType = {
    
}


export function withAuthNavigate<P extends object> (Component: React.ComponentType<P>)  {
    const NavigateComponent: React.FC<mapPropsType & mapDispatchType> = (props) => {
        const {isAuth, ...restprops} = props
        if (!props.isAuth) {
            return <Navigate to='/login'/>
        }
        return <Component {...restprops as P}/>
    }

    let ConnectedAuthNavigateComponent = connect(mapStateToPropsForNavigate)
    (NavigateComponent)
    return ConnectedAuthNavigateComponent
}

