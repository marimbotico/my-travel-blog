import React from "react";
import "./About.css";
import Carousel from "react-bootstrap/Carousel";
import Posts from "../Posts/Posts";

const About = ({ posts }) => {
    return (
        <div className="about-container">
            <Carousel className="carousel-background">
                {posts.map((post) => (
                    <Carousel.Item interval={3000} key={post.id}>
                        <img
                            className="d-block w-100 carousel-image"
                            src={post.imgUrl}
                            alt={post.title}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
            <div className="bio-text">
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
