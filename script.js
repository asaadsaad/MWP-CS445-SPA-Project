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
  let geoLocation = "test";
  let timerId;

  //let tokenSatus;
  const loginTemplate = `<div class="log-form">
    <h1 >Please Login</h1>
    <form>
    Username : <input type="text" value="mwp" id="username" /><br><br>
    Password : <input type="text"  value="123" id="password"/><br><br>
    <button type="button" class="btn" id="login">Login</button><br>
    </form>
  </div><!--end log form -->`;

  //animation template 
  const animationTemplate = `<div id="location"> welcome to SPA Animation</div>
  <textarea id="loding" rows="20" cols="50"></textarea><br>
  <button id="refresh" >Refresh Animation</button>
  <button id="logOut"> LogOut </button>`;


  //default template 
  displayPage.innerHTML = loginTemplate;

  // listeners to login 
  document.getElementById("login").addEventListener("click", loginPage);





  /**
   * Function to feach response token as Authentication 
   * @return {promises}  Json Object token 
   */
  async function loginPage() {

    // try cach block 
    try {
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      let logObject = {
        username: username,
        password: password
      };

      //  change into animation template 
      displayPage.innerHTML = animationTemplate;


      //  1st route to fetch token 
      let response = await fetch(" http://www.mumstudents.org/api/login ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(logObject)
      });
      // result  from the Json response 
      let result = await response.json();
      token = result.token;
      console.log(token);

      // start animation onlogin 
      getAnimation();

      //adding lisinner to refresh the page loding new animation each time 
      document.getElementById("refresh").addEventListener("click", _ => {
        if (timerId) clearInterval(timerId);
        getAnimation()
      });
      //throwing error message 
    } catch (error) {
      console.log(`error message ${error}`)
    }
  }




  /***
   * Function to fetching animation  
   * @return {string} string of animation 
   */
  async function getAnimation() {

    // 2nd rout to fetch animation string  
    try {
      let getAnimation = await fetch("http://www.mumstudents.org/api/animation", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // response with animation string 
      let animation = await getAnimation.text();

      // creating animation 
      let animationArray = animation.split("=====\n");
      let index = 0;
      timerId = setInterval(_ => {
        document.getElementById("loding").value = animationArray[index];
        index++;
        // looping the animation 
        if (index == animationArray.length) {
          index = 0;
        }
      }, 200);

      // adding lisinner into logout button 
      document.getElementById("logOut").addEventListener("click", _ => {
        displayPage.innerHTML = loginTemplate;
      });
      ///document.getElementById("refresh").addEventListener("click", _=>{ getAnimation()});

    } catch (e) {
      console.log("Error message" + e);
    }



  }

}