import m from "./posts.module.css";
import Post from "./Post/post";
import React from "react";
import PostReduxForm from './postForm'
import { postType } from "../../../redux/types/types";

export type postsValuesType = {
    newPost: string
}

type propsType = {
    messages: Array<postType>
    addPostActionCreator: (newPost: string) => void
}

const Posts: React.FC<propsType> = (props) => {

    const PostsElements = props.messages.map( post => 
    <Post message={post.message} key={post.id} />)

    const addPost = (newPost: postsValuesType) => {
        props.addPostActionCreator(newPost.newPost);
        newPost.newPost = ''
    }

    return (
        <div className={m.posts}>
            <h2 className={m.title}>My posts</h2>
            <PostReduxForm onSubmit={addPost}/>
            { PostsElements }
        </div>
    );
}

const MemorizedPosts = React.memo(Posts)

export default MemorizedPosts;