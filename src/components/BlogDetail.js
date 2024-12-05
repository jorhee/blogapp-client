import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import "../css/BlogDetail.css"; // Import the CSS file
import placeholderProfilePicture from "../components/images/placeholder-profilePicture.png"; // Import placeholder image

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Access blogId from URL parameters using useParams hook
  const { blogId } = useParams();

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/blogs/getBlog/${blogId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }
        const data = await response.json();
        setBlog(data.blog); // Set blog state based on 'blog' field
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch the blog. Please try again later.");
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlogDetail();
    }
  }, [blogId]);

  // Function to calculate time passed
  const timePassed = (date) => {
    const now = new Date();
    const postedDate = new Date(date);
    const diffMs = now - postedDate;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d`;
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="blog-detail-container">
      {blog ? (
        <div className="blog-detail-card">
          {/* Author Details Section */}
          <div className="author-details">
            {/* Author profile picture or placeholder */}
            <img 
              src={blog.author.profilePicture ? 
                `${process.env.REACT_APP_API_BASE_URL}/uploads/${blog.author.profilePicture}` :
                placeholderProfilePicture} 
              alt={blog.author.userName} 
              className="author-profile-pic" 
            />
            
            {/* Author's username and creation date */}
            <div className="author-info">
              <span className="author-name">{blog.author.userName}</span>
              <span 
                className="creation-date" 
                title={`Posted on: ${new Date(blog.creationDate).toLocaleString()}`}
              >
                {timePassed(blog.creationDate)}
              </span>
            </div>
          </div>

          <h1 className="blog-title">{blog.title}</h1>

          {/* Display the blog image if available */}
          {blog.picture ? (
            <img 
              src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${blog.picture}`} 
              alt={blog.title} 
              className="blog-image"
            />
          ) : (
            <div className="no-image">No image available</div>
          )}

          <p className="blog-content">{blog.content}</p>

          {/* Comments Section */}
          <div className="comments-section">
            <h4>Comments:</h4>
            {blog.comments && blog.comments.length > 0 ? (
              blog.comments.map((comment) => (
                <div key={comment._id} className="comment-card">
                  <strong>{comment.userName}</strong>
                  <p>{comment.text}</p>
                </div>
              ))
            ) : (
              <p>No comments yet</p>
            )}
          </div>
        </div>
      ) : (
        <p>No blog found</p>
      )}
    </div>
  );
};

export default BlogDetail;
