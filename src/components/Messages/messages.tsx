import m from "./messages.module.css";
import Dialog from "./Dialog/dialog";
import Message from "./Message/message";
import React from "react";
import MessagesReduxForm from './messagesForm'
import { initialStateType } from "../../redux/messagesPage-reducer";

type PropsType = {
    addNewMessageActionCreator: (newMessage: string) => void
    messagesState: initialStateType
}

export type messagesFormValuesType = {
    newMessage: string
}

const Messages: React.FC<PropsType> = (props) => {

    let DialogsElements = props.messagesState.Dialogs.map( dialog => <Dialog name={dialog.name} key={dialog.id} id={dialog.id}/> )
    let MessagesElements = props.messagesState.Messages.map( message => <Message message={message.message} key={message.id}/> )

    let sendMessage = (newMessage: messagesFormValuesType) => {
        if (newMessage.newMessage) {
            props.addNewMessageActionCreator(newMessage.newMessage);
            newMessage.newMessage = ''
        }

    }
    
    return (
        <div className={m.messages}>
            <div className={m.container}>
                <div className={m.dialogs}>
                    {DialogsElements}
                </div>
                <div className={m.content}>
                    <div className={m.messagesWrapper}>{MessagesElements}</div>
                    { <MessagesReduxForm onSubmit={sendMessage}/> }
                </div>
            </div>
        </div>
    );
}

export default Messages;