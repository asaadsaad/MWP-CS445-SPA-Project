window.onload = SPA;

function SPA() {

    // select
    let outlet = document.querySelector("#outlet");
    let token;
    let animation, animationId;
    


    // login template

    let loginTemplate = `
    <h1>Please Login</h1>
    Username : <input type="text" id="username" placeholder="mwp" value="mwp"><br>
    Password : <input type="text" id="password" placeholder="123" value="123"><br>
    <button id="login">Login</button>
    `
    // animation template
    let animationTemplate = `<div id="location" style="font-size :20px">Welcome message from</div>
    <textarea id="display" row="40" cols="40" style="font-size:20px"></textarea><br>
    <button id="refresh" >Refresh Animation</button>
    <button id="logout">Logout</button>
    `


    // listneer

    //check
    let addPost = async function () {
        let username = document.querySelector("#username").value;
        let password = document.querySelector("#password").value;
        let res = await fetch('http://www.mumstudents.org/api/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        let response = await res.json();
        token = response.token;
        animationpage();
        getPost();
    }

    let getPost = async function () {
        let res1 = await fetch("http://www.mumstudents.org/api/animation", {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })

        let data = await res1.text();
        let array = data.split("=====\n")
        console.log(array)
        document.querySelector('#display').innerHTML= array;

    }

    function login() {
        outlet.innerHTML = loginTemplate;
    }
    login()
    document.querySelector("#login").addEventListener("click", addPost);

    function animationpage() {
        outlet.innerHTML = animationTemplate;
        document.querySelector("#logout").addEventListener("click", login);
        document.querySelector("#refresh").addEventListener("click", getPost)
    }


}