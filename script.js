//const div = document.getElementById('outlet')
const user = () => {
    const username = document.getElementById('username').value;
    console.log(username)
    const password = document.getElementById('password').value;
    console.log(password)
    fetch("https://cs445-project.herokuapp.com/api/login", {
        method: "POST",
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })

    })
        .then(res => res.json())
        .then(data => {
            if (data.status) {
                gameTemp();
            }
        })

}

window.onload = function loginTemp() {

    const logTemp = `<form><label for="task" style="width: 100%; text-align:center;">PLEASE LOGIN FIRST !</label></form><br/>
Username:<input id="username"><br/><br/>
    Password: <input id="password"><br/><br/>

    <button id="login" >LOG-IN</button>`
    const div = document.getElementById('outlet')
    div.innerHTML = logTemp;
    document.getElementById("login").addEventListener("click", user);

}


function gameTemp() {
    const animTemp = `
    <form><label for="task" style="width: 100%; text-align:center;">WELCOME ALL FROM "ADD LOCATION HERE"!</label></form>
    <textarea id="playground" cols=100 rows=50></textarea><br/><br/>

    <button id="refresh" >Refresh Animation</button>  
 <button id="logout" >Log-Out</button> `
    const div = document.getElementById('outlet')
    div.innerHTML = animTemp;
    document.getElementById("refresh").addEventListener("click", loginTemp());
    document.getElementById("logout").addEventListener("click", loginTemp());

}




