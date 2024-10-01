import React, { useEffect, useState } from 'react';
import { auth, getData } from '../firebaseconfig/firebasemethod'; // Fetch data from Firestore
import { onAuthStateChanged } from 'firebase/auth';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({}); // State for Firestore data

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Set user authentication info
        setUser({
          email: currentUser.email,
          displayName: currentUser.displayName,
          uid: currentUser.uid,
        });

        try {
          
          const userData = await getData('users', currentUser.uid); 
          setProfileData(userData); 
        } catch (error) {
          console.error('Error fetching data from Firestore: ', error);
        }
      } else {
        console.log('No user is signed in.');
      }
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  if (loading) {
    return <h1 style={styles.noUser}>Loading profile...</h1>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Profile</h1>

      <div style={styles.profileContainer}>
        {profileData.profileImageUrl ? (
          <img src={profileData.profileImageUrl} alt="Profile" style={styles.profileImage} />
        ):(<h2>hwllo</h2>)}
        <h2 style={styles.name}>{profileData.displayName || 'User'}</h2>
        <p style={styles.email}>{profileData.email || user.email}</p>
       
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
    fontSize: '2.5em',
  },
  profileContainer: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '20px',
  },
  name: {
    fontSize: '2em',
    color: '#333',
  },
  email: {
    fontSize: '1.2em',
    color: '#666',
    marginBottom: '10px',
  },
  phone: {
    fontSize: '1em',
    color: '#666',
  },
  address: {
    fontSize: '1em',
    color: '#666',
  },
  noUser: {
    textAlign: 'center',
    color: '#666',
    fontSize: '1.5em',
  },
};

export default Profile;
