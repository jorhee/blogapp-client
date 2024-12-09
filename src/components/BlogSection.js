import React, { useEffect, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import BlogCard from "./BlogCard"; // Import BlogCard to display each blog
import "../css/BlogSection.css";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track any errors

  useEffect(() => {
    // Fetch blog data from the API when component mounts
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/blogs/getBlogPost`);
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        console.log("API Response:", data); // Log to verify the structure

        // Access the blogs array and set the state
        setBlogs(data.blogs); // Correctly set blogs state

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blogs. Please try again later.");
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Conditional rendering for loading and error states
  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status" />
        <span>Loading Blogs...</span>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="blog-section">
      <h2>Featured Anime Blogs</h2>
      <div className="blog-container">
        <Row>
          {blogs.map((blog) => (
            <Col key={blog._id} sm={12} md={12} lg={12}>
              <BlogCard blog={blog} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default BlogSection;
