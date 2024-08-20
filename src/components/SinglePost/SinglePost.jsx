import "./SinglePost.css";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { postsApi } from "../postsApi";
import { Button, Spinner } from 'react-bootstrap';
import CommentsList from "../Comments/CommentsList";
import { toast } from "react-toastify";
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { Col, Row, Form } from 'react-bootstrap';

const SinglePost = () => {
    const { postId } = useParams(); // grabbing the specific id from the browser using the useParams hook
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({});
    const [comment, setComment] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const foundPost = await postsApi.getById(postId); // fetches specific post by Id
            console.log(foundPost);
            setPost(foundPost);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const submitComment = async (e) => {
        e.preventDefault();
        if (!comment) {
            toast.error("Please enter a comment");
            return;
        } 
        try {
            setLoading(true);
            const updatedPost = await postsApi.updatePost(postId, {
                comments: [...post.comments, comment],
            });
            console.log(updatedPost);
            setPost(updatedPost);
        } catch (e) {
            console.log('error');
        } finally {
            setComment('');
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        e.preventDefault();
        setComment(e.target.value);
    }

    return (
        <div className="single-post">
            <Card className="card-container shadow-sm">
                <div className="card-img-container">
                    {loading ? (
                        <Spinner animation="border" variant="primary" className="loading-spinner" />
                    ) : (
                        <Card.Img variant="top" className="card-img" src={post.imgUrl} />
                    )}
                </div>
                <Card.Body className="card-content">
                    <Link to="/posts">
                        <Button variant="outline-primary" className="mb-3">Back to All Posts</Button>
                    </Link>
                    <Card.Title as="h2" className="card-header">
                        {loading ? <Spinner animation="border" variant="primary" /> : post.title}
                    </Card.Title>
                    <Card.Text className="card-description">
                        {loading ? <Spinner animation="border" variant="primary" /> : post.story}
                    </Card.Text>
                    
                    {/* Add New Comment Section */}
                    <div className="add-comment-section mb-4">
                        <h5>Add a Comment</h5>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        value={comment}
                                        onChange={handleInputChange}
                                        placeholder="Please add a comment"
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button variant="outline-primary" onClick={submitComment}>
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>

                    {/* Accordion for Viewing Comments */}
                    <Accordion className="card-comments">
                        {!loading && post.comments && post.comments.length > 0 && (
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>View Comments</Accordion.Header>
                                <Accordion.Body>
                                    <CommentsList comments={post.comments} />
                                </Accordion.Body>
                            </Accordion.Item>
                        )}
                    </Accordion>
                </Card.Body>
                <Card.Footer className="card-footer d-flex justify-content-between">
                    <span><strong>Written by:</strong> {post.author}</span>
                    <span><strong>Published:</strong> {post.createdAt}</span>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default SinglePost;
