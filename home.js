import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from "./card";

function Home(){

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        />
      <Card
        txtcolor="black"
        header="BadBank"
        title="Welcome to the bank"
        text="The bank for all things money."
        body={(<img src="bank.png" className="img-fluid" alt="bad bank logo"/>)}
      /> 
    </div>   
  );  
}


export default Home