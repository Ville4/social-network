import m from "./messages.module.css";
import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import {required, maxLengthCreator} from '../../utils/validators/validator';
import { Textarea, fieldType } from "../common/FormsControl/formsConrol";
import {messagesFormValuesType} from './messages'

const maxLength100 = maxLengthCreator(100)

type messagesFormKeyType = keyof messagesFormValuesType
type propsType = {}

const MessagesForm: React.FC<InjectedFormProps<messagesFormValuesType, propsType> & propsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}  className={m.form}>
            <div className={m.textarea}>
                <Field<fieldType<messagesFormKeyType>> component={Textarea}
                 name='newMessage' validate={[required, maxLength100]}/>
            </div>
            <div>
                <button className={m.button}>Send</button>
            </div>
        </form>
    );
}

const MessagesReduxForm = reduxForm<messagesFormValuesType> ({
    form: 'addMessage'
})(MessagesForm)

export default MessagesReduxForm;