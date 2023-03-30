import m from "./profile.module.css";
import ProfileInfo from "./ProfileInfo/profileInfo";
import PostsContainer from "./Posts/PostsContainer";
import { profileType } from "../../redux/types/types";
import React from "react";

type propsType = {
    updateProfile: (info: profileType) => void
    loadPhoto: (info: File) => void
    isOwner: boolean
    status: string
    profile: profileType
    updateStatusThunk: (status: string) => void
}

const Profile: React.FC<propsType> = (props) => {
    return (
        <div className={m.container}>
            <ProfileInfo updateProfile={props.updateProfile} loadPhoto={props.loadPhoto}
            isOwner={props.isOwner} profile={props.profile} status={props.status}
            updateStatusThunk={props.updateStatusThunk}/>
            <PostsContainer/>
        </div>
    );
}

export default Profile;
