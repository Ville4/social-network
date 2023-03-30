import {actions} from "../../../redux/profilePage-reducer"
import Posts from "./posts";
import { connect } from "react-redux";
import { appStateType } from "../../../redux/redux-store";


let mapStateToProps = (state: appStateType) => {
    return {
        messages: state.profilePage.Posts
    }
}




const PostsContainer = connect(mapStateToProps, {...actions})(Posts);

export default PostsContainer;