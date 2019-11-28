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
     </form>`;

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
  

  }