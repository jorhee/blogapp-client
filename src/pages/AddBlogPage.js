import React, { useState } from "react";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Notyf } from 'notyf'; // Import notyf
import 'notyf/notyf.min.css'; // Import notyf styles
import "../css/AddBlogPage.css"; // Add custom CSS for styling

const notyf = new Notyf(); // Initialize Notyf

const AddBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Check if title and content are not empty before submission
    if (!title.trim() || !content.trim()) {
      setError("Title and content cannot be empty.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (picture) {
      formData.append("picture", picture);
    }

    // Log the form data to the console to debug
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      // Log the token to ensure it's retrieved correctly
      console.log("Token:", token);

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/blogs/addBlog`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      // Log the response for debugging
      const responseBody = await response.json();
      console.log("Response status:", response.status);
      console.log("Response body:", responseBody);

      if (!response.ok) {
        throw new Error(`Failed to add the blog. Server responded with ${response.status}`);
      }

      const result = responseBody; // Since the response is already parsed
      setSuccess(true);
      setTitle("");
      setContent("");
      setPicture(null);
      setLoading(false);

      // Show success notification with notyf
      notyf.success("Blog created successfully!");

      setTimeout(() => {
        navigate(`/blogs/getBlog/${result._id}`);
      }, 2000);
    } catch (err) {
      // Log the error to identify the issue
      console.error("Error during submission:", err);

      setError("Failed to add the blog. Please try again.");
      setLoading(false);
      // Show error notification with notyf
      notyf.error("Error creating blog. Please try again.");
    }
  };

  return (
    <div className="add-blog-page">
      <h2>Create a New Blog Post</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Write your blog content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
        </Button>
      </Form>
    </div>
  );
};

export default AddBlogPage;
