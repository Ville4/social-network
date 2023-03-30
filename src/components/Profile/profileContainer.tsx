import Profile from "./profile";
import React from "react";
import { connect } from "react-redux";
import {setProfileThunk, getStatusThunk,
    updateStatusThunk, loadPhoto, updateProfile} from '../../redux/profilePage-reducer'
import { useParams } from 'react-router-dom'
import { withAuthNavigate } from "../../hoc/withAuthNavigate";
import { compose } from "redux";
import { appStateType } from "../../redux/redux-store";
import { profileType } from "../../redux/types/types";


export function withRouter(Children:any){
    return(props:any)=>{
       const match  = {params: useParams()};
       return <Children {...props}  match = {match}/>
   }
}


type propsType = mapStateProps & dispatchProps

class ProfileContainer extends React.Component<propsType | any> {
    refreshProfile() {
        let userId: number | null = this.props.match.params.userId
        if(!userId) {
            userId = this.props.authUserId
        }

        this.props.setProfileThunk(userId)
        this.props.getStatusThunk(userId)
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: propsType | any) {
        if(this.props.match.params !== prevProps.match.params) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile updateProfile={this.props.updateProfile}  profile={this.props.profile} status={this.props.status}
            updateStatusThunk={this.props.updateStatusThunk}
            isOwner={!this.props.match.params.userId} loadPhoto={this.props.loadPhoto}/>
        );
    }
}

let mapStateToProps = (state: appStateType) => {
    return {
        profile: state.profilePage.userProfile,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        authUserId: state.auth.id
    }
}

type mapStateProps = ReturnType<typeof mapStateToProps>
type dispatchProps = {
    setProfileThunk: (userId: number | null) => void
    getStatusThunk: (userId: number | null) => void
    updateStatusThunk: (status: string) => void
    loadPhoto: (info: File) => void
    updateProfile: (info: profileType) => void
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {setProfileThunk, getStatusThunk,
     updateStatusThunk, loadPhoto, updateProfile}),
    withRouter,
    withAuthNavigate  
)(ProfileContainer)

