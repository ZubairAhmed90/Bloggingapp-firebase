import React, { useRef } from 'react'
import { signUpUser, uploadImage } from '../firebaseconfig/firebasemethod'

const Register = () => {
  const fullName = useRef()
  const email = useRef()
  const password = useRef()
  const profileImage = useRef()

  const loginUserFromFirebase = async (event) => {
    event.preventDefault()
    console.log(email.current.value)
    console.log(password.current.value)
    console.log(fullName.current.value)
    console.log(profileImage.current.files[0])

    const userProfileImageUrl = await uploadImage(profileImage.current.files[0], email.current.value)

    try {
      const userData = await signUpUser({
        email: email.current.value,
        password: password.current.value,
        fullName: fullName.current.value,
        profileImage: userProfileImageUrl
      })
      console.log(userData);

    } catch (error) {
      console.error(error);

    }

  }
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Register</h1>
      <form onSubmit={loginUserFromFirebase} style={styles.form}>
        <input 
          type="text" 
          placeholder='Enter your full name' 
          ref={fullName} 
          style={styles.input} 
        /> 
        <br />
        <input 
          type="email" 
          placeholder='Enter your email' 
          ref={email} 
          style={styles.input} 
        />
        <br />
        <input 
          type="password" 
          placeholder='Enter your password' 
          ref={password} 
          style={styles.input} 
        />
        <br />
        <input 
          type="file" 
          ref={profileImage} 
          style={styles.fileInput} 
        />
        <br />
        <button type='submit' style={styles.button}>Register</button>
      </form>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    backgroundColor: "#fff",
    textAlign: "center"
  },
  title: {
    marginBottom: "20px",
    fontSize: "2em",
    color: "#333"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px"
  },
  fileInput: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    fontSize: "16px"
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s"
  }
}

export default Register
