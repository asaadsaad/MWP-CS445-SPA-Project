"use strict";
window.onload = cs445Project;
/**
 * CS445 Project SPA
 * This function rap the entire page 
 * @return {object}  html elements 
 * 
 */
function cs445Project() {

  const displayPage = document.getElementById("outlet");
  let token;
  let tokenSatus;
  const loginTemplate = `<div class="log-form">
    <h1 >Please Login</h1>
    <form>
    Username : <input type="text" value="mwp" id="username" /><br><br>
    Password : <input type="text"  value="123" id="password"/><br><br>
    <button type="button" class="btn" id="login">Login</button><br>
    </form>
  </div><!--end log form -->`;

  const animationTemplate = `<div id="location"> welcome to SPA Animation</div>
  <textarea id="loding" rows="20" cols="50"></textarea><br>
  <button id="refresh" >Refresh Animation</button>
  <button id="logOut"> LogOut </button>`;

  
  
  displayPage.innerHTML = loginTemplate;
  document.getElementById("login").addEventListener("click", getToken);
  document.getElementById("login").addEventListener("click", getAnimation);


  /**
   * function to feach token from server 
   * @return {promises}  Json Object 
   */
  function getToken() {
    tokenSatus = "logIn";
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let logObject = {
      username: username,
      password: password
    };
    //  change into animation page 
    displayPage.innerHTML = animationTemplate;

    //  1st route to fetch token 
    return fetch(" http://www.mumstudents.org/api/login ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(logObject)
      })
      .then((responce) => {
        return responce.json();
      }).then((result) => {
        token = result.token;
        console.log(token);
      })
      .catch((error) => console.log(error));



  }
  /**
   * @return {string} string of animation 
   */
  function getAnimation() {
    // 2nd route to fetch animations list 
    return fetch("http://www.mumstudents.org/api/animation ", {
        method: "GET",
        headers: {"Authorization":`Bearer  ${{token}}`
        }
      })
      .then(result => console.log(result));


  }





}