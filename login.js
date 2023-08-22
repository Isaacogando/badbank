import React from "react";
import  { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from './card';
import { useNavigate } from 'react-router-dom';

function Login({user, setUser}){ 
  const [status, setStatus]     = React.useState('');
  const navigate = useNavigate();
    
  
  const formik = useFormik({
  initialValues: {
    email: '',
    password: ''
  },
  onSubmit: values => {
    if (values.validation === 'yes') {
      handleLogin();
    }
  },
  validate: values => {
    let errors = {};
    if (values.email === '') {
      errors.email = 'Invalid email';
    } else if (values.password === '') {
      errors.password = 'Invalid password';
    } else {
      values.validation = 'yes';
    }

    return errors;
  }

  
});

const handleLogin = async () => {
  let hasValidated;
      const loginUrl = `http://167.172.234.182:3001/account/login/${formik.values.email}/${formik.values.password}`;
      //call express to login user
      const response = await fetch(loginUrl);
      const userResponse = await response.json();
     
      console.log(userResponse);
      hasValidated = userResponse.status === 'success' ? true : false;
  
      if (hasValidated) {
        setUser({isLoggedIn: 'yes', 
        name: userResponse.data.name, 
        email: userResponse.data.email, 
        password: userResponse.data.password, 
        totalBalance: userResponse.data.balance});

        setTimeout(() => {
          console.log(user);
          
          navigate("/");
         
        }, 1000);
      } else {
        toast.error(userResponse.message);
      }
}

   return ( 
     <div>  
   <ToastContainer
   position="top-right"
   autoClose={5000}
   />
   <Card
        setClass="login-card"
        bgcolor="dark"
        txtcolor="white"
        header="Login"
        
        status={status}
        body={(
          <>
            <form onSubmit={formik.handleSubmit}>
                <div>Email</div>
                <input className="email-input" name="email" type="input" onChange={formik.handleChange} value={formik.values.email} />
                {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div>:null}
                <div>Password</div>
                <input className="password-input" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} />
                {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div>:null}
                <button className='btn-secondary' type="submit" disabled={formik.errors.email || formik.errors.password}>Login</button>
              </form>
             
          </>
        )}
      />
    </div>
  )  
}

export default Login