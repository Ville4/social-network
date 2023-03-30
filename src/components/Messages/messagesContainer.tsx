import { actions } from "../../redux/messagesPage-reducer.ts"
import Messages from "./messages";
import { connect } from "react-redux";
import { withAuthNavigate } from "../../hoc/withAuthNavigate";
import { compose } from "redux";
import { appStateType } from "../../redux/redux-store";
import React from "react";


let mapStateToProps = (state: appStateType) => {
    return {
        messagesState: state.messagesPage,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions}),
    withAuthNavigate
)(Messages)
