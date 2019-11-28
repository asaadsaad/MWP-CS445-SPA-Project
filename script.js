window.onload = function(){
//let token;

const login = `
<h1>Please Login</h1><br>
Username:<input placeholder="mwp" value="mwp"/><br/>
Password:<input placeholder="123" value="123"/><br/>
<button id="loginbtn">Login</button>
`
let loginTemplate = document.querySelector("#outlet");
loginTemplate.innerHTML = login;
let loginId = document.getElementById("loginbtn");
loginId.addEventListener("click", logToAnimationpage);

const animation = `
        <div id="address"> Welcome to SPA Animation</div>
        <textarea id="animation" rows="22" cols="22" style="font-size: 20px"></textarea><br><br>
        <button id="refresh">Refresh Animation</button>
        <button id="logout">Logout</button>        
        `
// let animationTemplate = document.querySelector("#outlet");
// loginTemplate.innerHTML = animation;

function logToAnimationpage() {
    loginTemplate.innerHTML = animation;
    logout();
    refresh();
}
// let logoutId = document.getElementById("logout");
// logoutId.addEventListener("click",logToLoginpage);
function logout() {
    document.getElementById("logout").addEventListener("click", logoutto)
    function logoutto() {
        loginTemplate.innerHTML = login;
    }
}
function refresh() {
    document.getElementById("refresh").addEventListener("click", refreshfunc)
    let textarea = document.getElementById("animation");
    function refreshfunc() {
        textarea.innerHTML = animFrames;

    }
}

function fetchToken() {
    fetch("http://mumstudents.org/api/login", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            username: "mwp",
            password: "123"
        })
    })
        .then(resp => resp.json())
        .then(data => {
            fetch("http://mumstudents.org/api/animation", {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${data.token}`
                }
            })
            .then(reps => reps.text())
            .then(data => {
                console.log(data);
                animFrames = data.split("=====");
                //console.log(animFrames);
            });
        });
}

fetchToken();


}