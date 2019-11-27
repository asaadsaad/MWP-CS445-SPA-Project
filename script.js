



    

  window.onload = function() {
    loginPage = `<h1>Please Login</h1>
    <br />
    <form id="myLoginForm">
    <label>
    <span><b>Username</b></span>
    <input type='text' id='userName' value='mwp' required/> 
    </label>
    <br />   
    <label>
    <span><b>Password</b></span>     
    <input type='text' id='userPassword' value='123' required/> 
    </label>
    <br />  
    <button type="submit">login</button>
     </form>`;
    document.getElementById("outlet").innerHTML = loginPage;
    
    
} 
