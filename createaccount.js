import React from "react";
import Card from './card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function validate(field, label){
    if(!field) {
      setStatus('Error: ' + label);
      setTimeout( ()=> setStatus ( ''), 3000);
      return false;
    } else if (label === 'password' && field.length < 8) {
     alert('Password needs minimum of 8 characters');
     return false; 
    }
    return true;
  }

  const handleCreate = async () => {
    if (!validate(name,     'name'))     return;
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
   
    const createUrl = `http://167.172.234.182:3001/account/create/${name}/${email}/${password}`;
    const response = await fetch(createUrl);
   /*const userResponse = await response.json();
    console.log(userResponse);*/
    const message = 'Successfully created account!';
    setShow(false);
    toast.success(message);  
  }    

  const clearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <>
    <ToastContainer position="top-right" autoClose={5000}/>
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? (  
              <>
              Name<br/>
              <input name="name" type="text" className="form-control" id="email" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)}/><br/>
              Email address<br/>
              <input name="email" type="text" className="form-control" id="name" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>
              Password<br/>
              <input name="password" type="text" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-light" onClick={handleCreate} disabled={name.length <1 && email.length <1 && password.length <1}>Create Account</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
              </>
            )}
    />
 </>  
  )

}

export default CreateAccount