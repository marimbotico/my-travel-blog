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

// import "./CreatePostModal.css";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form"; 
// import Modal from "react-bootstrap/Modal";
// import { postsApi } from "../postsApi";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import withPosts from "../Posts/withPosts";

// function CreatePostModal({ posts, loading, fetchPosts, setPosts }) { // Added setPosts prop
//     const navigate = useNavigate();
//     const [show, setShow] = useState(false);
//     const [postData, setPostData] = useState({ // Define all the properties of postData
//         author: '',
//         title: '',
//         destination: '', 
//         imgUrl: '',
//         story: '',
//     });

//     const handleClose = () => { // Resets the postData state to its initial empty state 
//         setPostData({
//             author: '',
//             title: '',
//             destination: '',
//             imgUrl: '',
//             story: '',
//         });
//         setShow(false); // Hides the modal by setting show to false.
//     };

//     const handleShow = () => setShow(true);

//     const handleChange = (e) => {
//         e.preventDefault();
//         const { name, value } = e.target; // Name input field being updated
//         setPostData({
//             ...postData, // Spreads the current state object into a new object
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const newPost = {
//             ...postData, // Creates a new object with existing properties of postData
//             id: Math.random().toString(36).substring(2, 15), // Generate a temporary ID
//             createdAt: new Date().toISOString(),
//             published: false, // Backend purposes
//         };

//         // Optimistic UI update: Add the new post to the UI immediately
//         setPosts(prevPosts => [newPost, ...prevPosts]);

//         try {
//             console.log("Creating post:", newPost);
//             await postsApi.createPost(newPost); // API call to create post
//             toast.success("Post created successfully!");
//             fetchPosts(); // Refreshes and gets all the posts again
//             navigate("/posts");
//         } catch (error) {
//             console.error("Error creating post:", error);
//             toast.error("Error creating post");
            
//             // Revert optimistic update if the creation fails
//             setPosts(prevPosts => prevPosts.filter(post => post.id !== newPost.id));
//         } finally {
//             handleClose();
//         }
//     };

//     return (
//         <div className="create-post-modal">
//             <Button variant="primary" onClick={handleShow}>Create Post</Button>
//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Create New Post</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group className="mb-3" controlId="author">
//                             <Form.Label>Author</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="author"
//                                 placeholder="Name"
//                                 value={postData.author}
//                                 onChange={handleChange}
//                                 autoFocus
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3" controlId="title">
//                             <Form.Label>Title</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="title"
//                                 placeholder="Title"
//                                 value={postData.title}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3" controlId="destination">
//                             <Form.Label>Destination</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="destination"
//                                 placeholder="Destination"
//                                 value={postData.destination}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3" controlId="imgUrl">
//                             <Form.Label>Image</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="imgUrl"
//                                 placeholder="https://imageURL"
//                                 value={postData.imgUrl}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3" controlId="story">
//                             <Form.Label>Story</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 name="story"
//                                 placeholder="Your story..."
//                                 value={postData.story}
//                                 onChange={handleChange}
//                                 required
//                                 rows={3}
//                             />
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button variant="primary" onClick={handleSubmit}>
//                         Submit
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// }

// export default withPosts(CreatePostModal);
