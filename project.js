"use strict"

let navigatorKey = "KjP5zwaRx5DO6MDhmIMI9fMtKsksKA1W";
let longitude;
let latitude;
let token;
let allAnimation;
let moveAnimation;


//Push the HTML code to the HTML Page
let loginPage = `<h1>Please Login</h1><br>
    Username: <input type="text" id="username" value="mwp"><br>
    Password: <input type="text" id="password" value="123"><br>
    <input type="button" id="login" value="Login">`

let animationPage = `<h1>Welcome All</h1>
    <h2 id="geolocation"></h2>
    <textarea rows="40" cols="100" id="animation"></textarea><br>
    <button type="button" id="refresh">Refresh Animation</button>
    <button type="button" id="logout">Logout</button>`


/*window.addEventListener('popstate', function (event) {
    if (event.state.page === 1) {
        clearInterval(moveAnimation)
        login();
    } else {
        clearInterval(moveAnimation)
        insideLogin();
    }
})*/


window.onload = login;

function login() {

    let outlet = document.querySelector("#outlet");
    outlet.innerHTML = loginPage;

    history.pushState({
        page: 1
    }, "login", "?login")


    let loginButton = document.querySelector("#login");


    loginButton.addEventListener("click", getCred);

}


async function getCred() {
    const result = await fetch("https://cs445-project.herokuapp.com/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": "map",
            "password": "123456"
        })
    })

    const myJson = await result.json()
    token = myJson.token;
    const status = myJson.status;

    if (status === true) {
        insideLogin(); 
    }
}


function insideLogin() {
    history.pushState({
        page: 2
    }, "animation", "?animation")
    outlet.innerHTML = animationPage;



    geoLocation() 
    getAnimation();
}

function geoLocation() {
    navigator.geolocation.getCurrentPosition(success, fail);


    function success(position) {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;
        currentPosition();
        animEventList();
    }

    function fail(msg) {
        alert(`${msg.code} ====> ${msg.message} `);
        let info = "Sorry You need to accept the geolocation to see the animation"
        outlet.innerHTML = "Sorry You need to accept the geolocation to see the animation";


    }

}


async function currentPosition() {
    const result = await fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${navigatorKey}&location=${latitude},${longitude}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    const myPosition = await result.json();
    console.log(myPosition)
    const city = myPosition.results[0].locations[0].adminArea5;
    const state = myPosition.results[0].locations[0].adminArea3;
    const country = myPosition.results[0].locations[0].adminArea1;

    geolocation.innerHTML = `Thanks for accessing from ${city}, ${state} ${country}`;


}


function animEventList() {

    let geolocation = document.querySelector("#geolocation");
    let animation = document.querySelector("#animation");
    let refresh = document.querySelector("#refresh");
    let logout = document.querySelector("#logout");


    logout.addEventListener("click", logoutOfAnimation);
    refresh.addEventListener("click", clearLastAnimation);

}


function movingAnimation() {
    const animArray = allAnimation.split("=====\n");
    animation.innerHTML = animArray[0];
    let currentAnim = 0;
    let maxlength = animArray.length;
    moveAnimation = setInterval(() => {
        animation.innerHTML = animArray[currentAnim];
        currentAnim++;
        if (currentAnim === maxlength) {
            currentAnim = 0;
        }
    }, 3000);
}


function clearLastAnimation() {
    clearInterval(moveAnimation)
    getAnimation();

}


function logoutOfAnimation() {
    outlet.innerHTML = loginPage;

    token = null;
    login();


}


async function getAnimation() {
    const result = await fetch("https://cs445-project.herokuapp.com/api/animation", {
        method: "GET",
        headers: {
            "Content-Type": "application/text",
            Authorization: `Bearer ${token}`

        }


    })
    allAnimation = await result.text();
    movingAnimation();
}