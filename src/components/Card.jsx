import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({ id, title, description, imageUrl,onClick }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/blog/${id}`)
  }

  return (
    <div style={styles.card} onClick={handleClick}>
      <img src={imageUrl} alt="Blog" style={styles.image} />
      <div style={styles.textContainer}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.description}>{description}</p>
      </div>
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    overflow: 'hidden',
    width: '30%',
    cursor: 'pointer',
    transition: 'transform 0.3s ease-in-out',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  textContainer: {
    padding: '15px',
  },
  title: {
    fontSize: '1.5em',
    color: '#333',
    marginBottom: '10px',
  },
  description: {
    fontSize: '1em',
    color: '#666',
  },
}

export default Card
