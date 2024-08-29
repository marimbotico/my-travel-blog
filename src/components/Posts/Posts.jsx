import "./Posts.css";
import PostList from './PostList';
import { Spinner } from "react-bootstrap";
import withPosts from './withPosts'; // Import the HOC

const Posts = ({ posts, loading }) => { // pass posts and loading as props
    return (
        <div className="posts">
            {loading ? (
                <Spinner animation="border" variant="primary" />
            ) : (
                <PostList posts={posts} /> // Passes posts to PostList as a prop
            )}
        </div>
    );
};

export default withPosts(Posts); // Wrap the component with the HOC
