import "./About.css";
import Carousel from "react-bootstrap/Carousel";
import { imagesApi } from "../imagesApi";

const About = () => {
    return (
        <div className="about-container">
            {/* React bootstrap carousel set up */}
            <Carousel className="carousel-background">
                {imagesApi.length > 0 ? ( 
                    imagesApi.map((image, index) => (//mapping over the array of the imagesApi
                        <Carousel.Item interval={3000} key={index}>
                            <img
                                className={`d-block w-100 carousel-image ${image.centerImage ? "center" : "top"}`}// if the image is not centered then show the top
                                src={image.image}
                                alt={image.title || `Slide ${index + 1}`}
                            />
                        </Carousel.Item>
                    ))
                ) : (// in case the carousel of images doesn't load I am setting up an image as default
                    <Carousel.Item>
                        <img
                            className="d-block w-100 carousel-image"
                            src="cofete.jpg"
                            alt="Default"
                        />
                        <Carousel.Caption>
                            <p>No images available</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                )}
            </Carousel>
            <div className="bio-card">
                <h1>About Me</h1>
                <p>
                    Welcome to my travel blog! I love exploring new places and sharing my experiences.
                    Here you'll find stories, tips, and photos from my adventures around the world.
                </p>
                <p>
                    Whether you're a seasoned traveler or just looking for inspiration, I hope my
                    blog encourages you to discover new destinations and make the most of every journey.
                </p>
            </div>
        </div>
    );
};

export default About;
