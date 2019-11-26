// your code here
"use strict";
window.onload = cs445Project;
/**
 * @return {object}  html object strings 
 * 
 */
function cs445Project(){
   
    const loginPage = `<div class="log-form">
    <h1>Please Login</h1>
    <form>
    Username : <input type="text" title="username" placeholder="username" /><br><br>
    Password : <input type="password" title="username" placeholder="password" /><br><br>
    <button type="submit" class="btn">Login</button><br>
    </form>
  </div><!--end log form -->`;    




let displayPage= document.getElementById("outlet");
displayPage.innerHTML  = loginPage;

}