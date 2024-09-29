import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For navigation

const Card = ({ id, title, description, imageUrl }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div style={cardStyles.container}>
      <img src={imageUrl} alt={title} style={cardStyles.image} />
      <h3 style={cardStyles.title}>{title}</h3>
      <p style={cardStyles.description}>
        {showMore ? description : `${description.substring(0, 100)}...`} 
      </p>
      <div style={cardStyles.buttonContainer}>
        <button style={cardStyles.button} onClick={toggleShowMore}>
          {showMore ? 'Show Less' : 'Show More'}
        </button>
        <Link to={`/BlogDetails/${id}`} style={cardStyles.learnMoreButton}>
          Learn More
        </Link>
      </div>
    </div>
  );
};

const cardStyles = {
  container: {
    backgroundColor: '#ffffff', // White background for the card
    borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    width: '300px', // Fixed width for the card
    minWidth: '250px', // Ensure a minimum width
    marginBottom: '20px', // Space at the bottom of the card
    textAlign: 'left',
    transition: 'transform 0.2s',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  title: {
    fontSize: '1.5em',
    color: '#343a40',
    margin: '10px 0',
  },
  description: {
    color: '#6c757d',
    padding: '0 10px 10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 10px 10px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  learnMoreButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '5px',
    textDecoration: 'none',
  },
};

export default Card;
