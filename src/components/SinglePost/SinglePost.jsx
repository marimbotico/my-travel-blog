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
    const { postId } = useParams();// extracts the post ID from the URL using 'useParams'
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({});
    const [comment, setComment] = useState('');
    const [postData, setPostData] = useState({// sets all the properties of state
        author: '',
        title: '',
        destination: '',
        imgUrl: '',
        story: '',
    });
    const [activeKey, setActiveKey] = useState(null); // State to control accordion toggle. active=open

    useEffect(() => {
        fetchPosts();// calls the fetchPosts function when the component first mounts
    }, []);// ensure it's only called once

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const foundPost = await postsApi.getById(postId);
            setPost(foundPost);
            setPostData(foundPost); // Populate the update form with current post data
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const updatePost = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const updatedPost = await postsApi.updatePost(postId, postData);// sends updated data to the API
            setPost(updatedPost);// sets state to updatedPost
            toast.success("Post updated successfully!");
            setActiveKey(null); // Close the accordion after successful submission
        } catch (error) {
            console.error("Error updating this post!", error);
            toast.error("Failed to update the post.");
        } finally {
            setLoading(false);
        }
    }

    const submitComment = async (e) => {
        e.preventDefault();
        if (!comment) {// if there's no comments please enter a comment
            toast.error("Please enter a comment");
            return;
        }
        try {
            setLoading(true);
            const updatedPost = await postsApi.updatePost(postId, {
                comments: [...post.comments, comment],// adds the new comment to the existing array of comments
            });
            setPost(updatedPost);// sets state to updatedPost
        } catch (e) {
            console.error('Error adding comment:', e);
            toast.error("Failed to add the comment.");
        } finally {
            setComment('');// clears this input field
            setLoading(false);
        }
    };

    const deleteComment = async (index) => {
        try {
            setLoading(true);
            const updatedComments = post.comments.filter((_, i) => i !== index);// filters out the comments by their index
            const updatedPost = await postsApi.updatePost(postId, {
                ...post,// creates a new object and appends the new comment to the comments section
                comments: updatedComments,
            });
            setPost(updatedPost);// updates setPost state to updatedPost
        } catch (e) {
            console.error('Error deleting comment:', e);
            toast.error("Failed to delete the comment.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData((prevData) => ({
            ...prevData,// creates a new object and copies the existing state of the previous
            [name]: value,
        // This dynamically sets the property of the new object where the property name is the value 
        // of name (e.g., author, title, destination, etc.), and the value is the current value of 
        // the input field.
        }));
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
                    <div className="d-flex justify-content-between mb-3">
                        <Link to="/posts">
                            <Button variant="outline-primary" className="align-self-start">Back to All Posts</Button>
                        </Link>

                        <Accordion activeKey={activeKey} onSelect={setActiveKey} className="align-self-end">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Update Post</Accordion.Header>
                                <Accordion.Body>
                                    <Form onSubmit={updatePost}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Author</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="author"
                                                value={postData.author}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="title"
                                                value={postData.title}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Destination</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="destination"
                                                value={postData.destination}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Image URL</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="imgUrl"
                                                value={postData.imgUrl}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Story</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                name="story"
                                                value={postData.story}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                        <Button variant="primary" type="submit" disabled={loading}>
                                            {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Update Post'}
                                        </Button>
                                    </Form>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
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
                                        onChange={(e) => setComment(e.target.value)}
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
                                    <CommentsList
                                        comments={post.comments}
                                        deleteComment={deleteComment}
                                    />
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
