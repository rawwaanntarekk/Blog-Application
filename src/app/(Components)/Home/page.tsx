"use client";
import React, { useEffect } from "react";
import { usePosts } from "../../Context/PostsContext";
import Link from "next/link";
import styles from "./page.module.css";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function Home() {
  const { posts, addPost } = usePosts();

  // Fetching The Data From The API 
  // Add each post to the posts array
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((post: Post) => addPost(post));
      });
  }, [addPost]);

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center mt-5 ">
          {posts.map((post: Post) => (
            <div className="col-sm-10 col-md-10 border-bottom py-3" key={post.id} id="postContainer">
              <Link href={`/Home/${post.id}`} className={`${styles.resetLinkStyle}`}>
                <div className="post">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="col-7 col-sm-10 ">
                      <h5 className="fw-bold mb-2">{post.title}</h5>
                      {/* To view the overview of the post  */}
                      <p>{`${post.body.substring(0, 80)} ...`}</p>
                    </div>
                    <div className="col-4 col-sm-4  col-lg-3 col-xl-2">
                      <button className={`btn btn-dark ${styles.W75}`}>Read More</button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
