import React from 'react';
import PostCard from './PostCard';
import './PostList.css';
import { Col, Container, Row } from 'react-bootstrap';

const PostList = ({ posts, deletePost }) => { //passing 2 props to all posts
    return (
        <Container className='post-list'>
            <Row>
                {posts.map((post) => (
                    <Col key={post.id} lg={4} md={6}>
                        <PostCard post={post} deletePost={deletePost} />
                         {/* passing each post as prop to the PostCard component as well as the delete functionality */}
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PostList;