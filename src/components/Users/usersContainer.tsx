import {Users} from "./users";
import React from "react";
import m  from "./users.module.css"

type usersPagePropsType = {

}
const UsersPage: React.FC<usersPagePropsType> = (props) => {
    return (
        <div className={m.wrapper}>
            <h2 className={m.title}>Users</h2>
            <Users />
        </div>

    )
}

export default UsersPage
