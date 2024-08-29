import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import withPosts from './withPosts'; // Import the HOC
import { postsApi } from '../postsApi';

const PostCard = ({ post, fetchPosts }) => { // No need to manage posts state here

    const deletePost = async (id) => {
        try {
            console.log("Attempting to delete post with ID:", id);
            await postsApi.delete(id);
            console.log("Post deleted successfully");
            fetchPosts(); // reset the page to all posts
        } catch (error) {
            console.error('Failed to delete post:', error);
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
                    >
                        Delete Post
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default withPosts(PostCard); // Wrap the component with the HOC
