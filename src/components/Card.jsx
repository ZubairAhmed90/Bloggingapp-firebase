import React from 'react';

const Card = ({ title, description, imageUrl }) => {
  return (
    <div style={cardStyles.container}>
      <img src={imageUrl} alt={title} style={cardStyles.image} />
      <h3 style={cardStyles.title}>{title}</h3>
      <p style={cardStyles.description}>{description}</p>
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
};

export default Card;
