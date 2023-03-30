import React from "react";
import { useSelector } from "react-redux";
import { appStateType } from "../../../../redux/redux-store";
import m from "./post.module.css";
import userPhoto from '../../../../assets/images/user.jpg'

type propsType = {
    message: string
}

const Post: React.FC<propsType> = (props) => {

    const img = useSelector((state:appStateType) => state.profilePage.userProfile?.photos.small)

    return (
        <div className={m.post}>
            <div className={m.img}>
                {img
                    ? <img src={img} alt="img" />
                    : <img alt='img' src={userPhoto} />
                }
            </div>
            <div className={m.text}>
                {props.message}
            </div>
        </div>
    );
}

export default Post;