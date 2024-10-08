const API_URL = "https://66b412549f9169621ea1b740.mockapi.io/users/post";// database url

// Setting different commands within the postsApi const such as get, getById, post, createPost, updatePost, put & delete.
export const postsApi = {
    get: async () => {// async method that fetches all the posts
        try {
            const response = await fetch(API_URL);// sends get request to API and awaits response
            if (!response.ok) {
                throw new Error('Failed to fetch posts');// if the response is not ok display error message
            }
            return await response.json();
        } catch (e) {//catch any errors
            console.log('Error fetching posts:', e);
        }
    },
    getById: async (id) => {// async method that fetches a post by it's specific Id
          // console.log("createPost in postsApi.jsx - Running" , getById)
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch post by Id');// if the response is not ok display error message
            }
            return await response.json();
        } catch (e) {//catch any errors
            console.log('Error fetching post by Id:', e);
        }
    },

    createPost: async (postData) => {
        // console.log("createPost in postsApi.jsx - Running" , createPost)
        try {
            const response = await fetch(API_URL, {
                method: 'POST',// specifies the request to create new data
                headers: {
                    'Content-Type': 'application/json',// json data
                },
                body: JSON.stringify(postData),// converts object to string
            });
            if (!response.ok) {
                throw new Error('Failed to add post');
            }
            const createdPost = await response.json();
            console.log("Created post:", createdPost)
            return createdPost;
        } catch (e) {
            console.log('Error adding post:', e);
        }
    },
    updatePost: async (id, postData) => {
        try {
            console.log("updatePost in postsApi.jsx- Running", id)
            const response = await fetch(`${API_URL}/${id}`, {//specifies which post to update
                method: 'PUT',// use PUT to update
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
            if (!response.ok) {
                throw new Error('Failed to update post');
            }
            return await response.json();
        } catch (e) {
            console.log(`Error updating post with id ${id}:`, e);
        }
    },

    delete: async (id) => {// deletes a post by id.
        try {
            console.log("delete in postsApi.jsx - Running ", id);
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
            return await response.json();
        } catch (e) {
            console.log('Error deleting post:', e);
        }
    }
};
