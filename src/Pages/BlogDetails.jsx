import React from 'react'
import { useParams } from 'react-router-dom'

const BlogDetails = ({ blogs }) => {
  const { id } = useParams() 

  // Convert id to a number if necessary
  const blog = blogs.find(blog => blog.id === parseInt(id)) 

  if (!blog) {
    return <h2>Blog not found</h2>
  }

  return (
    <div style={styles.container}>
      <img src={blog.imageUrl} alt={blog.title} style={styles.image} />
      <h1 style={styles.title}>{blog.title}</h1>
      <p style={styles.description}>{blog.description}</p>
    </div>
  )
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    marginBottom: '20px',
    borderRadius: '10px',
  },
  title: {
    fontSize: '2.5em',
    color: '#333',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.2em',
    color: '#666',
  },
}

export default BlogDetails
