import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import withPosts from './withPosts'; // Import the HOC
import { postsApi } from '../postsApi';

const PostCard = ({ post, fetchPosts }) => {
    const [loading, setLoading] = useState(false);

    const deletePost = async (id) => {
        // Optimistic UI update: assume deletion will succeed and update the UI immediately
        try {
            setLoading(true);
            console.log("Attempting to delete post with ID:", id);

            // Remove the post optimistically from the UI
            fetchPosts(prevPosts => prevPosts.filter(p => p.id !== id));

            // Call the API to delete the post
            await postsApi.delete(id);
            console.log("Post deleted successfully");
        } catch (error) {
            console.error('Failed to delete post:', error);
            // Re-fetch the posts to ensure the UI is consistent if the deletion fails
            fetchPosts();
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
                </Card.Text>
                <div className="d-flex justify-content-between align-items-end">
                    <Link to={`/posts/${post.id}`}>
                        <Button variant="outline-primary">Read full story</Button>
                    </Link>
                    <Button
                        variant="outline-danger"
                        onClick={() => deletePost(post.id)}
                        disabled={loading} // Disable the button while loading
                    >
                        {loading ? 'Deleting...' : 'Delete Post'}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default withPosts(PostCard); // Wrap the component with the HOC
