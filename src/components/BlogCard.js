import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/BlogCard.css"; // Import custom CSS for styling

const BlogCard = ({ blog }) => {
  // Check if a picture exists, if not, use a placeholder image
  const imageUrl = `${process.env.REACT_APP_API_BASE_URL}/${blog.picture}`;

  // Get the first comment (if any)
  const firstComment = blog.comments && blog.comments.length > 0 ? blog.comments[0].content : "No comments yet.";

  return (
    <Card className="anime-blog-card">
      <Card.Img
        variant="top"
        src={imageUrl}
        className="blog-card-image"
        alt={blog.picture ? blog.title : "No image available"}
      />
      <div className="blog-card-content-wrapper">
        <Card.Title className="blog-card-title">{blog.title}</Card.Title>
        <Card.Text className="blog-card-content">
          {blog.content.slice(0, 100)}...
        </Card.Text>
        
        {/* Display the first comment */}
        <div className="blog-card-comment">
          <strong>Comments: </strong>{firstComment}
        </div>

        <div className="blog-card-footer">
          {/* Link to blog detail page */}
          <Link to={`/blogs/getBlog/${blog._id}`} className="read-more-btn">
            Read More
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;
