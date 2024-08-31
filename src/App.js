import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Navbar from './components/Nav/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Posts from './components/Posts/Posts';
import About from './components/About/About';
import SinglePost from './components/SinglePost/SinglePost';
import withPosts from './components/Posts/withPosts';

function App({ posts, setPosts, loading }) {// defines the app component as a function that receives props from the HOC 'withPosts'
  const addPost = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };// Adds a new post to the beginning of the posts array using the setPosts function.

  const updatePost = (updatedPost) => {
    setPosts(prevPosts => prevPosts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));//Updates an existing post in the posts array by matching the id and replacing the post with the updated one.
  };

  const deletePost = (postId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };//Removes a post from the posts array by filtering out the post with the matching id.

  return (
    <>
      <Navbar addPost={addPost}/> 
      {/* Renders the Navbar component and passes the addPost function as a prop. */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route 
          path="/posts" 
          element={
            <Posts 
              posts={posts} 
              loading={loading}
              addPost={addPost}
              updatePost={updatePost}
              deletePost={deletePost}
              // Passes posts, loading, addPost, updatePost, and deletePost as props.
            />
          } 
        />
        <Route 
          path="/posts/:postId" 
          element={
            <SinglePost 
              posts={posts}
              updatePost={updatePost}
              deletePost={deletePost}
            />
          } 
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default withPosts(App);



// import logo from './logo.svg';
// import './App.css';
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from './components/Nav/Navbar';
// import Footer from './components/Footer/Footer';
// import Home from './components/Home/Home';
// import Posts from './components/Posts/Posts';
// import About from './components/About/About';
// import SinglePost from './components/SinglePost/SinglePost';

// function App() {
//   // const [posts, setPosts] = useState([]);

//   // const createPost = (newPost) => {
//   //   // Optimistically update the UI
//   //   const tempId = Date.now(); // Temporary ID for the new post
//   //   const optimisticPost = { ...newPost, id: tempId };
//   //   setPosts([...posts, optimisticPost]);
//   // }


//   return (
//     <>
//       <Navbar />
//       <Routes>
//         {/* Using react 18 latest syntax for navigation setup */}
//         <Route exact path="/" element={<Home />} />
//         <Route path="/posts" element={<Posts posts={posts} setPosts={setPosts} />} />
//         <Route path="/posts/:postId" element={<SinglePost posts={posts} />} />
//         <Route path="/about" element={<About />} />
//       </Routes>
//       <Footer />
//       {/* React-Toastify allows you to add notifications to your app with ease. */}
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//     </>
//   );
// }

// export default App;
