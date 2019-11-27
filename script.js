/* eslint-disable require-jsdoc */
"use strict";

window.onload = function () {
  
  let output = document.querySelector("#outlet");
  let logInView = `
   <h1>Login Here</h1>
   Username:<input id="mwp" value="MWP"/><br>
   Password: <input id="123" value="123"/><br>
   <button id = "logIn">Loging</button> `;
   let Username= document.getElementById("#mwp");
   let Password=document.getElementById("#123");
   //About login view and the login function. 
  output.innerHTML = logInView;
  let logInElement = document.querySelector("#logIn");
  logInElement.addEventListener("click", logIn);

  //This variable is about the textarea where our animation is displayd
  let animationView = `
    <div id="status">Look At My Animation! WOW! </div>
    <textarea id="animation" rows="20" cols="40"style="font-size:10px"></textarea>
    <button id="refresh">Refresh Animation</button>
    <button id="logOut">Logout</button>`;
//logIn function takes as to the animation area
  function logIn() {
    alert("welcome! you are loged in to the animation page!");
    output.innerHTML = animationView;
    let logOutElement = document.getElementById("logOut");

    logOutElement.addEventListener("click", logOut);
  }
//loOut function can bringback to the login page
  function logOut() {
    alert("goodbye!you are going to loge out!");
    output.innerHTML = logInView;
  }
};