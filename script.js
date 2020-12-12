"use strict";
window.onload = main;
function main() {
    let logins, animations, out, loggingBtn, myUniqueToken, myGeoLocKey, myGeoLoc, myLat, myLon, animFetching, animDisplayArea, animPlay, animArray;
    
    logins = `<h2>Please Login</h2><br>
    <link href="mycss.css" rel="stylesheet" type="text/css">
    Username: <input type="text" id="username" value="mwp"><br><br>
    Password: <input type="text" id="password" value="123"><br><br>
    <input type="button" id="lgin" value="Login"></input>`;

    animations = `<h3 id="mygeoloc"></h3>
    <link href="mycss.css" rel="stylesheet" type="text/css">
    <textarea rows="30" cols="80" id="animationDisp"></textarea><br>
    <input type="button" id="refresh" value="Refresh Animation"></input>
    <input type="button" id="logout" value="Logout"></input>`;
    history.pushState("LoginPage", "/login", "?login");
    
    out = document.querySelector('#outlet');
    out.innerHTML = logins;
    loggingBtn = document.querySelector("#lgin");
    myGeoLocKey = "bQDwCHvfs2jJ3B1Fpc8QGyMAFGU4AxrW";

    /** 
     * Creates EventListener for the login button do the following operations
     * ======================================================================
     * Directs to the animation UI
     * Accesses user's creditential
     * User's current location
     * Fetches Animation from given address
     * 
    */
    loggingBtn.addEventListener("click", function loggingUI() {
        let refrBtn, lOutBtn;
        history.pushState("AnimationPage", "/animation", "?animation");
        out.innerHTML = animations;
        accessUserLoc();
        accessingToken();

        animDisplayArea = document.querySelector('#animationDisp');
        refrBtn = document.querySelector('#refresh');

        refrBtn.addEventListener('click',
            // fetches animation 
            animFetching = function () {
                fetch('http://mumstudents.org/api/animation',
                    {
                        method: 'GET',
                        headers: {
                            "content-type": "application/text",
                            Authorization: `Bearer ${myUniqueToken}`
                        }
                    }).then((respo) => respo.text())
                    .then(d => {
                        animArray = d.split("=====\n");

                        if (animPlay) {
                            clearInterval(animPlay)
                        }
                        visualAnim();
                    });
            } // end of animFetching() function
        );

        lOutBtn = document.querySelector('#logout');

        lOutBtn.addEventListener('click', function () {
            history.pushState("LoginPage", "/login", "?login")
            outlet.innerHTML = logins;
            loggingBtn.addEventListener("click", loggingUI);
            clearInterval(animPlay)
        });
    }); // end of login button OPERATION

    // access users location
    function accessUserLoc() {
        navigator.geolocation.getCurrentPosition(
            function (currPos) {
                myLon = currPos.coords.longitude;
                myLat = currPos.coords.latitude;
                myGeoLoc = document.querySelector("#mygeoloc");
                // fetch location
                locFetching();
            });
    }

    // accessingToken(): send request, fetches creditentials
    function accessingToken() {
        fetch("http://mumstudents.org/api/login", {
            method: 'POST',
            headers: { "content-type": "application/json", },

            body: JSON.stringify({
                "username": "mwp",
                "password": "123"
            })
        }).then((res) => res.json())
            .then(d => {
                myUniqueToken = d.token;
                animFetching();
            });
    } // end of function accessingToken() 

    // locFetching(): send request, fetches location
    async function locFetching() {
        let questMapU, fRes, current, city, state, country;

        questMapU = `http://open.mapquestapi.com/geocoding/v1/reverse?key=${myGeoLocKey}&location=${myLat},${myLon}`;
        fRes = await fetch(questMapU,
            {
                method: 'GET',
                headers: { 'content-type': 'application/json', }
            })
        current = await fRes.json();
        city = current.results[0].locations[0].adminArea5;
        state = current.results[0].locations[0].adminArea3;
        country = current.results[0].locations[0].adminArea1;
        myGeoLoc.innerHTML = `WELCOME all from ${city}, ${state}, ${country}`;
    } // end of function locFetching() 

    // visualAnim(): displays animation based on the given time interval
    function visualAnim() {
        let currentAnim = 0;
        animPlay = setInterval(() => {
            animDisplayArea.innerHTML = animArray[currentAnim];
            currentAnim++;
            if (currentAnim === animArray.length) {
                currentAnim = 0;
            }
        }, 300);
    } // end of function visualAnim()
}; // end of main() function