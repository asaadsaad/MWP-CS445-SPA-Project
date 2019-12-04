'use strict';
window.onload = function project() {

    let token, long, lati, timerId, userlocation, loginId, animFrames, username, password
    let keys = "tvXbGrqGqLqjaZ0RV8Bm1Mug02ScMW1T";

    const login = `
        <h1>Please Login</h1><br>
        Username:<input placeholder="mwp" value="mwp" id="username"/><br/>
        Password:<input placeholder="123" value="123" id="password"/><br/>
        <button id="loginbtn">Login</button>`;

    let loginTemplate = document.querySelector("#outlet");

   // getLocation();
    LoginFunc();

    function LoginFunc() {
        clearInterval(timerId);
        loginTemplate.innerHTML = login;
        loginId = document.getElementById("loginbtn");
        loginId.addEventListener("click", logToAnimationpage);            
            history.pushState({ page: 1 }, null, "?page=1")
            window.addEventListener("popstate", function (e) {
                if (e.state.page === 1) {
                    LoginFunc()
                }
            })
            getLocation();
    }

    const animation = `
        <div id="address" style="font-size:30px" style = "font-weight: bold" > Welcome to SPA Animation</div>
        <textarea id="animation" rows="23" cols="50" style="font-size: 20px"></textarea><br><br>
        <button id="refresh">Refresh Animation</button>
        <button id="logout">Logout</button>        
        `

    function logToAnimationpage() {
        username = document.getElementById("username").value;
        password = document.getElementById("password").value;
        if (username === "mwp" && password === "123") {
        history.pushState({ page: 2 }, null, "?page=2")
        clearInterval(timerId);
        loginTemplate.innerHTML = animation;
        fetchAddress();
        document.getElementById("logout").addEventListener("click", logout);
        document.getElementById("refresh").addEventListener("click", refresh);
        fetchToken();
        }else {
            alert("Incorrect username and password")
        }
    }

    function logout() {

        loginTemplate.innerHTML = login;
        let loginId = document.getElementById("loginbtn");
        loginId.addEventListener("click", logToAnimationpage);
        clearInterval(timerId);
    }
    function refresh() {
        clearInterval(timerId);
        fetchAnim();
    }

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

}