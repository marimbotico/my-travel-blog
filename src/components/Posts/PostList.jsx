import PostCard from './PostCard';
import './PostList.css';
import { Col, Container, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

const PostList = ({ posts }) => {
    return (
        <Container className='post-list'>
            <Row>
                {posts.map((post) => (
                    <Col key={post.id} lg={4} md={6}>
                        <PostCard post={post} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
export default PostList;


{/* <Container className='post-list'>
<Row>
    {posts.map((post) => (
        <Col key={post.id} lg={4} md={6}>
            <PostCard post={post} />
        </Col>
    ))}
</Row>
</Container> */}

// import { useEffect, useState } from 'react';
// import { postsApi } from '../postsApi';


// const [posts, setPost] = useState([]); //use state as empty array of posts that will go inside
// const [loading, setLoading] = useState(false);

// useEffect(() => {
//     getPosts();
// }, [])// only renders once

// const getPosts = async () => {
//     try {
//         const posts = await postsApi.get();
//         setPost(posts);
//         setLoading(false);

//     } catch (error) {
//         console.log(error)
//     }
// }

// const updatePosts = async (updatedPost) => {
//     console.log("update in PostList.jsx -Running", updatedPost);//    
//     try {
//         await postsApi.put(updatedPost);
//         getPosts();
//     } catch (error) {
//         console.log(error)
//     }
// }

// const addNewPost = async (post) => {
//     console.log('addNewPost in PostList running', addNewPost);
//     try {
//         await postsApi.post(post);
//         getPosts();
//     } catch (error) {
//         console.error('Failed to add a new post', error)
//     }
// };

// const deletePost = async (id) => {
//     console.log('Delete method in PostList Running', deletePost)
//     try {
//         await postsApi.delete(id);
//         getPosts();
//     } catch (error) {
//         console.error('Failed to delete the selected post', error)
//     }
// }

// const PostList = ({ posts }) => {
//     return (
//         <Container className='post-list'>
//             <Row>
//                 {posts.map((post) => {
//                     <Col key={post.id} lg={4} md={6}>
//                         <PostCard post={post} />
//                     </Col>
//                 })}
//             </Row>
//         </Container>
//     );
// };

// export default PostList;