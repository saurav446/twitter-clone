import React, { useState } from 'react'; 
import TwitterIcon from '@material-ui/icons/Twitter';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Auth from './useAuth';
import { storage } from './firebase'; 

const Signup = () => { 
 
      const [image,setImage] = useState(null)
      const [progress,setProgress] = useState(0)
      const auth = Auth();

      const { register, handleSubmit, errors ,watch } = useForm();

      const onSubmit = (data) => { 
        const upload = storage.ref(`images/${image.name}`).put(image);
        upload.on(
            'state_changed',
            (snapshot) =>  {
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100 )
              setProgress(progress)
            },
            (error) => {
              alert(error.message)
            },
            () => {
                storage.ref('images').child(image.name).getDownloadURL()
                .then((url) => 
                auth.signup(data.name ,data.email ,data.password,url)  
                )
            } 
        ) 
      }
     
      const hendleChange = (e) =>{
          if(e.target.files[0]){
              setImage(e.target.files[0])
          } 
      }
   

  return (
    <div className="Signup m-auto">
      <TwitterIcon className="twitter" fontSize="large" />

      <h2>Sign up </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="name"
          ref={register({ required: true })}
          type="text"
          placeholder="Name"
        /> 
        <br />
        {errors.name && <span>Name field is required!</span>}
        
         <br />
        <input
          name="email"
          ref={register({ required: true })}
          type="email"
          placeholder="Email"
          required
        /> 
           <br />
        {errors.email && <span>Email field is required!</span>}
        <br />
        <input
          name="password"
          ref={register({ required: true,minLength:8 })}
          type="password"
          placeholder="Password"
        />
        <br />
        {errors.password && <span>Password Must be 8 Character</span>}
           
        <br />
        <input
          name="c_password"
          ref={register({ 
            validate: (value) => value === watch('password')
           })}
          type="password"
          placeholder="Confirm Password"
        />
        <br />
        {errors.c_password && <span>Passwords didn't match</span>}
        <br />
        <div className="form-group">
            <input
                name="file"
                className="form-control"
                ref={register({ required: true })} 
                type="file" 
                onChange={hendleChange}
            />
            <br />
            {errors.file && (
                <span  >Photo is required</span>
            )}
             
          <progress style={{fontSize:'26px'}} className="progress" value={progress} max="100" />
        
        </div>
  
        <input type="submit" value="Sign up" />
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;