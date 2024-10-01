// ErrorPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404 Not Found</h1>
      <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <Link href="/" style={styles.link}>Go back to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    marginTop: '50px',
  },
  header: {
    fontSize: '2.5em',
    color: '#333',
  },
  message: {
    fontSize: '1.2em',
    color: '#666',
  },
  link: {
    display: 'inline-block',
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
  },
};

export default ErrorPage;
