import React from 'react';
import '../css/Blogs.css';

const Blogs = () => {
  // Assume blogs are fetched here
  const blogs = [
    { id: 1, title: 'First Blog Post', content: 'This is a sample blog post.' },
    { id: 2, title: 'Another Blog Post', content: 'More content here...' }
  ];

  return (
    <div className="blogs">
      <h2>All Blogs</h2>
      {blogs.map(blog => (
        <div key={blog.id} className="blog-card">
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
