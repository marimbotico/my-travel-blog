import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { postsApi } from '../postsApi';
import { useState, useEffect } from 'react';

const PostCard = ({ post }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const posts = await postsApi.get();
            setPosts(posts);
        } catch (error) {
            console.error(error); 
        } finally {
            setLoading(false);
        }
    };

    const deletePost = async (id) => {
        try {
            console.log("Attempting to delete post with ID:", id);
            await postsApi.delete(id); // Deletes post by ID
            console.log("Post deleted successfully");
            // Fetch the updated list of posts after deletion
            fetchPosts();
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };

    return (
        <Card className='post-card'>
            <Card.Img variant="top" src={post.imgUrl} />
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
                        onClick={() => deletePost(post.id)} // Correctly pass the post ID to delete
                    >
                        Delete Post
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default PostCard;

