import React, { useState, useEffect } from 'react';
import { Button, Form, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf'; // Import notyf
import 'notyf/notyf.min.css'; // Import notyf styles
import "../css/AddBlogPage.css"; // Add custom CSS for styling

export default function AddBlogPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isActive, setIsActive] = useState(false); // Track form validity

  const navigate = useNavigate();
  const notyf = new Notyf();

  // Enable the submit button only when required fields are filled
  useEffect(() => {
    setIsActive(!!title.trim() && !!content.trim());
  }, [title, content]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPicture(file || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');



    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found.');

      // Prepare FormData for file upload
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('content', content.trim());
      if (picture) {
        formData.append('picture', picture); // Add the picture file if provided
      }

      // Debug: Log the FormData content
      console.log('FormData content:');
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/blogs/addBlog`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Use FormData instead of JSON.stringify
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || `Failed with status ${response.status}`);

      notyf.success('Blog created successfully!');
      setTitle('');
      setContent('');
      setPicture(null);
      setLoading(false);

      setTimeout(() => navigate(`/blogs/getBlog/${result._id}`), 2000);
    } catch (err) {
      console.error('Error during submission:', err);
      notyf.error('Error creating blog. Please try again.');
      setError(err.message || 'An error occurred.');
      setLoading(false);
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

        <div className="text-center mt-4">
          <Button
            variant={isActive ? 'primary' : 'danger'}
            type="submit"
            disabled={!isActive || loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
          </Button>
        </div>
      </Form>
    </div>
  );
}
