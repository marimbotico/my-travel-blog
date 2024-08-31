import React from 'react';
import "./Posts.css";
import PostList from './PostList';
import { Spinner } from "react-bootstrap";


const Posts = ({ posts, loading, updatePost, deletePost }) => {// pass all these props to Posts
    return (
        <div className="posts">
            {loading ? (
                <Spinner animation="border" variant="primary" />
            ) : (
                <>
                {/* if there are any posts then do the following: */}
                    {posts.length > 0 ? (
                        <PostList // passes all these props to postList
                            posts={posts} 
                            updatePost={updatePost} 
                            deletePost={deletePost} 
                        />
                    ) : (
                        // Otherwise display this message
                        <p>No posts available. Create a new post!</p>
                    )}
                </>
            )}
        </div>
    );
};

export default Posts;