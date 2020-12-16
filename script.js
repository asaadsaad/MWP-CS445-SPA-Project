"use strict";
/* eslint-disable */

window.onload = application;

function application() {
    let geolocationAPIKey = "CpEr8l1OPsCvhix37gowGQw7iq8JVWJS";
    let header, text, animationFrame, timerId, token, Latitude, Longitude


    // The Login Template
    let loginPage = ` 
    <h1> Please login </h1>
    UserName: <input id="UserName" type="text" value= "mwp"></br>
    PassWord: <input id="password" type="text"value= "123"></br>
    <button type="button" id="login">Login</button>`;

    // The Animation Template
    let animationPage = `
    <h1 id="locationstatus"></h1>
    <textarea id="textarea" rows="20" cols="50"></textarea></br>
    <button type="button" id="refresh">Refresh Animation</button>
    <button type="button" id="logout">Logout</button>`;


    // loading the login template into the DOM and pushing a new state to the history API when the application starts 
    let div = document.querySelector("#outlet");
    div.innerHTML = loginPage;
    history.pushState({ page: 1 }, "login", "?/login ");

    // Adding event listener to the login button,executing the loginFunc function and pushing a new state to the history API when login button is clicked.
    let login = document.querySelector("#login")
    login.addEventListener("click", loginFunc);
    login.addEventListener("click", () => history.pushState({ page: 2 }, "animation", "?/animation "));


    // This function will load the animation template into the DOM,
    // send an Ajax call to the server to authenticate the user,
    // Execute the addEvent function and 
    // Invoke the geoloction Api 
    function loginFunc() {
        div.innerHTML = animationPage;
        authenticateUserToken();
        addEvent();
        navigator.geolocation.getCurrentPosition(Accept, reject);

    };


    // This function will add some elements to the DOM,
    // Add event listener to the refersh_animation and logout button
    function addEvent() {
        header = document.querySelector("#locationstatus")
        text = document.querySelector("#textarea");
        let Refresh_Animation = document.querySelector("#refresh");
        Refresh_Animation.addEventListener("click", cleartime);
        let logout = document.querySelector("#logout");
        logout.addEventListener("click", logoutFunc);
        status = document.querySelector("#status");
    }


    // This function will load the login template into the DOM, 
    // Referesh the window 
    function logoutFunc() {
        div.innerHTML = loginPage;
        window.location.reload();
    };


    // send an Ajax call to the server to authenticate the user,
    // Execute the fetchAnimation function if the authentication status is true 
    async function authenticateUserToken() {

        const result = await fetch('https://cs445-project.herokuapp.com/api/login',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: "map", password: "123456" })
            });

        // console.log(result);
        const myJson = await result.json()
        // console.log(myJson);
        token = myJson.token;
        // console.log(token);
        const status = myJson.status;
        // console.log(status);
        if (status === true) {
            fetchAnimation();
        }
    }


    // send an Ajax call to the server to fetch all animation frames from the server
    // Invoke the StartAnimation function
    async function fetchAnimation() {
        const response = await fetch('https://cs445-project.herokuapp.com/api/animation',
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/text', Authorization: `Bearer ${token}` },
            });
        // console.log(response);
        const animationResult = await response.text();
        // console.log(animationResult);
        animationFrame = animationResult;

        StartAnimation();
    };

    // This function will display one frame at a time on the text area.
    function StartAnimation() {
        let animationArray = animationFrame.split("=====\n");
        text.innerHTML = animationArray[0]
        let currentFrame = 0;
        let maxFrames = animationArray.length;

        timerId = setInterval(() => {
            text.innerHTML = animationArray[currentFrame];
            currentFrame++;
            if (currentFrame === maxFrames) {
                currentFrame = 0;
            }
        }, 200);
    };

    // This function will clear the timerId
    // Invoke the FetchAnimation function when the refresh animation button is clicked
    function cleartime() {
        clearInterval(timerId)
        fetchAnimation();
    };


    // This is the callBack function for the geolocation Api which invoked when Alow button is clicked on the browser 
    // Will invoke the fechLocation function 
    // will set the user current coordinates;
    function Accept(position) {
        Longitude = position.coords.longitude;
        Latitude = position.coords.latitude;
        fetchLocation()
    };

    // This is the callBack function for the geolocation Api which invoked when Block button is clicked on the browser 
    // Will Alert the provided message 
    function reject() {
        alert(" Sorry,we are not able to show your location, You rejected to give permission to access your location ")
    };

    // this function will send an Ajax call to the mapquestapi, which accept the user current coordinates .
    async function fetchLocation() {

        const location = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${geolocationAPIKey}&location=${Latitude},${Longitude}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
        // console.log(location);
        const locationResult = await location.json()
        // console.log(locationResult);
        let arr = locationResult.results[0]
        // console.log(arr);
        let locationObject = arr.locations[0]
        // console.log(locationObject);
        let country = (locationObject.adminArea1)
        let city = (locationObject.adminArea5)
        let state = (locationObject.adminArea3)

        header.innerHTML = `Well Come From ${city} ,${state} ,${country} `

    };


}