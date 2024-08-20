import "./Posts.css";
import PostList from './PostList';
import { postsApi } from "../postsApi";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";



const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const posts = await postsApi.get();
            console.log(posts);
            setPosts(posts);
        } catch (error) {
            console.error(error); 
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="posts">
            {loading ? (
                <Spinner animation="border" variant="primary" />
            ) : (
                <PostList posts={posts} />
            )}
        </div>
    );
};

export default Posts;