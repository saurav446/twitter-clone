import React, { useState } from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Link } from 'react-router-dom';
import './Login.css';  
import Auth from './useAuth';
import { useForm } from "react-hook-form";   
import Snackbar from '@material-ui/core/Snackbar'; 
import Alert from '@material-ui/lab/Alert';
 
const Login = () => {
  const { register, handleSubmit, errors } = useForm();

    const auth = Auth();
    const onSubmits = (data) =>{
       if(data.email && data.password) {
         auth.login(data.email , data.password)
       }
    }
    
     

    const [state, setState] = useState({ 
      vertical: 'top',
      horizontal: 'right',
    });
  
    const { vertical, horizontal } = state;
    const handleClose = () => { 
      auth.setOpen(false);
    };

    
    return (
        <div className="m-auto" >
            <div className="Signup">
      <TwitterIcon className="twitter" fontSize="large" /> 
      <h2>Login </h2>
      <form  onSubmit={handleSubmit(onSubmits)}  >
        <input 
          name="email" 
          type="email"
          placeholder="Email"
          ref={register({required: true})}
        />   <br />
        {errors.email && <span>Email is required</span>}
        <br />
        <input
          name="password" 
          type="password"
          placeholder="Password"
          ref={register({required: true})}
        /> <br />
              {errors.password && <span>Password is required</span>}
        <br />
        <input type="submit"   value="Login" />
      </form>
      <br />
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p> 
    </div>
 

        <Snackbar
         anchorOrigin={{ vertical, horizontal }}
           open={auth.open} autoHideDuration={3000}
          onClose={handleClose}>
        <Alert onClose={handleClose}   severity="info">
          {auth.error}
        </Alert>
      </Snackbar>
   

        </div>
    );
};

export default Login;