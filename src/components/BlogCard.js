import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/BlogCard.css"; // Import custom CSS for styling

const BlogCard = ({ blog }) => {
  // Check if a picture exists, if not, use a placeholder image
  const imageUrl = blog.picture 
    ? `/uploads/${blog.picture}` 
    : "/images/default-placeholder.jpg";  // Fallback to a default image or text

  return (
    <Card className="anime-blog-card" style={{ width: "100%" }}>
      {/* Image Styling with fallback */}
      <Card.Img
        variant="top"
        src={imageUrl}
        className="blog-card-image"
        alt={blog.picture ? blog.title : "No image available"}
      />
      <Card.Body>
        <div className="blog-card-header">
          {/* Title */}
          <Card.Title className="blog-card-title">{blog.title}</Card.Title>
        </div>
        <Card.Text className="blog-card-content">
          {/* Preview Content */}
          {blog.content.slice(0, 100)}...
        </Card.Text>
        <div className="blog-card-footer">
          {/* Link to blog detail page */}
          <Link to={`/blogs/getBlog/${blog._id}`} className="read-more-btn">
            Read More
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
