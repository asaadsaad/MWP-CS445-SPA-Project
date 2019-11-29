"use strict";

window.onload = main;

function main() {
    const myGeoLocKey = "bQDwCHvfs2jJ3B1Fpc8QGyMAFGU4AxrW";
    let status = document.querySelector("#geoloc");
    let myLat, myLon;
    let questMapU = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${myGeoLocKey}&location=${myLat},${myLon}`;
    let animationFrame, tokenAnim, timers;
    let isRefre = false;
    // outlet declaration
    const out = document.querySelector('#outlet');
    // store token url address
    const tokUrlAddress = `http://www.mumstudents.org/api/login`;

    const logins = `<h1>Please Login</h1><br>
    Username: <input type="text" id="username" value="mwp"><br><br>
    Password: <input type="text" id="password" value="123"><br><br>
    <button type="button" id="lgin" >Login</button>`

    const animations = `
    <h2>welcome</h2>
    <h3 id="geoloc"></h3>
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
        // access location
        navigator.geolocation.getCurrentPosition(function (currPos) {
            myLon = currPos.coords.longitude;
            myLat = currPos.coords.latitude;
            locFetching();

        }, function (message) {
            alert("CAN'T access your location, It is Blocked!!!")
        });
        // 
        tokenFunction();
        //creates EventListener for the login button directs to the animation UI page
        loggingBtn.addEventListener("click", animationUI);
        animFetching();
        isRefre = true;

        // pushes a new state to history
        history.pushState("loggingUI", "Login History", "/index.html");
    } // end of loggingUI function

    // fetches current location
    async function locFetching() {
        let fetchLoc, getLoc, city, state, country;
        
        fetchLoc = await fetch(questMapU,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

        getLoc = await fetchLoc.json()

        city = getLoc.outcomes[0].fetchLoc[0].adminArea5;
        state = getLoc.outcomes[0].fetchLoc[0].adminArea3;
        country = getLoc.outcomes[0].fetchLoc[0].adminArea1;

        status.innerHTML = `all from, ${city}, ${state}, ${country}`
    }
    // fetches animation 
    async function animFetching() {
        let jsonRes;
        const response = await fetch('http://mumstudents.org/api/animation',
            {
                method: 'GET',
                headers: {
                    "content-type": "application/text",
                    Authorization: `Bearer ${tokenAnim}`
                }
            });

        //jsonRes = await response.json()
        //animationFrame = jsonRes.animationFrame;
        
    }

    // animationUI(): function loads the animation page
    function animationUI() {
        let animDisplayArea, refrBtn, lOutBtn;

        out.innerHTML = animations;
        animDisplayArea = document.querySelector('#animationDisp');
        refrBtn = document.querySelector('#refresh');
        refrBtn.addEventListener('click',
            function () {
                clearInterval(timers)
                fetchAnimation()
            }
        );
        lOutBtn = document.querySelector('#logout');
        lOutBtn.addEventListener('click', loggingOut);

        // pushes a new state to history
        history.pushState("animationUI", "Animation History", "/index.html");

        // invoking the tokenFunction function
        tokenFunction();
    } // end of animationUI function

    // tokenFunction(): function fetches the given URL token
    async function tokenFunction() {
        let resp, jsonRes, status;
        resp = await fetch('http://mumstudents.org/api/login', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            // converts a js object to string
            body: JSON.stringify({
                "username": "mwp",
                "password": "123"
            })
        })
        jsonRes = await resp.json();
        tokenAnim = jsonRes.tokenAnim;
        status = jsonRes.status;

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