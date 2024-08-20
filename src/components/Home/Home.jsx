import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    return (

        <div className="home">
            <h1>Welcome To My Travel Blog!</h1>
            <Link to="/posts">
                <button>Let's Explore Together </button>
            </Link>
        </div>

    );
};

export default Home;
