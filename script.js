"use strict";
/* eslint-disable */

window.onload = function() {

    let tokenJson, isLoggedIn;
    const myGeolocationKey = `ogEq57I3kM3XFZ4Nts09QAAt3cp242Hs`;
    let outletDiv = document.querySelector("#outlet");

    const loginTemplate = `
        <div id=loginDiv>
            <h1>Please login</h1>
            <br>
            Username <input type="text" name="username">
            <br>
            Password <input type="text" name="password">
            <br>
            <button id="login_button">Login</button>
        </div>
    `;

    const animationTemplate = `
        <div id=animationDiv>
            <h1 id="locationOutput"></h1>
            <br>
            <textarea id="animation_area" cols="100" rows="30"></textarea>
            <br>
            <button id="refresh_animation">Refresh Animation</button>
            <button id="logout">Logout</button>
        </div>
    `;





    //first change to div
    outletDiv.innerHTML = loginTemplate;

    document.querySelector("#login_button").addEventListener("click", loginFunction);

    //login function
    async function loginFunction() {

        outletDiv.innerHTML = animationTemplate;
        const response = await fetch(`http://www.mumstudents.org/api/login`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                "username": "mwp",
                "password": "123"
            })
        })

        const result = await response.json();
        tokenJson = result;
        getUserLocation();
        //showAnimation();
        isLoggedIn = true;

    }

    //get user location
    function getUserLocation() {
        navigator.geolocation.getCurrentPosition(success, fail);

        async function success(position) {

            const response = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${myGeolocationKey}&location=${position.coords.latitude},${position.coords.longitude}`);
            const responseJson = await response.json();
            document.querySelector("#locationOutput").innerHTML = `Welcome all from ${responseJson.results[0].locations[0].adminArea5}, ${responseJson.results[0].locations[0].adminArea3}`;
        };

        async function fail(err) {
            console.log(err.code + err.message);
        }
    }



    //get animation
    async function getAnimation() {

        const response = await fetch("http://mumstudents.org/api/animation", {
            method: "GET",
            headers: { "Authorization": `Bearer ${tokenJson.token}` },
        });

        let responseText = await response.text();
        responseText = responseText.split("=====\n");

        //throwing in the towel...

    }

}