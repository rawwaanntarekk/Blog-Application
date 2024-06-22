"use client"
import React, { useEffect, useState } from 'react';

    interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    }

export default function Post({ params }: { params: any }) {
    const postId = parseInt(params.postId, 10);
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        async function fetchPost() {
        async function getPostFromAPI(postId: number) {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            if (!response.ok) {
            return null;
            }
            const data = await response.json();
            return data;
        }
        // Function to get post from local storage if it was already fetched or added by the user
        function getPostFromLocalStorage(postId: number) {
            const storedPosts = localStorage.getItem("posts");
            if (storedPosts) {
            const posts = JSON.parse(storedPosts);
            return posts.find((post: { id: number }) => post.id === postId);
            }
            return null;
        }

      // Try to get the post from API first, if not found, get it from local storage
        let post = await getPostFromAPI(postId);
        if (!post) {
            post = getPostFromLocalStorage(postId);
        }
        setPost(post);
        }

    fetchPost();
}, [postId]);


return (
    <div className="container">
        <h2 className='text-center my-5'>Full Post</h2>
        <div className="row mt-5 justify-content-center">
            <div className='post col-md-8'>
                <h2 className='border-bottom pb-3 fw-bold'>{post?.title}</h2>
                <p className='mt-4 fs-3'>{post?.body}</p>
            </div>
        </div>
    </div>
);
}
