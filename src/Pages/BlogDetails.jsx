import React from 'react';
import { useParams } from 'react-router-dom'; 

const BlogDetails = ({ blogs }) => {
  const { id } = useParams(); 

  const blog = blogs.find(blog => blog.id === id); 

  if (!blog) {
    return <h2>Blog not found</h2>; 
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.description}</p>
      <img src={blog.imageUrl} alt={blog.title} />
    </div>
  );
};

export default BlogDetails;
