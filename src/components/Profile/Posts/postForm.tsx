import m from "./posts.module.css";
import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import {required, maxLengthCreator} from '../../../utils/validators/validator'
import { Textarea, fieldType } from "../../common/FormsControl/formsConrol";
import { postsValuesType } from "./posts";

const maxLength50 = maxLengthCreator(50)

type postFormKeyType = keyof postsValuesType
type propsType = {}

const PostForm: React.FC<InjectedFormProps<postsValuesType, propsType>
 & propsType> = (props) => {   
    return (
            <form onSubmit={props.handleSubmit} className={m.form}>
                <div>
                    <Field<fieldType<postFormKeyType>>  component={Textarea} name='newPost'
                    validate={[required, maxLength50]} placeholder='post message'/>
                </div>
                <div>
                    <button className={m.button}>Add</button>
                </div>
            </form>
    );
}

const PostReduxForm = reduxForm<postsValuesType> ({
    form: 'addPost'
})(PostForm)

export default PostReduxForm;