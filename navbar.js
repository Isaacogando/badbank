import React from "react";
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

function NavBar({user, setUser}){
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    setUser({
      firstName: '',
      lastName: '',
      isLoggedIn: false,
      email: '',
      totalBalance: 0
     })
    setTimeout(() => {
      navigate('/');
    }, 1000)

  }

   
   console.log('user ', user);
  
  
    return(
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Bad Bank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
        { !user.isLoggedIn &&  <li className="nav-item">
            <span className="tooltip-text">Create a user</span>
            <a className="nav-link" href="#/CreateAccount/">Create Account</a>
          </li> }
          { !user.isLoggedIn &&  <li className="nav-item">
            <span className="tooltip-text">Login into your account</span>
            <a className="nav-link" href="#/login/">Login</a>
              </li> }
            { user.isLoggedIn && <>
             <Dropdown>
             <Dropdown.Toggle variant="success" id="dropdown-basic">
               {user.name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
            </>}
         { user.isLoggedIn && <li className="nav-item">
            <span className="tooltip-text">Add money to your account</span>
            <a className="nav-link" href="#/deposit/">Deposit</a>
            </li>  }
            { user.isLoggedIn &&    <li className="nav-item">
            <span className="tooltip-text">Take money out</span>
            <a className="nav-link" href="#/withdraw/">Withdraw</a>
          </li> }
        </ul>
      </div>
    </nav>
    </>
  );
  }

  export default NavBar