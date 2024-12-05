// src/components/EditBlogModal.js
import React, { useState } from "react";

const EditBlogModal = ({ blog, isOpen, closeModal, handleUpdate }) => {
  const [updatedTitle, setUpdatedTitle] = useState(blog.title);
  const [updatedContent, setUpdatedContent] = useState(blog.content);
  const [updatedPicture, setUpdatedPicture] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedBlog = {
      title: updatedTitle,
      content: updatedContent,
      picture: updatedPicture,
    };
    handleUpdate(updatedBlog); // Pass the updated blog data to the parent
    closeModal(); // Close the modal after update
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Blog</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Content</label>
            <textarea
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label>Picture</label>
            <input
              type="file"
              onChange={(e) => setUpdatedPicture(e.target.files[0])}
            />
          </div>
          <button type="submit">Update Blog</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlogModal;
