import React from "react";
import Card from './card';
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';



function Withdraw({user, setUser}){
  const [status, setStatus] = React.useState('')
  const [balance, setBalance] = React.useState(user.totalBalance);
  const [isLoading, setIsLoading] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      withdraw: 0
    },
    onSubmit: values => {
      if (values.validation === 'yes') {
        setIsLoading(true);
        updateBalance();
      }
    },
    validate: values => {
      let errors = {};
      if (balance <=0) {
        errors.withdraw = 'There is no more money to withdraw';
      } else if (balance - parseInt(values.withdraw) < 0) {
        errors.withdraw = 'The value entered is greater than the balance.';
      } else if (!values.withdraw) {
        errors.withdraw = 'Please enter a value to withdraw';
      } else if (parseInt(values.withdraw) <= 0) {
        errors.withdraw = 'Please enter a number greater than 0.';
      } else if (isNaN(values.withdraw)) {
        errors.withdraw = 'Please enter numbers only.';
      }
      else {
        values.validation = 'yes';
      }

      return errors;
     }
  });
 
    const updateBalance = () => {
      setIsLoading(true);
      setTimeout(async () => {
      const amount = -parseInt(formik.values.withdraw);
      const withdrawUrl = `http://167.172.234.182:3001/account/withdraw/${user.email}/${amount}`;
      //call express to update balance in DB
      const response = await fetch(withdrawUrl);
      const userResponse = await response.json(); //extract JSON from the http response

      if (userResponse) {
        setBalance(userResponse.balance);
        setUser({...user, totalBalance: userResponse.balance});
        formik.values.withdraw = '';
        setIsLoading(false);
        toast.success('Successfully completed withdraw.', {
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
      bgcolor="danger"
      header="Withdraw"
      status={status}
      body={(  
        <>
          <ToastContainer
            position="top-right"
            autoClose={5000}
          />
         <div>
           <div className="row"> 
             <div className="col-lg-12">
               <label htmlFor="total-balance">BALANCE</label>
               <div id="total-balance">{balance}</div>
             </div>
            </div>
          <form onSubmit={formik.handleSubmit}>
            <div>Withdraw Amount</div>
            <input name="withdraw" type="number" onChange={formik.handleChange} value={formik.values.withdraw} />
            {formik.errors.withdraw ? <div style={{color: 'white'}}>{formik.errors.withdraw}</div>:null}
            {!isLoading && <button type="submit" disabled={formik.errors.withdraw}>Submit</button>}
            {isLoading && <button type="button" className="loading-btn"><ReactLoading type={'spokes'} color="#000" style={{textAlign: 'right', height: '45%', width: '45%'}} /></button>}
          </form>
        </div>
        </>
      )}
    />
    
  );
}

export default Withdraw;
