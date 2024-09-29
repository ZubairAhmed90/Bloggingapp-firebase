import React from 'react';
import { useForm } from "react-hook-form";
import { loginUser } from '../firebaseconfig/firebasemethod';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const loginUserFromFirebase = async (data) => {
    console.log(data);
    try {
      const userLogin = await loginUser({
        email: data.email,
        password: data.password
      });
      console.log(userLogin);

    
      navigate('/dashboard');

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Login</h1>
      <form onSubmit={handleSubmit(loginUserFromFirebase)} style={styles.form}>
        <input 
          type="email" 
          placeholder='Enter your email' 
          {...register("email", { required: true })} 
          style={styles.input} 
        /><br />
        {errors.email && <span style={styles.error}>This field is required</span>}
        <br />
        <input 
          type="password" 
          placeholder='Enter your password' 
          {...register("password", { required: true })} 
          style={styles.input} 
        /><br />
        {errors.password && <span style={styles.error}>This field is required</span>}
        <br />
        <button type='submit' style={styles.button}>Login</button>
      </form>
    </div>
  );
};

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
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px"
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s"
  }
};

export default Login;
