"use strict";

window.onload = main;

function main() {
    let myUniqueToken, myLat, myLon, animDisplayArea, animationColl, animPlay;
    let myToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtd2EiLCJpc3N1ZWRBdCI6IjIwMTktMTEtMzAiLCJ1c2VybmFtZSI6Im13cCJ9.ooCKjj1SqIX7LjZ299ciAzzSX__vVTaqSC_s-K7NI72cO10AQCUmKztZxTbF4JkYmcc72Awr3KkqAM7ap-4gAA";
    let myGeoLocKey = "bQDwCHvfs2jJ3B1Fpc8QGyMAFGU4AxrW";
    let questMapU = `http://open.mapquestapi.com/geocoding/v1/reverse?key=${myGeoLocKey}&location=${myLat},${myLon}`;

    const logins = `<h2>Please Login</h2><br>
    Username: <input type="text" id="username" value="mwp"><br><br>
    Password: <input type="text" id="password" value="123"><br><br>
    <button id="lgin" >Login</button>`

    const animations = `<h3 id="mygeoloc"></h3>
    <textarea rows="30" cols="80" id="animationDisp"></textarea><br>
    <button type="button" id="refresh">Refresh Animation</button>
    <button type="button" id="logout">Logout</button>`

    // outlet declaration
    let out = document.querySelector('#outlet');

    // invoking the login user interface
    loggingUI();

    // loggingUI(): function loads the login page
    function loggingUI() {
        //get element from the DOM to build Login UI page
        out.innerHTML = logins;
        // get element from the DOM for login 
        let loggingBtn = document.querySelector("#lgin");

        //creates EventListener for the login button directs to the animation UI
        loggingBtn.addEventListener("click",accessingToken);
    } // end of loggingUI function



    //accessingToken
    async function accessingToken () {
        let resp = await fetch("http://mumstudents.org/api/login", {
            method: 'POST',
            headers: { "content-type": "application/json" },

            body: JSON.stringify({
                "username": "mwp",
                "password": "123"
            })
        });
        let jsonRes = await resp.json();
        myUniqueToken = jsonRes.token;
        let jsonStatus = jsonRes.jsonStatus;

        if (jsonStatus === true) {
            animationUI();
        }
    } // end of accessingToken function

    function animEvents() {
        // access location
        navigator.geolocation.getCurrentPosition(
            function (currPos) {
                myLon = currPos.coords.longitude;
                myLat = currPos.coords.latitude;
                locFetching();
                refrBtn = document.querySelector('#refresh');
                lOutBtn = document.querySelector('#logout');

                lOutBtn.addEventListener('click',
                    // loggingOut(): function redirects back to login UI
                    function () {
                        loggingUI();
                    });// end of logging Out function

                refrBtn.addEventListener('click',
                    // if success
                    function () {
                        clearInterval(animPlay)
                        animFetching();
                    });
            },
            // if something went wrong 
            function () {
                alert("CAN'T access ")
            });
    } // end of function 

    // animationUI(): function loads the animation page
    function animationUI() {
        out.innerHTML = animations;
        animEvents();
        animFetching();
    } // end of animationUI function

    // fetches animation 
    async function animFetching() {
        let jsonRes = await fetch('http://mumstudents.org/api/animation',
            {
                method: 'GET',
                headers: {
                    "content-type": "application/text",
                    Authorization: `Bearer ${myUniqueToken}`
                }
            });
        //let myRes 
        animationColl = await jsonRes.text();
        //animationColl = myRes;
        visualAnim();
    } // end of animFetching() function

    function visualAnim() {
        animDisplayArea = document.querySelector('#animationDisp');
        let animArray = animationColl.split("=====");
        animDisplayArea.innerHTML = animArray[0];
        let currentAnim = 0;
        let maxlength = animArray.length;
        animPlay = setInterval(() => {
            animDisplayArea.innerHTML = animArray[currentAnim];
            currentAnim++;
            if (currentAnim === maxlength) {
                currentAnim = 0;
            }
        }, 150);
    } // end of function visualAnim()

    // fetches users location
    //async 
    function locFetching() {
        let fetchLoc, getLoc, city, state, country;
        myGeoLoc = document.querySelector("#mygeoloc");
        fetchLoc = //await 
        fetch(questMapU,
            {
                method: 'GET',
                headers: { 'content-type': 'application/json', }
            });
        getLoc = //await 
        fetchLoc.json();
        city = getLoc.outcomes[0].fetchLoc[0].adminArea5;
        state = getLoc.outcomes[0].fetchLoc[0].adminArea3;
        country = getLoc.outcomes[0].fetchLoc[0].adminArea1;

        myGeoLoc.innerHTML = `welcome all from, ${city}, ${state}, ${country}`;
    } // end of locFetching() function

    //MyRouters(): function constructor creates two routes for default(LOGIN UI), & animation (ANIMATON UI)
    // let MyRouters = function (name, routers) {
    //     return ({ name: name, routers: routers });
    // };
    // let myRouts = new MyRouters("myRouts",
    //     [{ path: "/", name: "Login - Page" },
    //     { path: "/animation", name: "Animation - Page" }]);

    // let currPath = window.location.pathname;
    // if (currPath === "/") {
    //     out.innerHTML = logins;
    // } else if (currPath === "/animation") {
    //     out.innerHTML = animations;
    // }
} // end of main() function