import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { profileType } from '../../../redux/types/types';
import { Input, Textarea, fieldType } from "../../common/FormsControl/formsConrol";
import m from "./profileInfo.module.css";

type ProfileDataSettingsKeyType = keyof profileType

type propsType = {}

const ProfileDataSettings:
 React.FC<InjectedFormProps<profileType, propsType> &
 propsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={m.info}>
            <button className={m.formButton}>Save</button>
            <div className={m.infoItemWrapper}>
                <div>Name:</div>
                <Field<fieldType<ProfileDataSettingsKeyType>> component={Input}
                name='fullName' placeholder='Name'/>
            </div>
            
            <div className={m.infoItemWrapper}>
                <div>Looking for a job:</div>
                <Field<fieldType<ProfileDataSettingsKeyType>> component={Input}
                name='lookingForAJob' type={'checkbox'}/>
            </div>
            <div className={m.infoItemWrapper}>
                <div>Job Description:</div>
                <Field<fieldType<ProfileDataSettingsKeyType>> component={Textarea}
                name='lookingForAJobDescription' placeholder='Description'/>
            </div>
            <div className={m.infoItemWrapper}>
                <div>About me:</div>
                <Field<fieldType<ProfileDataSettingsKeyType>> component={Textarea}
                name='aboutMe' placeholder='AboutMe'/>
            </div>
        </form>
    )
}

const ProfileDataForm = reduxForm<profileType> ({
    form: 'profileData'
})(ProfileDataSettings)

export default ProfileDataForm
