import React, { ChangeEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";
import m from "./profileInfo.module.css";

type propsType = {
    status: string
    updateStatusThunk: (status: string) => void
}

const ProfileStatusithHook: React.FC<propsType> = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatusThunk(status)
    }

    const statusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        < >
            {editMode
                ? <div className={m.statusWrapper}>
                    <input className={m.status} onChange={statusChange} onBlur={deactivateEditMode} value={status} autoFocus />
                </div>
                : <div className={m.statusWrapper}>
                    <div className={m.status} onDoubleClick={activateEditMode}>{props.status || 'No Status'}</div>
                </div>
            }
        </>
    )
}

export default ProfileStatusithHook;