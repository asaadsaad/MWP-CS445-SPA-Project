



function application() {
    let login = `<h2> Please log in </h2>
        user name: <input type="text" id="username" value="mwp"><br>
        Passwword: <input type="text" id="password" value="123"><br>
        <button id="button"> login </button>`
    document.getElementById("outlet").innerHTML = login;

}

application();

let sema = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value
}
//console.log(sema)

function gettoken() {
    let token;
    return fetch("http://mumstudents.org/api/login ",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sema)
        })
}


gettoken().then((response) => { return response.json() })
    .then((obj) => {
        token = obj;
        console.log(token)
    });



function getanimationpage() {
    let animation = `<div id="adress">Welcome to SPA Animation</div>
<textarea name="" id="animation" cols="50" rows="20" style="font-size: 18px;"></textarea> <br>
<button id="refresh">Refresh Animation</button>
<button id="logout">Logout</button>`
    document.getElementById("outlet").innerHTML = animation

}


document.getElementById("button").addEventListener("click", getanimationpage)
document.getElementById("button").addEventListener("click",)





