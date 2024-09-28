
import React, { useEffect, useState } from 'react'
import { auth, getData } from '../firebaseconfig/firebasemethod'
import { onAuthStateChanged } from 'firebase/auth'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    // Check if user is logged in and get their data
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser({
          email: currentUser.email,
          displayName: currentUser.displayName,
          profileImageUrl: currentUser.photoURL,
        })
        
        // Fetch blogs data for this user
        const userBlogs = await getData('blogs', currentUser.uid)
        setBlogs(userBlogs)
      } else {
        // Handle the case when user is not logged in (optional)
        console.log("No user is signed in.")
      }
    })
  }, [])

  if (!user) {
    return <h1 style={styles.noUser}>Loading profile...</h1>
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Profile</h1>

      <div style={styles.profileContainer}>
        {user.profileImageUrl && (
          <img src={user.profileImageUrl} alt="Profile" style={styles.profileImage} />
        )}
        <h2 style={styles.name}>{user.displayName || "User"}</h2>
        <p style={styles.email}>{user.email}</p>
      </div>

      <h1 style={styles.header}>My Blogs</h1>
      <div style={styles.blogContainer}>
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <div key={index} style={styles.card}>
              <h2 style={styles.cardTitle}>{blog.title}</h2>
              <p style={styles.cardDescription}>{blog.description}</p>
            </div>
          ))
        ) : (
          <h2 style={styles.noBlogs}>No blogs found</h2>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
    fontSize: "2.5em",
  },
  profileContainer: {
    textAlign: "center",
    marginBottom: "40px",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "20px",
  },
  name: {
    fontSize: "2em",
    color: "#333",
  },
  email: {
    fontSize: "1.2em",
    color: "#666",
    marginBottom: "10px",
  },
  blogContainer: {
    marginTop: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    margin: "20px 0",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  cardTitle: {
    fontSize: "1.5em",
    color: "#333",
  },
  cardDescription: {
    fontSize: "1em",
    color: "#666",
    marginTop: "10px",
  },
  noBlogs: {
    textAlign: "center",
    color: "#999",
    fontSize: "1.2em",
  },
  noUser: {
    textAlign: "center",
    color: "#666",
    fontSize: "1.5em",
  },
}

export default Profile
