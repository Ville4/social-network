import { Field, Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { filterSelector } from "../../redux/users-selectors";
import { filterType } from "../../redux/usersPage-reducer";
import m  from "./users.module.css"

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type UsersSearchFormPropsType = {
  onFilterChanged: (filter: filterType) => void
  setCurrentPortion: (number: number) => void
}

type formType = {
  term: string
  friend: boolean | null
}

const UsersSearchForm: React.FC<UsersSearchFormPropsType> = (props) => {

    const filter = useSelector(filterSelector)

    const submit = (values: formType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
         const filter: filterType = {
           term: values.term,
           //friend: values.friend === 'true' ? true :  values.friend === 'false ' ? false : null
           friend: values.friend
          }
          
        props.onFilterChanged(filter)
        setSubmitting(false)
        props.setCurrentPortion(1)
      }

    return (
        <Formik
        enableReinitialize={true}
        initialValues={{term: String(filter.term), friend:filter.friend}}
        validate={usersSearchFormValidate}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form className={m.form}>
            <Field className={m.formItem} type="text" name="term" />
            <Field className={m.formItem} as="select" name="friend">
             <option value="null">All</option>
             <option value='true'>Only friends</option>
             <option value="false">Other users</option>
           </Field>
            <button className={m.formButton} type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    )
}

const UsersSearchFormMemo = React.memo(UsersSearchForm)

export default UsersSearchFormMemo