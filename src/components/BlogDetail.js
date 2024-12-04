import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom"; // Import useParams
import "../css/BlogDetail.css"; // Import the CSS file

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
          <h4 className="author-name">Author: {blog.author.userName}</h4>

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
