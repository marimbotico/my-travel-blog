import "./CreatePostModal.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"; 
import Modal from "react-bootstrap/Modal";
import { postsApi } from "../postsApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import withPosts from "../Posts/withPosts";

function CreatePostModal({ posts, loading, fetchPosts }) {//passing posts and loading as prop
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [postData, setPostData] = useState({// define all the properties of postData
        author: '',
        title: '',
        destination: '', 
        imgUrl: '',
        story: '',
    });

    const handleClose = () => {// resets the postData state to it's initial empty state 
        setPostData({
            author: '',
            title: '',
            destination: '',
            imgUrl: '',
            story: '',
        });
        setShow(false);//hides the modal by setting show to false.
    };

    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;// name input field being updated
        setPostData({
            ...postData,//spreads the current state object into a new object
            [name]: value,
            // This dynamically sets the property of the new object where the property 
            // name is the value of name (e.g., author, title, destination, etc.), and the value is 
            // the current value of the input field.
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(postData);
        const data = {
            ...postData,// creates a new object with existing properties of postData
            published: false,//backend purposes
        };
        try {
            await postsApi.createPost(data);// create post method
            toast.success("Post created successfully!");
            fetchPosts();//refreshes and gets all the posts again
            navigate("/posts");
        } catch (error) {
            console.error(error);
            toast.error("Error creating post");
        } finally {
            handleClose();
        }
    }


    return (
        //Bootstrap modal setting from react-bootstrap
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
                                as="textarea"
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

export default withPosts(CreatePostModal);
