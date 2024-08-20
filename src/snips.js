
//CAROUSEL SETTINGS
<Carousel className='carousel-custom'>
{posts.map((post) => (
    <Carousel.Item interval={3000} key={post.id}>
        <img
            text={post.title}
            className='d-block w-100 carousel-image' 
            src={post.imgUrl}
            alt={post.title} // Added alt attribute
        />
        <Carousel.Caption>
            <p>{post.story}</p>
        </Carousel.Caption>
    </Carousel.Item>
))}
</Carousel>

//CAROUSEL CSS
// .carousel-custom {
//     position: absolute;
//     top: 0;
//     left: 50%;
//     transform: translateX(-50%);
//     width: 60%; /* Adjusted width */
//     height: 30vh; /* Adjusted height */
//     padding: 1rem; /* Added padding */
//     margin-top: 1rem;
//     margin-bottom: 1rem;
// }

// .carousel-image {
//     max-height: 25vh; /* Ensure images fit within the carousel */
//     object-fit: contain;
// }

// .carousel-caption {
//     font-size: 0.8rem; /* Smaller font for captions */
//     bottom: 10px;
// }

// .carousel-custom {
//     position: absolute;
//     top: 0;
//     left: 50%;
//     transform: translateX(-50%);
//     width: 80%; /* Adjust width as needed */
//     height: 50vh; /* Half of the viewport height */
// }

// .carousel-image {
//     height: 100%;
//     object-fit: cover; /* Ensures the image covers the entire carousel item */
// }
