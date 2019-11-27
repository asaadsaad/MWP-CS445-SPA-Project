

const login = `
<h1>Please Login</h1><br>
Username:<input placeholder="mwp" value="mwp"/><br/>
Password:<input placeholder="123" value="123"/><br/>
<button id="loginbtn">Login</button>
`
let loginTemplate = document.querySelector("#outlet");
loginTemplate.innerHTML = login;
document.getElementById("loginbtn").addEventListener("click", logToAnimationpage)

const animation = `
<div id="address"> Welcome to SPA Animation</div>
<textarea id="animation" rows="25" cols="25" style="font-size: 20px"></textarea><br><br>
<button id="refresh">Refresh Animation</button>
<button id="logout">Logout</button>        
`
let animationTemplate = document.querySelector("#outlet");
loginTemplate.innerHTML = animation;

// function logToAnimationpage(){
//     loginTemplate.innerHTML = animation;

// }


fetch("http://mumstudents.org/api/login", {
method: "POST",
headers: {
    "content-type": "application/json"
},
body: JSON.stringify(
    {
    username: "mwp",
    password: "123"
            }
) 
})
.then(resp =>resp.json())
.then(console.log)
