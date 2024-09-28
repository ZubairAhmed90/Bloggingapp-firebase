import React from 'react'
import Card from '../components/Card' // Import the Card component

const Home = () => {
  // Dummy blog data
  const blogs = [
    {
      id: '1',
      title: 'Exploring the Mountains',
      description: 'A journey through the scenic mountain ranges...',
      imageUrl: 'https://via.placeholder.com/400x200.png?text=Mountain+View',
    },
    {
      id: '2',
      title: 'The Beauty of the Ocean',
      description: 'Diving into the depths of the vast blue sea...',
      imageUrl: 'https://via.placeholder.com/400x200.png?text=Ocean+View',
    },
    {
      id: '3',
      title: 'Adventures in the Forest',
      description: 'Discovering the secrets of the deep forests...',
      imageUrl: 'https://via.placeholder.com/400x200.png?text=Forest+View',
    },
  ]

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to the Blog</h1>
      <div style={styles.blogContainer}>
        {blogs.map((blog) => (
          <Card
            key={blog.id}
            id={blog.id}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.imageUrl}
          />
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    color: '#333',
    fontSize: '2.5em',
  },
  blogContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
}

export default Home
