import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOutUser } from '../firebaseconfig/firebasemethod'

const Navbar = () => {

  // useNavigate
  const navigate = useNavigate()

  const logoutUser = async () => {
    const user = await signOutUser();
    setIsUser(false)
    console.log(user);
    navigate('login')
  }
  
    return (
        <div style={{ 
          display: "flex", 
          justifyContent: "space-around", 
          alignItems: "center", 
          backgroundColor: "#333", 
          padding: "10px 20px", 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" 
        }}>
          <h3 style={{ margin: "0" }}>
            <Link to='dashboard' style={linkStyle}>Dashboard</Link>
          </h3>
          <h3 style={{ margin: "0" }}>
            <Link to='' style={linkStyle}>Home</Link>
          </h3>
          <h3 style={{ margin: "0" }}>
            <Link to='profile' style={linkStyle}>Profile</Link>
          </h3>
          <h3 style={{ margin: "0" }}>
            <Link to='login' style={linkStyle}>Login</Link>
          </h3>
          <h3 style={{ margin: "0" }}>
            <Link to='register' style={linkStyle}>Register</Link>
          </h3>
          <h3 
            className='cursor-pointer' 
            onClick={logoutUser} 
            style={{ 
              ...linkStyle, 
              cursor: "pointer" 
            }}
          >
            Logout
          </h3>
        </div>
      );
    }
    
    const linkStyle = {
      color: "#fff",
      textDecoration: "none",
      padding: "8px 15px",
      borderRadius: "5px",
      transition: "background-color 0.3s, color 0.3s",
      fontSize: "18px",
      fontWeight: "500",
      textTransform: "uppercase",
      letterSpacing: "1px"
    };
    
    const linkHoverStyle = {
      backgroundColor: "#555",
      color: "#f9f9f9"
    }
  

export default Navbar