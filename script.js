let token;
let timeid;
let i = 0;

function SPA() {
    let animation = `<div id="adress">Welcome to SPA Animation</div>
<textarea name="" id="animation" cols="50" rows="20" style="font-size: 18px;"></textarea> <br>
<button id="refresh">Refresh Animation</button>
<button id="logout">Logout</button>`

    function getlogin() {
        
        let login = `<h2> Please log in </h2>
        user name: <input type="text" id="username" value="mwp"><br>
        Passwword: <input type="text" id="password" value="123"><br>
        <button id="button"> login </button>`
        document.getElementById("outlet").innerHTML = login;
        
    }
    getlogin();

    function getanimationpage() {

        document.getElementById("outlet").innerHTML = animation
        document.getElementById("logout").addEventListener("click", getlogin)
        document.getElementById("refresh").addEventListener("click", gettoken);
    }

    document.getElementById("button").addEventListener("click", getanimationpage)


    let gettoken = async function () {

        let result = await fetch("http://mumstudents.org/api/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sema)
            })
        let resp = await result.json()
        token = resp
        
        
        final();
        

    }




    let final = async function () {

        let anime = await fetch("http://mumstudents.org/api/animation",
            {
                headers: {
                    "Authorization": ` Bearer ${token.token}`
                }
            })
        let response = await anime.text()
        let y = response.split("=====\n")
        clearInterval(timeid);
        i = 0
       timeid= setInterval(function () {
            document.getElementById("animation").innerHTML = y[i]
            i++
            if (i === y.length) {
                i = 0
            }

        }, 200)



    }







}
SPA()





let sema = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value
}

