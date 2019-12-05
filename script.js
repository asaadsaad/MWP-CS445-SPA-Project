'use strict';
//window.onload = function project() {

    let token, long, lati, timerId, userlocation, loginId, animFrames, username, password
    let keys = "tvXbGrqGqLqjaZ0RV8Bm1Mug02ScMW1T";

    const login = `
        <h1>Please Login</h1><br>
        Username:<input placeholder="mwp" value="mwp" id="username"/><br/>
        Password:<input placeholder="123" value="123" id="password"/><br/>
        <button id="loginbtn">Login</button>`;

    let loginTemplate = document.querySelector("#outlet");
    /**Invoking the login function to load the login html template and the get location function
     * to get the location of the user.
     */
    LoginFunc();
    getLocation();

    /**The Login functionality that will load the login html template when first it is launched.
     * event listener is attached to the login butoon which will redirect us to the animation html template
     * if the username and passsword is matched.
     * history API will push the html page we visited.
     */
    function LoginFunc() {
        clearInterval(timerId);
        loginTemplate.innerHTML = login;
        loginId = document.getElementById("loginbtn");
        loginId.addEventListener("click", logToAnimationpage);
        history.pushState({ page: login }, null, "?login")
        window.addEventListener("popstate", function (e) {
            if (e.state.page === login) {
                LoginFunc()
            }
        })
    }

    const animation = `
        <div id="address" style="font-size:25px" style = "font-weight: bold" > Welcome to SPA Animation</div>
        <textarea id="animation" rows="23" cols="50" style="font-size: 20px"></textarea><br><br>
        <button id="refresh">Refresh Animation</button>
        <button id="logout">Logout</button>        
        `
    /**Function enable us to load the animation html page.
     * Checks whether the user have proper credentials to login.
     *  will have two event listeners for logout and refresh buttons. 
     * the history API will push the visited animation page
     */
    function logToAnimationpage() {
        username = document.getElementById("username").value;
        password = document.getElementById("password").value;
        if (username === "mwp" && password === "123") {
            history.pushState({ page: animation }, null, "?animation")
            clearInterval(timerId);
            loginTemplate.innerHTML = animation;
            fetchAddress();
            document.getElementById("logout").addEventListener("click", logout);
            document.getElementById("refresh").addEventListener("click", refresh);
            fetchToken();
        } else {
            alert("Incorrect username and password")
        }
    }
    /**
     * logout functionality
     * It will have event listener for the login button, so as the user can login immediately without 
     * reloading the page.
     * everytime we have to clearInterval so as new animation frame will be fetched form the server 
     * for each login
     */
    function logout() {

        loginTemplate.innerHTML = login;
        let loginId = document.getElementById("loginbtn");
        loginId.addEventListener("click", logToAnimationpage);
        clearInterval(timerId);
    }
    /**
     * The refresh functionality, every time when the user click the refresh button, we clear the timeInterval
     * and fetch new animation frames.   
     */
    function refresh() {
        clearInterval(timerId);
        fetchAnim();
    }
    /**
     * The fetchToken functionality will return the fetched token from the server, 
     * then change the token to json file and store it in global variable.  
     */
    function fetchToken() {
        fetch("http://mumstudents.org/api/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username: "mwp",
                password: "123"
            })
        })
            .then(resp => resp.json())
            .then(data => {
                token = data.token;
                fetchAnim()
            })
    }
    /**
     * The fetchAnimation functionality will return animation frames fetched form the server
     * if the passed token is correct. 
     * The fetched animation frame should be splitted to make an array. 
     * Display the splitted array one by one with certain time interval to the div 
     * makes them look like animation play for human eye. Keep displaying again and again by resetting the 
     * time until the user performs another operation.  
     *  
     */
    function fetchAnim() {
        fetch("http://mumstudents.org/api/animation", {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(reps => reps.text())
            .then(data => {

                animFrames = data.split("=====\n");
                let count = 0;

                timerId = setInterval(function () {
                    document.getElementById("animation").innerHTML = animFrames[count];
                    count++;
                    if (count === animFrames.length) {
                        count = 0;
                    }
                }, 200)
            });
    }
    /**
     * Navigator function to get the logitude and latitude of the user location while login in. 
     * It returns the latitude and longitude if not certain text message. 
     */
    function getLocation() {
        navigator.geolocation.getCurrentPosition(success, fail);
        function success(position) {
            long = position.coords.longitude;
            lati = position.coords.latitude;
        }
        function fail(msg) {
            console.log("Welcome Anonymous");
        }
    }
    /**
     * The fetch address function returns object containing the user address and then we will select
     * which one to display based on our preference.  
     */
    function fetchAddress() {
        fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${keys}&location=${lati},${long}`)
            .then(data => data.json())
            .then(data => {
                let city = data.results[0].locations[0].adminArea5;
                let state = data.results[0].locations[0].adminArea3;
                let country = data.results[0].locations[0].adminArea1;
                userlocation = `Welcome all from ${city},${state},${country}!`;
                document.getElementById("address").innerHTML = userlocation;
            })
    }

//}