"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { usePosts } from "../../Context/PostsContext";
import style from "./page.module.css";
import Image from "next/image";
import img from "../../../../public/Images/6719442.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreatePost() {
  const { addPost } = usePosts();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", body: "" });

  const notify = () => toast.success("Wow You Posted Successfully!  Check Your Post in Home Page" , {
    className: 'bg-dark text-light',
  });


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function generateId() {
    let lastNumber = parseInt(localStorage.getItem('lastNumber') ?? '100');
    let nextNumber = lastNumber + 1;
    localStorage.setItem('lastNumber', nextNumber.toString());
    return nextNumber;
  }
  
  

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost = {
      userId: 1,
      id: generateId(), // Use generated ID
      title: formData.title,
      body: formData.body,
    };
    addPost(newPost);
    setIsOpen(false);
  };
  

  return (
    <>
      <div className="d-flex mt-3 align-items-center flex-column ">
      <h2 className="fw-bold display-5 text-center">What is in your mind ?</h2>
        <div className="col-md-4">
        <Button onPress={() => setIsOpen(true)} id="openModal">
          <p className="mt-4 border-bottom py-2 text-start fs-6">Write Your Post</p>
        </Button>
        </div>
      </div>
      <div className="container mb-5">
        <div className="row justify-content-center mb-5"></div>
        <Modal isOpen={isOpen} onOpenChange={() => setIsOpen(false)} className={`rounded-2 ${style.borderModule} col-sm-6 col-md-6 col-lg-4 p-4`}>
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1 fw-bold fs-5">What is in Your mind ?</ModalHeader>
              <ModalBody>
                <form action="" id="postForm" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="body" className="form-label">Body</label>
                    <textarea className="form-control" id="body" name="body" value={formData.body} onChange={handleChange} required></textarea>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter className="d-flex align-items-end">
                <Button onPress={() => setIsOpen(false)} type="submit" onClick={notify} form="postForm" className="btn text-light bg-dark">Post</Button>
                <Button variant="light" onPress={() => setIsOpen(false)} className="btn btn-outline-dark me-1 align-self-end">Cancel</Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
      </div>
      <div  className={`${style.imgStyle}`}>
        <Image src={img} alt="post" />
      </div>
      <ToastContainer />
    </>
  );
}
