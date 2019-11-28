window.onload = function(){
  let loginpage = `<h1> Please Login </h1><br>
      Username: <input type="text" value="mwp"></input> <br> 
      Password: <input type="text" value="123"></input> <br>
      <button type="button" id="loginBtn"> login </button>`
  document.querySelector("#outlet").innerHTML = loginpage;
}
