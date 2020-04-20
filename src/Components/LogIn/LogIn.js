import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useAppContext } from "../../libs/contextLib";
import './LogIn.css';
import { useHistory } from "react-router";


export default function Login() {

  const history = useHistory();


  const { userHasAuthenticated } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  function validateForm() {
    console.log(email.length > 0 && password.length > 0);
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
      history.push("/choice");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }
  

    if (!isLoading) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
        <div className="button-flex-container">

          <div className="row"> 

            <div className="button-flex-item">
              <input autoFocus value={email} onChange={e => setEmail(e.target.value)} className="text-input" type="text" placeholder="EMAIL" />
            </div>
        
            <div className="button-flex-item"> 
              <input value={password} onChange={e => setPassword(e.target.value)} className="text-input" type="password" placeholder="PASSWORD" />
            </div>
        
            <div className="button-flex-item">
                <button className="pink-button" disabled={!validateForm()} type="submit"> 
                  LOG IN
                </button>
            </div>


          </div>
        
        </div> 
        </form>
      </div>
    );
    } else {
      return (
        <h1> LOADING</h1>
      );
    }
  
}
