import m from "./profileInfo.module.css";
import Preloader from '../../common/preloader/preloader'
import ProfileStatusWithHook from "./profileStatusWithHook";
import ProfileDataForm from './profileDataSettings';
import React, { ChangeEvent } from "react";
import userPhoto from '../../../assets/images/user.jpg'
import { useState } from "react";
import { profileType } from "../../../redux/types/types";

type propsType = {
    updateProfile: (info: profileType) => void
    loadPhoto: (info: File) => void
    isOwner: boolean
    status: string
    profile: profileType
    updateStatusThunk: (status: string) => void
}

const ProfileInfo: React.FC<propsType> = (props) => {
    

    let [editMode, setEditMode] = useState(false)


    const activateEditMode = () => {
        setEditMode(true)
        console.log(props)
    }

    const onSubmit = (info: profileType) => {
        props.updateProfile(info)
        setEditMode(false)
    }

    if(!props.profile) {
        return <Preloader/>
    }

    const loadPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length) {
            props.loadPhoto(e.target.files[0])
        }
    }

    return (
        <div className={m.container}>
            <div className={m.photoContent}>
                <div className={m.photoWrapper}>
                    {props.profile.photos.large
                        ? <img alt='img' src={props.profile.photos.large} />
                        : <img alt='img' src={userPhoto} />
                    }
                </div>
                <div className={m.photoChange}>{props.isOwner &&
                    <div className={m.photoChangeWrapper}>
                        <input className={m.photoInput} onChange={loadPhoto} type='file' />
                        <button className={m.photoInputButton} >Изменить изображение</button>
                    </div>}
                </div>
            </div>
            <ProfileStatusWithHook  status={props.status} updateStatusThunk={props.updateStatusThunk}/>
            {editMode 
            ? <ProfileDataForm onSubmit={onSubmit} initialValues={props.profile}/>
            : <ProfileData isOwner={props.isOwner} activateEditMode={activateEditMode} profile={props.profile}/>}
        </div>
    );
}

type profileDataPropsType = {
    activateEditMode: () => void
    profile: profileType
    isOwner: boolean
}

const ProfileData: React.FC<profileDataPropsType> = (props) => {
    return (
        <div className={m.info}>
            {props.isOwner && <button className={m.formButton} onClick={props.activateEditMode}>Change info</button>}
            <h2 className={m.name}>{props.profile.fullName}</h2>
            <div className={m.infoItemWrapper}>
                <div> <div className={m.infoItemTitle}>Looking for a job:</div> {props.profile.lookingForAJob
                    ? <span>Yes</span>
                    : <span>No</span>}
                </div>
                <div><div className={m.infoItemTitle}>Description:</div> {props.profile.lookingForAJobDescription}</div>
                <div><div className={m.infoItemTitle}>About me:</div> {props.profile.aboutMe}</div>
            </div>
        </div>
    )
}



export default ProfileInfo;