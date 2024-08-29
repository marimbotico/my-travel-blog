import PostCard from './PostCard';
import './PostList.css';
import { Col, Container, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

const PostList = ({ posts }) => {// passing posts as props
    return (
        <Container className='post-list'>
            <Row>
                {posts.map((post) => (// mapping over each post
                    <Col key={post.id} lg={4} md={6}>
                        <PostCard post={post} /> 
                        {/* passing each post as prop to the PostCard component */}
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
export default PostList;