import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useHistory, Link } from "react-router-dom";


const Header = ({ children, hasHiddenAuthButtons }) => {


  let history = useHistory();
   let token = localStorage.getItem("token")
let username = localStorage.getItem("username")
//console.log(token)

    return (
      <Box className="header">
        <Box className="header-title">
        <Link to="/">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Link>
        </Box>


        

        {hasHiddenAuthButtons?(
        <Button
  className="explore-button"
  startIcon={<ArrowBackIcon />}
  variant="text"
  
  onClick={() => history.push("/")}
>
  Back to explore </Button>
  ):(username ?(
    <>
     <Box >{children}</Box>
  <Stack direction="row" spacing={1} alignItems="center"  justifyContent="space-between">

<Avatar  alt ={username} src="../../public/avatar.png" />
<p>{username}</p>
<Button
  className="explore-button"
  
  variant="text"
  onClick={()=>{
    history.push("/")

    localStorage.clear()

    window.location.reload()
  
  }
  }
>LOGOUT</Button>

  </Stack>
  
  </>)
  :(
    <>
 <Box >{children}</Box>

  <Stack direction="row" spacing={1}>
  
<Button
  className="explore-button"
  
  variant="text"
  onClick={()=>history.push("/login")}
>LOGIN</Button>

<Button
  className="button"
  
  variant="contained"
onClick={()=>history.push("/register")}
>Register</Button>
</Stack>
</>))}
          
       
      </Box>
    );
};

export default Header;
