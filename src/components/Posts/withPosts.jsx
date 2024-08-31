import React, { useState, useEffect } from 'react';
import { postsApi } from '../postsApi';

const withPosts = (WrappedComponent) => {
    // Defines a Higher-Order Component (HOC) named withPosts.
    // HOCs are functions that take a component as an argument (WrappedComponent) and return a new component 
    // with additional props or functionality. WrappedComponent is the component that will be enhanced 
    // by the HOC.
    return function WithPostsComponent(props) {
        //Returns a new functional component named WithPostsComponent.
        //This new component wraps the WrappedComponent and passes additional props to it.
        const [posts, setPosts] = useState([]);// sets state as an empty array
        const [loading, setLoading] = useState(true);// set loading to true

        const fetchPosts = async () => {// fetches posts from the api
            setLoading(true);
            try {
                const fetchedPosts = await postsApi.get();
                setPosts(fetchedPosts);// setPost to fetched Posts
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        useEffect(() => {
            fetchPosts();// calls the fetchPosts function when the component first mounts
        }, []);// ensure it's only called once

        return (
            <WrappedComponent
                {...props}//Renders the WrappedComponent and spreads all the original props passed to WithPostsComponent onto it.
                posts={posts}// passes 'post' state as a prop
                setPosts={setPosts}// passes the function to the wrapped component
                loading={loading}// passes 'loading' state as a prop
                fetchPosts={fetchPosts}// passes the function to the wrapped component
            />
        );
    };
};

export default withPosts;

// import { useState, useEffect } from 'react';
// import { postsApi } from '../postsApi';

// const withPosts = (WrappedComponent) => {
//     return (props) => {
//         const { postId } = props;
//         const [posts, setPosts] = useState([]);
//         const [loading, setLoading] = useState(false);
//         const [post, setPost] = useState({});
//         // const [postData, setPostData] = useState({
//         //     author: '',
//         //     title: '',
//         //     destination: '',
//         //     imgUrl: '',
//         //     story: '',
//         // });

//         //useEffect if there is a postById to fetch then fetch that specific post otherwise fetch all posts
//         useEffect(() => {
//             if (postId) {
//                 fetchPostById(postId);
//             } else {
//                 fetchPosts();
//             }
//         }, [postId]);

//         const fetchPosts = async () => {
//             try {
//                 setLoading(true);
//                 const postsData = await postsApi.get();
//                 setPosts(postsData);// setPost to the data retrieved by the API
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const fetchPostById = async (id) => {
//             try {
//                 setLoading(true);
//                 const post = await postsApi.getById(id);// retrieves and specific post by Id
//                 setPost(post);//setPost to the specific post
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         return (
//             <WrappedComponent
//                 posts={posts}
//                 post={post}
//                 loading={loading}
//                 fetchPosts={fetchPosts}
//                 fetchPostById={fetchPostById}
//                 setPosts={setPosts}
//                 {...props}
//                 //define all the properties of the wrapped component which is an
//             />
//         );
//     };
// };

// export default withPosts;
