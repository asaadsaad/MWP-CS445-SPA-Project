"use strict";

window.onload = main;

function main() {
    // outlet declaration
    const out = document.querySelector('#outlet');
    // store token url address
    const tokUrlAddress = `http://www.mumstudents.org/api/login`;

    const logins = `<h1>Please Login</h1><br>
    Username: <input type="text" id="username" value="mwp"><br><br>
    Password: <input type="text" id="password" value="123"><br><br>
    <button type="button" id="lgin" >Login</button>`

    const animations = `<h1>Welcome all from</h1>
    <h2 id="geoloc"></h2>
    <textarea rows="30" cols="80" id="animationDisp"></textarea><br>
    <button type="button" id="refresh">Refresh Animation</button>
    <button type="button" id="logout">Logout</button>`

    // invoking the login user interface
    loggingUI();

    // loggingUI(): function loads the login page
    function loggingUI() {
        //get element from the DOM to build Login UI page
        out.innerHTML = logins;
        // get element from the DOM for login 
        let loggingBtn = document.querySelector("#lgin");
        //creates EventListener for the login button directs to the animation UI page
        loggingBtn.addEventListener("click", animationUI);
        // pushes a new state to history
        history.pushState("loggingUI", "Login History", "/index.html");
    } // end of loggingUI function

    // animationUI(): function loads the animation page
    function animationUI() {
        out.innerHTML = animations;
        let animDisplayArea = document.querySelector('#animationDisp');
        let refrBtn = document.querySelector('#refresh');
        let lOutBtn = document.querySelector('#logout');
        lOutBtn.addEventListener('click', loggingOut);

        // pushes a new state to history
        history.pushState("animationUI", "Animation History", "/index.html");

        // invoking the tokenFunction function
        tokenFunction();
    } // end of animationUI function

    // tokenFunction(): function fetches the given URL token
    function tokenFunction() {
        fetch(tokUrlAddress, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            // converts a JavaScript object into string
            body: JSON.stringify({
                "username": "mwp",
                "password": "123"
            })
        }).then(response => response.json()).then(d => {
            let tokenAnim = d.token;
            console.log(tokenAnim);
        });
    } // end of tokenFunction function

    // loggingOut(): function redirects back to logging
    function loggingOut() {
        // invoking loggingUI() function
        loggingUI();
        // pushes a new state to history
        history.pushState("loggingOut", "loggingOut History", "/index.html");
    } // end of loggingOut function

    // MyRouters(): function constructor creates two routes for default(LOGIN UI), & animation (ANIMATON UI)
    let MyRouters = function (name, routers) {
        return ({ name: name, routers: routers });
    };
    let myRouts = new MyRouters("myRouts",
        [{ path: "/", name: "Login - Page" },
        { path: "/animation", name: "Animation - Page" }]);

    let currPath = window.location.pathname;
    if (currPath === "/") {
        out.innerHTML = logins;
    } else if (currPath === "/animation") {
        out.innerHTML = animations;
    }
}