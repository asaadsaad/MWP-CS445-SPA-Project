//Code for the animation project

"use strict"
window.onload = function () {
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


    /**
     * EventListener for clicking on the back button
     */
    window.addEventListener('popstate', function (event) {
        if (event.state.page === 1) {
            clearInterval(moveAnimation)
            login();
        } else {
            clearInterval(moveAnimation)
            insideLogin();
        }
    })

    /**
     * Calling the login function when the window loads
     */
    login();



    /**
     * The login function holds all the DOM elements for the credential page
     */
    function login() {
        //Get the DOM Element to create Login Page
        let outlet = document.querySelector("#outlet");
        outlet.innerHTML = loginPage;
        history.pushState({
            page: 1
        }, "login", "?login")

        //Get the DOM Element for Login Page
        let loginButton = document.querySelector("#login");

        //Create EventListener for Login Page
        loginButton.addEventListener("click", getCred);

    }


    /**
     * Fetches the credential for the login from the API and if it is correct, calls the function that the animation page
     */
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
            insideLogin(); //Once the credential matches and status is true, Call the function that holds all the animation DOM
        }
    }


    /**
     * This function holds all the DOM elements for the animation page and calls 
     * the function geoLocation() that finds the location and another function 
     * getAnimation() that fetches the animation from the API
     */
    function insideLogin() {
        history.pushState({
            page: 2
        }, "animation", "?animation")
        outlet.innerHTML = animationPage;


        geoLocation() //Call the function that gets the geolocation and has the DOM Elements for animation Page
        getAnimation(); //Call the function to fetch the animation
    }

    /**
     * Function to get the longitude and latitude of the user
     */
    function geoLocation() {
        navigator.geolocation.getCurrentPosition(success, fail);

        /**
         * 
         * @param {object} position holds the longitude and latitude 
         */
        function success(position) {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            console.log(longitude);
            console.log(latitude);
            currentPosition(); //Call the fuction that fetches the mapquest API to get the position of user
            animEventList(); //Call the function that creates the animation page; has all the DOM elements for it
        }
        //Runs if the user clicks Deny
        function fail(msg) {
            alert(`${msg.code} ====> ${msg.message} `);
            outlet.innerHTML = "Sorry You need to accept the geolocation to see the animation";
        }

    }


    /**
     * Function that fetches the current position from the API
     */
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


    /**
     * Function that creates the DOM for the animation page and has the event listener
     */
    function animEventList() {
        //Get the DOM Elements once inside the animation page
        let geolocation = document.querySelector("#geolocation");
        let animation = document.querySelector("#animation");
        let refresh = document.querySelector("#refresh");
        let logout = document.querySelector("#logout");

        //Create an EvenListener once inside the animation page
        logout.addEventListener("click", logoutOfAnimation);
        refresh.addEventListener("click", clearLastAnimation);

    }

    /**
     * Function that makes the string we got from API act as an animation
     */
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

    /**
     * Function that clears the animation, so as we don't see the last animation when we get new animation
     */
    function clearLastAnimation() {
        clearInterval(moveAnimation)
        getAnimation(); //Function that fetches the animation from the API

    }


    /**
     * Function that logs out of the animation page and takes to the credential page
     */
    function logoutOfAnimation() {
        outlet.innerHTML = loginPage;
        token = null;
        login(); //The login function holds all the DOM elements for the credential page


    }



    /**
     * Function that fetches the animation from the API and calls 
     * movingAniamtion() that animates the string we got from the API
     */
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