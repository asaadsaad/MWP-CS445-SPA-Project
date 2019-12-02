  window.onload = function() {
    let token = null,
    animation = null,
    userLatitude = 0,
    userLongitude = 0,
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
     </form>`,
     
    animationPage = `<h3 id="locationTag">Location will be here</h3>
      <textarea id="animationArea" cols="50" rows="20"></textarea>
      <br />
      <button id="loadAnimationBtn">load animation</button>
      <button id="logOutBtn">log out</button>
      `;
      let animationInterval = null;
      document.getElementById("outlet").innerHTML = loginPage;
      document.getElementById("myLoginForm").onsubmit = async function(event) {
      event.preventDefault();

      let userName = document.querySelector("#userName").value;
      let userPassword = document.querySelector("#userPassword").value;
      let restoken = await getToken("http://mumstudents.org/api/login", {

        username: userName,
        password: userPassword

      });

      token = restoken.token;
      console.log(token);

      try {
        animation = await getAnimations("http://mumstudents.org/api/animation");
        console.log(animation);
      } catch (err) {
        console.log(err);
      }
      
    };

    async function getToken(url = "", data = {}) {
      
      const response = await fetch(url, {
        method: "POST", 
        mode: "cors", 
        cache: "no-cache", 
        credentials: "same-origin", 
        headers: {
          "Content-Type": "application/json"
          
        },
        redirect: "follow", 
        referrer: "no-referrer", 
        body: JSON.stringify(data) 
      });
      return await response.json(); 
    }


    async function getAnimations(url = "") {
     
      const response = await fetch(url, {
        headers: new Headers({
          Accept: "application/json",
          Authorization: "Bearer " + token
        })
      });
      return await response.text(); 
    }
    function loadAnimationWithInterval() {
      let animationArea = document.getElementById("animationArea");
      let animationLength = animationArr.length;
      let counter = 0;
      animationInterval = setInterval(() => {
        if (animationLength > 0 && counter < animationLength) {
          animationArea.innerHTML = animationArr[counter];
          counter++;
        } else {
          counter = 0;
        }
      }, 200);
    }

    
    
  }

