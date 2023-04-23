import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();


let history = useHistory()

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */


   let [username , setUsername]=useState("")
   let [password , setPassword]=useState("")
   let[cnfPassword , setCnfPasword] = useState("")
   let[progress , setProgress] = useState(false)
 
   let data = {
     username:username,
     password:password,
     confirmPassword:cnfPassword
   }

  const register = async (formData) => {

//console.log(formData)

// let aa= {"username": formData.username,
// "password " : formData.password}

if(validateInput(formData)){

    try{

     // console.log("inside try block")
     setProgress(true)
      let res = await axios.post(`${config.endpoint}/auth/register`,{
        "username":formData.username,
        "password": formData.password
          })
    //  console.log("res")
    //   console.log(res.data)
    //   console.log(res)
      
      setProgress(false)
 
      enqueueSnackbar("Registered Successfully" , { variant: 'success' })
     
     

      history.push("/login")
    
  
    }catch(e){

console.log(e)
console.log(e.response.data.message)

      if(e.response.status ===400){
        enqueueSnackbar(`${e.response.data.message}` , { variant: 'error' })
     
      }
      else{
        enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.",{ variant: 'error' })
      }
      

      setProgress(false)

    }}
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {

   let  usernameLength = data.username.length
   let passwordLength = data.password.length

   if(usernameLength<1){
    enqueueSnackbar("Username is a required field" , { variant: 'warning' })
    return false
   }
   else if(usernameLength<6){
   enqueueSnackbar("Username must be at least 6 characters" , { variant: 'warning' })
return false}
else if(passwordLength<1)
{
  enqueueSnackbar("Password is a required field" , { variant: 'warning' })
return false
}
else if(passwordLength<6){
  enqueueSnackbar("Password must be at least 6 characters" , { variant: 'warning' })
  return false
}
else if (data.password!==data.confirmPassword){
  enqueueSnackbar("Passwords do not match",{ variant: 'warning' });
  return false;
}
else{
  return true
}

  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            value={cnfPassword}
            onChange={(e)=>setCnfPasword(e.target.value)}
          />

          

{progress ?<Box sx={{ display: 'flex',justifyContent:"center" }}>
                    <CircularProgress />
                   </Box>
                  :<Button className="button" variant="contained" onClick={()=>{
                    register(data)
                   
                 }}>
                  Register Now
                 </Button>
           }


         { /* */}
          <p className="secondary-action">
            Already have an account?{" "}
            <Link className="link" to="/login">Login here</Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
