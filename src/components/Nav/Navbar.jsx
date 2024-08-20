import { Link } from "react-router-dom";
import "./Navbar.css";
import CreatePostModal from "../modals/CreatePostModal";

function Navbar() {
    return (
        <nav>
            <div className="logo">
                {/* Using link to navigate to different pages */}
                <Link to="/">Home</Link>
            </div>
            <ul>
                <li>
                    <Link to="/posts">Posts</Link>
                </li>
                <li>
                    <Link to="/about">About Me</Link>
                </li>
                <li>
                    <CreatePostModal /> 
                    {/* In order to link with react router need to use the CreateModal */}
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;

