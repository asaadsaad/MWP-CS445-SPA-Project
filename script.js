// your code here
window.onload = function () {

     let loginTemplate = `
     <div >
     <p style="font-size: 30px"> <b> Login Here </p>
     
     User Name: <input  id="username" type="text"  placeholder="tahir" value="tahir"> <br>
     Password: <input id="password" type="password"  placeholder="123456" value="123456"> <br><br>
     <input  id="login" type="button" value="Login"> 
     </div>`

     document.getElementById("outlet").innerHTML = loginTemplate;

     let animationTemplate = `
      <div id="animationPage">
          <p id="welcomming">Welcome  to Fair Fild</p>

          <div id="animationArea">
          <textarea disabled id="animationTextArea"></textarea> <br>
          <input type="button"  id="refreshAnimation" value="Refresh Animation">
          <input type="button" id="logoutBotton" value="Logout"  >
          </div>
     </div>`

     function displayAnimaTemplate() {

          document.getElementById("outlet").innerHTML = animationTemplate;
         
          fetchData()

     }

     document.getElementById("login").addEventListener("click", displayAnimaTemplate);


     let token;
     async function fetchData() {
          const response = await fetch("https://cs445-project.herokuapp.com/api/login", {
               method: 'POST',
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                    username: 'map',
                    password: '123456'
               })
          })
          const respondBody = await response.json();
          token = respondBody.token;

          document.getElementById("animationTextArea").innerHTML = token;
     } 
}