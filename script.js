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

     function displayAnimaTemplate() {
          let animationTemplate = `
     <div style="background-color:LightGray">
     <p >Welcome  to Fair Fild</p>
     <textarea  id="animationArea"></textarea> <br>
     <input type="button"  id="refreshAnimation" value="Refresh Animation">
     <input type="button" id="logoutBotton" value="Logout"  >
     </div>`
          document.getElementById("outlet").innerHTML = animationTemplate;
     }

     document.getElementById("login").addEventListener("click", displayAnimaTemplate);
}





