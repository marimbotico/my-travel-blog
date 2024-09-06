import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { postsApi } from '../postsApi';
import { toast } from "react-toastify";

const PostCard = ({ post, deletePost }) => { // passes these 2 as props
    const [loading, setLoading] = useState(false);

    const handleDeletePost = async () => {
        setLoading(true);
        try {
            // Optimistic UI update
            deletePost(post.id);// calls the deletePost function as a prop.
            // This is an optimistic UI update, which assumes the deletion will succeed and immediately removes the post 
            // from the UI, improving the user experience by making the app feel more responsive.

            // if the deletePost function doesn't work then it calls the API delete method
            await postsApi.delete(post.id);
            toast.success("Post deleted successfully!");
        } catch (error) {
            console.error('Failed to delete post:', error);
            toast.error("Failed to delete post. Please try again.");
            // You might want to revert the optimistic update here
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className='post-card'>
            <Card.Img variant="top" src={post.imgUrl} className='card-img-top' />
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>
                    {post.story.slice(0, 60)}...
                    {/* Limits the story to 60 characters */}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-end">
                    <Link to={`/posts/${post.id}`}>
                        <Button variant="outline-primary">Read full story</Button>
                    </Link>
                    <Button
                        variant="outline-danger"
                        onClick={handleDeletePost}
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Delete Post'}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default PostCard;


