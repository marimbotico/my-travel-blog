import { useState, useEffect } from 'react';
import { postsApi } from '../postsApi';

const withPosts = (WrappedComponent) => {
    return (props) => {
        const { postId } = props;
        const [posts, setPosts] = useState([]);
        const [loading, setLoading] = useState(false);
        const [post, setPost] = useState({});
        // const [postData, setPostData] = useState({
        //     author: '',
        //     title: '',
        //     destination: '',
        //     imgUrl: '',
        //     story: '',
        // });

        //useEffect if there is a postById to fetch then fetch that specific post otherwise fetch all posts
        useEffect(() => {
            if (postId) {
                fetchPostById(postId);
            } else {
                fetchPosts();
            }
        }, [postId]);

        const fetchPosts = async () => {
            try {
                setLoading(true);
                const postsData = await postsApi.get();
                setPosts(postsData);// setPost to the data retrieved by the API
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchPostById = async (id) => {
            try {
                setLoading(true);
                const post = await postsApi.getById(id);// retrieves and specific post by Id
                setPost(post);//setPost to the specific post
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        return (
            <WrappedComponent
                posts={posts}
                post={post}
                loading={loading}
                fetchPosts={fetchPosts}
                fetchPostById={fetchPostById}
                setPosts={setPosts}
                {...props}
                //define all the properties of the wrapped component which is an
            />
        );
    };
};

export default withPosts;
