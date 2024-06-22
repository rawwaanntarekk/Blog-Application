"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { usePosts } from "../../Context/PostsContext";
import style from "./page.module.css";
import Image from "next/image";
import img from "../../../../public/Images/6719442.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Interface for Post object
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Interface for form data and errors
interface FormData {
  title: string;
  body: string;
}

interface FormErrors {
  title?: string;
  body?: string;
}

export default function CreatePost() {
  const { addPost } = usePosts(); // Get the addPost function from the context
  const [isOpen, setIsOpen] = useState(false); // State to manage modal open/close
  const [formState, setFormState] = useState<{ data: FormData; errors: FormErrors }>({
    data: { title: "", body: "" },
    errors: {},
  });

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        [name]: value,
      },
    }));
  };

  // Generate a unique id for the new post
  const generateId = () => {
    let lastNumber = parseInt(localStorage.getItem('lastNumber') ?? '99');
    let nextNumber = lastNumber + 1;
    localStorage.setItem('lastNumber', nextNumber.toString());
    return nextNumber;
  };

  // Validate the form data
  const validateForm = (data: FormData) => {
    const errors: FormErrors = {};
    if (data.title.length < 5) {
      errors.title = "Title must be at least 5 characters long";
    }
    if (data.body.length < 10) {
      errors.body = "Body must be at least 10 characters long";
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formState.data);
    if (Object.keys(validationErrors).length > 0) {
      setFormState((prevState) => ({
        ...prevState,
        errors: validationErrors,
      }));
      return;
    }

    const newPost: Post = {
      userId: 1,
      id: generateId(),
      title: formState.data.title,
      body: formState.data.body,
    };
    addPost(newPost); // Add the new post
    setIsOpen(false); // Close the modal
    toast.success("Wow You Posted Successfully! Check Your Post on the Home Page", {
      className: 'bg-dark text-light',
    });
  };

  // Reset errors when modal is opened
  useEffect(() => {
    if (isOpen) {
      setFormState((prevState) => ({
        ...prevState,
        errors: {},
      }));
    }
  }, [isOpen]);

  return (
    <>
      <div className="d-flex mt-3 align-items-center flex-column">
          <h2 className="fw-bold display-5 text-center">What is in your mind?</h2>
            <div className="col-12 col-md-4">
              <Button onPress={() => setIsOpen(true)} id="openModal">
                <p className="mt-4 border-bottom py-2 text-start fs-6">Write Your Post</p>
              </Button>
            </div>
      </div>
      <div className="container mb-5">
        <div className="row justify-content-center mb-5"></div>
        <Modal isOpen={isOpen} onOpenChange={() => setIsOpen(false)} className={`rounded-2 ${style.borderModule} col-sm-6 col-md-6 col-lg-4 p-4`}>
          <ModalContent>
            <div>
              <ModalHeader className="flex flex-col gap-1 fw-bold fs-5">What is in Your mind?</ModalHeader>
              <ModalBody>
                <form id="postForm" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className={`form-control ${formState.errors.title? 'is-invalid' : ''}`} id="title" name="title" value={formState.data.title} onChange={handleChange} required/>
                    {formState.errors.title && <div className="invalid-feedback">{formState.errors.title}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="body" className="form-label">Body</label>
                    <textarea className={`form-control ${formState.errors.body ? 'is-invalid' : ''}`} id="body" name="body" value={formState.data.body} onChange={handleChange} required></textarea>
                    {formState.errors.body && <div className="invalid-feedback">{formState.errors.body}</div>}
                  </div>
                </form>
              </ModalBody>
              <div className="d-flex justify-content-end">
                <Button variant="light" onClick={() => setIsOpen(false)} className="btn btn-outline-dark me-1 align-self-end">Cancel</Button>
                <Button type="submit" form="postForm" className="btn text-light bg-dark">Post</Button>
              </div>
            </div>
          </ModalContent>
        </Modal>
      </div>
      <div className={`${style.imgStyle}`}>
        <Image src={img} alt="post" />
      </div>
      <ToastContainer />
    </>
  );
}
