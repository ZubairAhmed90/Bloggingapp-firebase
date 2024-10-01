import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { auth, getData, sendData, uploadImage } from '../firebaseconfig/firebasemethod'; // Import uploadImage
import { onAuthStateChanged } from 'firebase/auth';

const Dashboard = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [blogs, setBlogs] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const blogsData = await getData("blogs", user.uid);
        setBlogs([...blogsData]);
      }
    });
  }, []);

  const sendDatatoFirestore = async (data) => {
    try {
      let imageUrl = '';
      if (selectedImage) {
        // Upload image and get the URL
        imageUrl = await uploadImage(selectedImage, auth.currentUser.email);
      }
      
      const response = await sendData({
        title: data.title,
        description: data.description,
        uid: auth.currentUser.uid,
        imageUrl: imageUrl, // Save image URL with blog data
      }, 'blogs');

      // Update blogs state with the new blog entry
      setBlogs(prevBlogs => [
        ...prevBlogs,
        {
          title: data.title,
          description: data.description,
          uid: auth.currentUser.uid,
          imageUrl: imageUrl,
        }
      ]);
      
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]); // Get the selected file
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Dashboard</h1>
      <form onSubmit={handleSubmit(sendDatatoFirestore)} style={styles.form}>
        <input 
          type="text" 
          placeholder='Enter blog title' 
          {...register("title", { required: true })} 
          style={styles.input} 
        />
        {errors.title && <span style={styles.error}>This field is required</span>}
        <br />
        <textarea 
          cols='25' 
          rows='5' 
          placeholder='Enter blog description' 
          {...register("description", { required: true })} 
          style={styles.textarea} 
        />
        {errors.description && <span style={styles.error}>This field is required</span>}
        <br />
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          style={styles.fileInput} 
        />
        <br />
        <button type='submit' style={styles.button}>Add Blog</button>
      </form>

      <h1 style={styles.header}>User Blogs</h1>
      <div style={styles.blogContainer}>
        {blogs.length > 0 ? blogs.map((item, index) => (
          <div key={item.id} style={styles.card}>
            <h2 style={styles.cardTitle}>{item.title}</h2>
            <p style={styles.cardDescription}>{item.description}</p>
            {item.imageUrl && <img src={item.imageUrl} alt="Blog" style={styles.blogImage} />} {/* Display the image */}
          </div>
        )) : <h2 style={styles.noBlogs}>No blogs found</h2>}
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
    fontSize: "2.5em"
  },
  form: {
    marginBottom: "30px"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px"
  },
  textarea: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    resize: "none"
  },
  fileInput: {
    margin: "10px 0",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s"
  },
  blogContainer: {
    marginTop: "20px"
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
    color: "#333"
  },
  cardDescription: {
    fontSize: "1em",
    color: "#666",
    marginTop: "10px"
  },
  blogImage: {
    width: "100%",
    height: "auto",
    borderRadius: "5px",
    marginTop: "10px",
  },
  noBlogs: {
    textAlign: "center",
    color: "#999",
    fontSize: "1.2em"
  },
  error: {
    color: "red",
    fontSize: "0.9em"
  }
};

export default Dashboard;
