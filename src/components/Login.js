import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();

  let history = useHistory()

  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */


   let [username , setUsername]=useState("")
   let [password , setPassword]=useState("")
   let[progress , setProgress] = useState(false)

   let data = {
 username : username,
 password : password

   }

  const login = async (formData) => {

if (validateInput(formData)){
  try{

    // console.log("inside try block")
setProgress(true)
    let res = await axios.post(`${config.endpoint}/auth/login`,formData)
   // console.log("res")
     console.log(res.data)
     console.log(res)

     persistLogin(res.data.token , res.data.username , res.data.balance)
     
    // setProgress(true)
setProgress(false)
     enqueueSnackbar("Logged in Successfully" , { variant: 'success' })
    
    // setProgress(false)
   
 history.push("/")
   }
   catch(e){

   
    

      if(e.response.status ===400){
        enqueueSnackbar(`${e.response.data.message}` , { variant: 'error' })
     
      }
      else{
        enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.",{ variant: 'error' })
      }
      setProgress(false)
   }
}

  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (data) => {

    let usernameLength = data.username.length
    let passwordLength = data.password.length


    if(usernameLength<1){
      enqueueSnackbar("Username is a required field" , { variant: 'warning' })
    return false
    }
    else if (passwordLength<1){
      enqueueSnackbar("Password is a required field" , { variant: 'warning' })
    return false
    }
    else {
      return true
    }
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => { 
    window.localStorage.setItem("token",token);
    window.localStorage.setItem("username",username);
    window.localStorage.setItem("balance",balance);
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
        <h2 className="title">Login</h2>
        <TextField
        label ="Username"
        id="username"
        placeholder="Username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        
        />

<TextField
type="password"
        label ="Password"
        id="password"
        variant="outlined"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
 />


{progress ?<Box sx={{ display: 'flex',justifyContent:"center" }}>
                    <CircularProgress />
                   </Box>
                  :<Button variant="contained" className = "button" onClick={()=>login(data)}>Login to Qkart </Button>
           }

{/**/}
<p>Don't have an account? <Link className="link" to="/register">Register now</Link></p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
