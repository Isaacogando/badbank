import React from "react";
import Card from './card';
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';



function Deposit({user, setUser}){
  const [status, setStatus]       = React.useState('');
  const [balance, setBalance]     = React.useState(user.totalBalance);
  const [isLoading, setIsLoading] = React.useState(false);
  const [deposit, setDeposit] = React.useState(0);

  const updateBalance = () => {
    setIsLoading(true);
    setTimeout(async () => {
      const amount = parseInt(deposit);
      const updateUrl = `http://167.172.234.182:3001/account/deposit/${user.email}/${amount}`;
      //call express to update balance in DB
      const response = await fetch(updateUrl);
      const userResponse = await response.json(); //extract JSON from the http response

      if (userResponse) {
        setBalance(userResponse.balance);
        setUser({...user, totalBalance: userResponse.balance});
        setDeposit(0);
        setIsLoading(false);
        toast.success('Deposit was successfully added.', {
          position: toast.POSITION.TOP_RIGHT
        });
      } else {
        setIsLoading(false);
        toast.error('A system error occurred.', {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }, 3000);
  }
  
  return (
    <Card
      bgcolor="info"
      header="Deposit"
      status={status}
      body={(  
        <>
          <ToastContainer
            position="top-right"
            autoClose={5000}
          />
    <div className="row">
      <div className="col-lg-12">
        <label htmlFor="total-balance">BALANCE</label>
        <div id="total-balance">{balance}</div>
      </div>
    </div>
      Deposit Amount<br/>
          <input name="deposit" type="number" className="form-control" id="deposit" placeholder="Enter Deposit" value={deposit} onChange={e => setDeposit(e.currentTarget.value)}/><br/>
          {!isLoading && <button type="submit" onClick={updateBalance}>Submit</button>}
         {isLoading && <button  type="button" className="loading-btn"><ReactLoading type={'spokes'} color="#000" style={{textAlign: 'right', height: '45%', width: '45%'}} /></button>}
        </>
      )}
    />
  )
}



export default Deposit