import m from "./sidebar.module.css";
import {NavLink} from 'react-router-dom';
import React from "react";

const Sidebar: React.FC = () => {
    return (
        <div className={m.sidebar}>
            <div className={`${m.container} _container`}>
                <nav className={m.body}>
                    <ul className={m.list}>
                        <li className={m.item}>
                            <NavLink to="/profile" className={ navTarget => navTarget.isActive ? m.active : m.link }>Profile</NavLink>
                        </li>
                        <li className={m.item}>
                            <NavLink to="/messages" className={ navTarget => navTarget.isActive ? m.active : m.link }>Messages</NavLink>
                        </li>
                        <li className={m.item}>
                            <NavLink to="/users" className={ navTarget => navTarget.isActive ? m.active : m.link }>Users</NavLink>
                        </li>
                        <li className={m.item}>
                            <a href="true" className={m.link}>Music</a>
                        </li>
                        <li className={m.item}>
                            <a href="true" className={m.link}>Settings</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;