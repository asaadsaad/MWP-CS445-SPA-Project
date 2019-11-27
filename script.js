//Code for the animation project

"use strict"
window.onload = function () {
    let isLogin = false;
    let navigatorKey = "BwkHCDaltXvuMGpJSCng2fxGy3uLjEfZ";
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


    //Call the login function
    login();



    //function to login to the animation
    function login() {
        //Get the DOM Element to create Login Page
        let outlet = document.querySelector("#outlet");
        outlet.innerHTML = loginPage;
        history.pushState("myLogin", "login", "?login")

        //Get the DOM Element for Login Page
        let loginButton = document.querySelector("#login");
        let username = document.querySelector("#username");
        let password = document.querySelector("#password");

        //Create EventListener for Login Page
        loginButton.addEventListener("click", getCred);

    }

    //Function to get the animation Page and the geolocation
    function animEventList() {
        //Get the geolocation
        const location = navigator.geolocation.getCurrentPosition(success, fail);


        function success(position) {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            currentPosition();
            let geolocation = document.querySelector("#geolocation");
            let animation = document.querySelector("#animation");
            let refresh = document.querySelector("#refresh");
            let logout = document.querySelector("#logout");

            //Create an EvenListener once inside the animation page
            //refresh.addEventListener("click", getNewAnimation);
            logout.addEventListener("click", logoutOfAnimation);
            refresh.addEventListener("click", clearLastAnimation);
        }

        function fail(msg) {
            alert(`${msg.code} ====> ${msg.message} `);
        }




        //Get the DOM Elements once inside the animation page


    }


    //Functions for the EventListenter

    //To login
    function insideLogin() {
        history.pushState("myAnimation", "animation", "?animation")
        outlet.innerHTML = animationPage;
        isLogin = true;

        animEventList()
        getAnimation();
    }
    //Function for making the string animate
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
        }, 200);
    }

    //Clear the last animation
    function clearLastAnimation() {
        clearInterval(moveAnimation)
        getAnimation();

    }





    //To logout
    function logoutOfAnimation() {
        if (isLogin) {
            outlet.innerHTML = loginPage;
            isLogin = false;
            login();

        }
    }

    async function getCred() {
        const result = await fetch("http://www.mumstudents.org/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": "mwp",
                "password": "123"
            })
        })

        const myJson = await result.json()
        token = myJson.token;
        const status = myJson.status;

        if (status === true) {
            insideLogin();
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
        const city = myPosition.results[0].locations[0].adminArea5;
        const state = myPosition.results[0].locations[0].adminArea3;
        const country = myPosition.results[0].locations[0].adminArea1;
        geolocation.innerHTML = `Thanks for accessing from ${city}, ${state} ${country}`;

    }

    async function getAnimation() {
        const result = await fetch(`http://mumstudents.org/api/animation`, {
            method: "GET",
            headers: {
                "Content-Type": "application/text",
                Authorization: `Bearer ${token}`

            }


        })
        allAnimation = await result.text();
        movingAnimation();


    }


}