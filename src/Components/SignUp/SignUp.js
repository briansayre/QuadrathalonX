import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../libs/contextLib";
import { onError } from "../../libs/errorLib";
import { Auth } from "aws-amplify";
import './SignUp.css';

export default function SignUp() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");


  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  /*
  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      password === confirmPassword
    );
  }

  function validateConfirmationForm() {
    return confirmationCode.length > 0;
  }
  */
  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: email,
        password: password,
        attributes: {name: name},
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  

  async function handleConfirmationSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      await Auth.confirmSignUp(email, confirmationCode);
      await Auth.signIn(email, password);
  
      userHasAuthenticated(true);
      history.push("/choice");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }


  function renderConfirmationForm() {
    if (isLoading) {
      return (
        <h1 className="loading"> LOADING</h1>
      );
    } else {
      return (
        <div>
          <p class="home-text">
                Check your email for a confirmation code.
          </p>

          <div class="button-flex-container">

            <div class="row"> 

              <div class="button-flex-item"> 
                <input 
                autoFocus
                onChange={e => setConfirmationCode(e.target.value)}
                value={confirmationCode}
                class="text-input" 
                placeholder="CONFIRMATION CODE" />
              </div>
          
              <div class="button-flex-item">
                <form onSubmit={handleConfirmationSubmit}>
                  <button className="pink-button" type="submit"> 
                    SIGN UP
                  </button>
                </form>
              </div>

            </div>
          
          </div> 
        </div>
      );
    }
  }


 function renderForm() {
   if (isLoading) {
    return (
      <h1 className="loading"> LOADING</h1>
    );
   } else {
    return (
      <div>
        
        <div class="button-flex-container">

          <div class="row"> 

            <div class="button-flex-item"> 
              <input 
              autoFocus 
              onChange={e => setName(e.target.value)}
              value={name}
              class="text-input" 
              type="text" 
              placeholder="NAME" />
            </div>

            <div class="button-flex-item">
              <input 
              onChange={e => setEmail(e.target.value)}
              value={email}
              class="text-input" 
              type="text" 
              placeholder="EMAIL" />
            </div>

            <div class="button-flex-item"> 
              <input 
              onChange={e => setPassword(e.target.value)}
              value={password}
              class="text-input" 
              type="password" 
              placeholder="PASSWORD" />
            </div>

            <div class="button-flex-item"> 
              <input 
              onChange={e => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              class="text-input" 
              type="password" 
              placeholder="RETYPE PASSWORD" />
            </div>
        
            <div class="button-flex-item">
              <form form onSubmit={handleSubmit}>
                <button className="pink-button" type="submit"> 
                  NEXT
                </button>
              </form>
            </div>

          </div>
        
        </div> 
      </div>
    );
   }
  }

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );

}
