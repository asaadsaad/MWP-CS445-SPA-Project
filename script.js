window.onload = function(){
  let loginpage = `<h1> Please Login </h1><br>
      Username: <input type="text" id = "userName"  value="mwp"></input> <br> 
      Password: <input type="text" id = "userpass" value="123"></input> <br>
      <button type="button" id="loginBtn"> login </button>`
  document.querySelector("#outlet").innerHTML = loginpage;
  
  document.getElementById("loginBtn").addEventListener("click", login)

    function login() {

      let username = document.querySelector("#userName").value;
      let password = document.querySelector("#userpass").value;
      let login = document.querySelector("#loginBtn").value;
    

       let result= fetch('http://mumstudents.org/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "username":value, "password":value})
        })
            .then(response(response.json())
            .then(data =>({
                myObj = data

              })
          }
        }