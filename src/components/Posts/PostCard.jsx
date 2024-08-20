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
            await postsApi.delete(id); // Deletes post by ID
            setPosts(posts.filter(post => post.id !== id)); // Update the state to remove the deleted post
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
                        variant="secondary" 
                        onClick={() => deletePost(post.id)} // Pass the post ID to delete
                    >
                        Delete Post
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default PostCard;
