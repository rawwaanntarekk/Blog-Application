"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import  styles from './page.module.css'


// Navbar Component 
export default function Navbar() {

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light ">
      <div className="container ">
        <Link className="navbar-brand fw-bold fs-3" href="/Home">
        Slash Blog.
        </Link>
      <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <div className="row">
        <ul className="navbar-nav me-auto mt-2 mt-lg-0  ">
          <li  className='ms-2'>
            <Link href={'/Home'} className='fw-normal fs-6 '> Home</Link>
          </li>
            <li>
            <Link href={'/CreatePost'} className={`fw-normal fs-6 ${styles.LiDistance} text-center `}> Create Post</Link>
            </li>
        </ul>
        </div>
      </div>
    </div>
</nav>
  )
}
