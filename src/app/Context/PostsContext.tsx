"use client";
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";


interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface PostsContextType {
    posts: Post[];
    addPost: (post: Post) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

// This component is a context provider that holds the posts array and the addPost function
export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);

    // This is for maintaining the posts array in the local storage
    // When refreshing the page , the new added posts will not be lost
    useEffect(() => {
        const storedPosts = localStorage.getItem("posts");
        if (storedPosts) {
            setPosts(JSON.parse(storedPosts));
        }
    }, []);

    // This function adds a new post to the posts array then returns the updated posts array
    // Checks if the post already exists in the posts array => return the posts array
    // It also stores the updated posts array in the local storage
    const addPost = useCallback((post: Post) => {
        setPosts((prevPosts) => {
            const postExists = prevPosts.find((p) => p.id === post.id);
            if (postExists) return prevPosts;
            const updatedPosts = [post, ...prevPosts];
            localStorage.setItem("posts", JSON.stringify(updatedPosts));
            return updatedPosts;
        });
    }, []);

    return (
        <PostsContext.Provider value={{ posts, addPost }}>
            {children}
        </PostsContext.Provider>
    );
};

// It is a custom hook that uses the useContext hook to access the PostsContext
export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
};
