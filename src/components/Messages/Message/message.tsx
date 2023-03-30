import m from "../messages.module.css";

type propsType = {
    message: string
}

const Message: React.FC<propsType>= (props) => {
    
    return (
        <div className={m.message}>{props.message}</div>
    );
}

export default Message;