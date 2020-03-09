import React from 'react';
import './App.css';

function App() {
  return (
    <div>

      <div class="header"> 
          QUAD <br/>
          RATH <br />
          ALON <br />
      </div>

      <p class="home-text">
        Test your gaming skills in <br/> a series of four games...
      </p>
      
      <div class="button-flex-container">
        <div class="row"> 
          <div class="button-flex-item">
            <button class="pink-button"> LOG IN </button>
          </div>
    
          <div class="button-flex-item">
            <button class="pink-button"> SIGN UP </button>
          </div>
    
          <div class="button-flex-item">
            <button class="pink-button"> GUEST </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
