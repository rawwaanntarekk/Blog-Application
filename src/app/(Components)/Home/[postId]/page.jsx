import React from 'react'

// destructuring the params object that holds the parameters passed to the page
// Holds the postId parameter
export default async  function Post({params}) {
    let postId = params.postId;
    async function getPost() {
        let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        let data = await response.json();
        return data;
    }

    let post = await getPost();
  return (
    <div className="container">
        <h2 className='text-center my-5'>Full Post</h2>
        <div className="row mt-5 justify-content-center">
            <div className='post col-md-8'>
                <h2 className='border-bottom pb-3'>{post.title}</h2>
                <p className='mt-4 fs-3'>{post.body}</p>
            </div>
        </div>
    </div>
  )
}
