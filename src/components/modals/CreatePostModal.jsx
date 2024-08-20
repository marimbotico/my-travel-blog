import "./CreatePostModal.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"; // Corrected the import statement
import Modal from "react-bootstrap/Modal";
import { postsApi } from "../postsApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CreatePostModal() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [postData, setPostData] = useState({
        author: '',
        title: '',
        destination: '', // Added the missing comma
        imgUrl: '',
        story: '',
    });

    const handleClose = () => {
        setPostData({
            author: '',
            title: '',
            destination: '',
            imgUrl: '',
            story: '',
        });
        setShow(false);
    };

    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target; // Corrected the destructuring
        setPostData({
            ...postData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => { // Added the event parameter
        e.preventDefault();
        console.log(postData);
        const data = {
            ...postData,
            published: false,
        };
        try {
            setLoading(true);
            await postsApi.createPost(data);
            toast.success("Post created successfully!");
            navigate("/posts");
        } catch (error) { // Corrected the error handling
            console.error(error);
            toast.error("Error creating post");
        } finally {
            setLoading(false);
            handleClose();
        }
    }

    return (
        <div className="create-post-modal">
            <Button variant="primary" onClick={handleShow}>Create Post</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="author">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                name="author"
                                placeholder="Name"
                                value={postData.author}
                                onChange={handleChange}
                                autoFocus
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={postData.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="destination">
                            <Form.Label>Destination</Form.Label>
                            <Form.Control
                                type="text"
                                name="destination"
                                placeholder="Destination"
                                value={postData.destination}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="imgUrl">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                name="imgUrl"
                                placeholder="https://imageURL"
                                value={postData.imgUrl}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="story">
                            <Form.Label>Story</Form.Label>
                            <Form.Control
                                as="textarea" // Corrected the input type to textarea
                                name="story"
                                placeholder="Your story..."
                                value={postData.story}
                                onChange={handleChange}
                                required
                                rows={3}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CreatePostModal;
