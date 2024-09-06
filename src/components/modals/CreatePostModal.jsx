import React, { useState } from "react";
import "./CreatePostModal.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { postsApi } from "../postsApi";
import { toast } from "react-toastify";

function CreatePostModal({ addPost }) { // passing addPost function as a prop
    const [show, setShow] = useState(false);
    const [postData, setPostData] = useState({ // Define all the properties of postData
        author: '',
        title: '',
        destination: '',
        imgUrl: '',
        story: '',
    });

    const handleClose = () => { // Resets the postData state to its initial empty state 
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
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value,
        });//Handles changes in the form inputs. When the user types into an input field, 
        //this function updates the corresponding property in the postData state.
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            ...postData, // Creates a new object with existing properties of postData
            published: false,//backend purposes
        };


        try {
            const createdPost = await postsApi.createPost(newPost);
            // Optimistic UI update
            addPost(createdPost);
            // if it fails it calls the createPost method to the API
            toast.success("Post created successfully!");
        } catch (error) {
            console.error("Error creating post:", error);
            toast.error("Error creating post");
            // You might want to remove the optimistically added post here
        } finally {
            handleClose();//resets all the input fields
        }
    };

    return (
        <>
        {/* Bootstrap Modal and Form settings */}
            <Button variant="primary" onClick={handleShow}>Create Post</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                name="author"
                                value={postData.author}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={postData.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Destination</Form.Label>
                            <Form.Control
                                type="text"
                                name="destination"
                                value={postData.destination}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="imgUrl"
                                value={postData.imgUrl}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Story</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="story"
                                value={postData.story}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create Post
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreatePostModal;

