import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/BlogDetail.css";
import placeholderProfilePicture from "../components/images/placeholder-profilePicture.png";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext for authentication
import { Notyf } from "notyf"; // Import Notyf

// Create Notyf instance
const notyf = new Notyf({
  duration: 3000,
  position: { x: "center", y: "center" },
});

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [newPicture, setNewPicture] = useState(null);
  const [showOptions, setShowOptions] = useState(false); // For handling the three dots dropdown
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // For delete confirmation modal
  const [newComment, setNewComment] = useState(""); // For handling new comment text
  const [refetchFlag, setRefetchFlag] = useState(false); // Flag to trigger blog re-fetch

  const { user, isAuthenticated } = useContext(AuthContext); // Access auth state and user
  const navigate = useNavigate(); // For navigation after deletion

  const { blogId } = useParams();

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/blogs/getBlog/${blogId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }
        const data = await response.json();
        setBlog(data.blog);
        setEditedContent(data.blog.content);
        setEditedTitle(data.blog.title); // Set initial title
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch the blog. Please try again later.");
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlogDetail();
    }
  }, [blogId, refetchFlag]); // Refetch when refetchFlag changes

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const body = {
        title: editedTitle, // Send the edited title
        content: editedContent, // Send the edited content
        picture: newPicture ? newPicture : blog.picture, // Use the new picture if provided, else keep the existing one
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/blogs/editBlog/${blogId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update blog post");
      }

      const updatedBlog = await response.json();
      setBlog(updatedBlog.updatedBlog); // Update state with the updated blog
      setIsEditing(false);

      notyf.success("Blog post updated successfully!");
    } catch (err) {
      notyf.error(err.message || "An error occurred while saving the blog.");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(blog.title); // Reset to original title
    setEditedContent(blog.content); // Reset to original content
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPicture(file); // Set the new picture if a file is selected
    }
  };

  const handleShowConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/blogs/deleteBlog/${blogId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete blog post");
      }

      notyf.success("Blog post deleted successfully!");
      navigate("/blogs"); // Redirect to homepage or a different route
    } catch (err) {
      notyf.error(err.message || "An error occurred while deleting the blog.");
    } finally {
      setShowConfirmationModal(false);
    }
  };

  const handleAddComment = async () => {
  if (!newComment.trim()) {
    notyf.error("Comment cannot be empty.");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    // Make the POST request to the backend with blogId and comment text
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/blogs/addComment/${blogId}`, // Correct URL with blogId
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token for authentication
        },
        body: JSON.stringify({ text: newComment }), // Send the comment text
      }
    );

    const data = await response.json();
    console.log("Response from backend:", data); // Log the response from the backend

    if (!response.ok) {
      throw new Error(data.message || "Failed to add comment");
    }

    // Assuming the backend sends the updated blog object, including the new comment
    setBlog(data.updatedBlog); // Update the blog state with the updated blog (including the new comment)
    setNewComment(""); // Clear the comment input field
    setRefetchFlag((prev) => !prev); // Toggle refetch flag to trigger re-fetch
    notyf.success("Comment added successfully!");
  } catch (err) {
    console.error("Error in handleAddComment:", err); // Log the error
    notyf.error(err.message || "An error occurred while adding the comment.");
  }
};

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
          <div className="author-details">
            <img
              src={blog.author.profilePicture
                ? `${process.env.REACT_APP_API_BASE_URL}/uploads/${blog.author.profilePicture}`
                : placeholderProfilePicture}
              alt={blog.author.userName}
              className="author-profile-pic"
            />
            <div className="author-info">
              <span className="author-name">{blog.author.userName}</span>
              <span
                className="creation-date"
                title={`Posted on: ${new Date(blog.creationDate).toLocaleString()}`}
              >
                {timePassed(blog.creationDate)}
              </span>
            </div>

            {/* Three dots icon with options */}
            {isAuthenticated && user && ( user.isAdmin || blog.author.userId === user._id ) && (
              <div className="edit-options">
                <button
                  className="three-dots"
                  onClick={() => setShowOptions(!showOptions)} // Toggle dropdown menu
                >
                  &#x2022;&#x2022;&#x2022; {/* This is the Unicode for three dots */}
                </button>
                {showOptions && (
                  <div className="edit-dropdown">
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setShowOptions(false); // Close dropdown and start editing
                      }}
                    >
                      Edit Post
                    </button>
                    <button onClick={handleShowConfirmationModal}>Delete Post</button>
                  </div>
                )}
              </div>
            )}
          </div>

          {isEditing ? (
            <div>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="blog-edit-title"
              />
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="blog-edit-textarea"
              />
              <div>
                <label htmlFor="file-input">Change Picture</label>
                <input
                  type="file"
                  id="file-input"
                  onChange={handlePictureChange}
                />
              </div>
              <div>
                {/* Cancel and Save buttons */}
                <button onClick={handleCancelEdit}>Cancel</button>
                <button onClick={handleSave}>Save</button>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="blog-title">{blog.title}</h1>
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
            </div>
          )}

          <div className="comments-section">
            <h4>Comments:</h4>
            {blog.comments && blog.comments.length > 0 ? (
              blog.comments.map((comment) => (
                <div key={comment._id} className="comment-card">
                  <strong>{comment.userName}</strong>
                  <p>{comment.text}</p>

                  {/* Display replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="replies">
                      <h5>Replies:</h5>
                      {comment.replies.map((reply, index) => (
                        <div key={`${comment._id}-reply-${index}`} className="reply-card">
                          <strong>{reply.userName}</strong>
                          <p>{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No comments yet</p>
            )}
            {isAuthenticated && (
              <div className="add-comment">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                />
                <button onClick={handleAddComment}>Post Comment</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>No blog found</p>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <h3>Are you sure you want to delete this post?</h3>
            <div className="modal-actions">
              <button onClick={handleConfirmDelete} className="confirm-btn">
                Yes, Delete
              </button>
              <button onClick={handleCloseConfirmationModal} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
