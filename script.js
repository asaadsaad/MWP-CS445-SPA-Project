// your code here
const div = document.getElementById("outlet");

window.onload = function login() {

   let template1 = ` <h1>Please Login</h1>
                         Username<input id = "username" /></br>
                         Password<input id = "password"/></br>
                         <button id = "login">Login</button>`;
   div.innerHTML = template1;
   
  
   document.getElementById("login").onclick = refreshed;

   function refreshed() {
      let userName = document.getElementById("username").value;
      let password = document.getElementById("password").value;

      async function getToken() {
         const state = {
            username: userName, //map
            password: password  //123456
         }

         // console.log(userName);
         // console.log(password);
         const result = await fetch("https://cs445-project.herokuapp.com/api/login", {
            method: "POST",
            headers: { 'Accept': 'application/json', "content-type": "application/json" },
            body: JSON.stringify(state)


         })
         const data = await result.json();
         let token = data.token;
         console.log(token);               
         if (data.status) {
            animation();
         }
         async function animation() {
            let template2 = `<h2> welcome</h2>
                        <textarea id ="animation" rows = "6" cols = "40"></textarea></br>
                        <button id ="refresh">Refresh </button>
                        <button id ="logout">Logout</button>`;
            div.innerHTML = template2;
            document.getElementById("refresh").onclick = getToken;
            document.getElementById("logout").onclick = login;
         }
      }
      getToken();
   }
}
