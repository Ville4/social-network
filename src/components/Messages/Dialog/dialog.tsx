import { NavLink } from "react-router-dom";
import m from "../messages.module.css";

type propsType = {
    id: number
    name: string
}

const Dialog: React.FC<propsType> = (props) => {
    return (
        <div className={`${m.dialog} ${m.active}`}>
            <NavLink className={m.name} to={`/messages/${props.id}`}>{props.name}</NavLink>
        </div>
    );
}


export default Dialog;