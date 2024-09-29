import React, { useEffect, useState } from 'react';
import { auth, getData } from '../firebaseconfig/firebasemethod';
import { onAuthStateChanged } from 'firebase/auth';
import { getDownloadURL, ref, getStorage } from 'firebase/storage'; // Import getStorage

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const storage = getStorage(); // Initialize storage

  useEffect(() => {
    // Check if user is logged in and get their data
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Set user data
        setUser({
          email: currentUser.email,
          displayName: currentUser.displayName,
          uid: currentUser.uid,
        });

        // Get the profile image URL from Firebase Storage
        const imageRef = ref(storage, `profileImages/${currentUser.uid}`); // Adjust the path as needed
        try {
          const url = await getDownloadURL(imageRef);
          setProfileImageUrl(url);
        } catch (error) {
          console.error("Error fetching profile image: ", error);
        }
      } else {
        console.log("No user is signed in.");
      }
      setLoading(false); // Set loading to false once user data is fetched
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [storage]);

  if (loading) {
    return <h1 style={styles.noUser}>Loading profile...</h1>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Profile</h1>

      <div style={styles.profileContainer}>
        {profileImageUrl && (
          <img src={profileImageUrl} alt="Profile" style={styles.profileImage} />
        )}
        <h2 style={styles.name}>{user.displayName || "User"}</h2>
        <p style={styles.email}>{user.email}</p>
      </div>
    </div>
  );
};

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
  noUser: {
    textAlign: "center",
    color: "#666",
    fontSize: "1.5em",
  },
};

export default Profile;
