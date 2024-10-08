import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom'; 
import Card from '../components/Card'; 
import { auth, getData } from '../firebaseconfig/firebasemethod'; 
import { onAuthStateChanged } from 'firebase/auth';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const dummyBlogs = [
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
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const blogsData = await getData("blogs", user.uid); // Fetch blogs for the current user
          setBlogs(blogsData.length > 0 ? [...blogsData] : [...dummyBlogs]); // Set blogs state with fetched data or use dummy data
        } else {
          setBlogs(dummyBlogs); // If no user is authenticated, show dummy blogs
        }
      });
    };

    fetchBlogs();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to the Blog</h1>
      <div style={styles.blogContainer}>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id}>
              <Link to={`/blogdetails/${blog.id}`} style={{ textDecoration: 'none' }}>
                <Card
                  title={blog.title}
                  description={blog.description}
                  imageUrl={blog.imageUrl}
                />
              </Link>
            </div>
          ))
        ) : (
          <h2 style={styles.noBlogs}>No blogs found</h2>
        )}
      </div><Outlet/>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f8f9fa', 
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', 
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    color: '#343a40', 
    fontSize: '2.5em',
    fontWeight: 'bold',
  },
  blogContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center', 
    gap: '20px', 
  },
  noBlogs: {
    textAlign: 'center',
    color: '#6c757d', 
    fontSize: '1.5em',
    marginTop: '20px',
  },
};

export default Home;
