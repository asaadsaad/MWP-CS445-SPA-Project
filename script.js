'use strict';
window.onload = function project() {
    // window.addEventListener.popstate
    // this.history.pushstate 
    let token;
    let long;
    let lati;
    let keys = "tvXbGrqGqLqjaZ0RV8Bm1Mug02ScMW1T";
    let timerId;
    let userlocation;
    let loginId;
    let animFrames;

    const login = `
        <h1>Please Login</h1><br>
        Username:<input placeholder="mwp" value="mwp"/><br/>
        Password:<input placeholder="123" value="123"/><br/>
        <button id="loginbtn">Login</button>`;

    let loginTemplate = document.querySelector("#outlet");
    // loginTemplate.innerHTML = login;
    // let loginId = document.getElementById("loginbtn");
    // loginId.addEventListener("click", logToAnimationpage);

    getLocation();
    LoginFunc();
    // fetchAddress();
    // clearInterval(timerId);

    function LoginFunc() {
        //clearInterval(timerId);
        loginTemplate = document.querySelector("#outlet");
        loginTemplate.innerHTML = login;
        loginId = document.getElementById("loginbtn");
        loginId.addEventListener("click", logToAnimationpage);
    
    }


    const animation = `
        <div id="address"> Welcome to SPA Animation</div>
        <textarea id="animation" rows="20" cols="35" style="font-size: 20px"></textarea><br><br>
        <button id="refresh">Refresh Animation</button>
        <button id="logout">Logout</button>        
        `
    // let animationTemplate = document.querySelector("#outlet");
    // loginTemplate.innerHTML = animation;

    function logToAnimationpage() {
        clearInterval(timerId);
        loginTemplate.innerHTML = animation;
        fetchAddress();
       
        // logout();
        // refresh();
        document.getElementById("logout").addEventListener("click", logout);
        document.getElementById("refresh").addEventListener("click", refresh);
        fetchToken();
    }
    // let logoutId = document.getElementById("logout");
    // logoutId.addEventListener("click",logToLoginpage);

    function logout() {
     
        loginTemplate.innerHTML = login;
        let loginId = document.getElementById("loginbtn");
        loginId.addEventListener("click", logToAnimationpage);
        clearInterval(timerId);
    }
    function refresh() {
        clearInterval(timerId);
        fetchAnim();
        //let textarea = document.getElementById("animation");
        // function refreshfunc() {
        //     textarea.innerHTML = animFrames;

        // }
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
                // console.log(data);
                animFrames = data.split("=====\n");
                // console.log(animFrames)
                let count = 0;
                timerId = setInterval(function () {
                    document.getElementById("animation").innerHTML = animFrames[count];
                    //console.log(animFrames[count]);
                    count++;
                    if (count === animFrames.length) {

                        count = 0;
                    }
                }, 200)
            });

    }

    // fetchToken();


    function getLocation() {

        navigator.geolocation.getCurrentPosition(success);
        function success(position) {
            //console.log('Longitude:' + position.coords.longitude);
            //console.log('Latitude:' + position.coords.latitude);

            long = position.coords.longitude;
            lati = position.coords.latitude;
        }
        function fail(msg) {
            console.log(msg.code + msg.message);
        }
        //console.log(long, lati);


    }


    function fetchAddress() {
        console.log(lati);
        fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${keys}&location=${lati},${long}`)
            .then(data => data.json())
            .then(data => {
                //let loc = data.results[0].locations[0];
                // console.log(data);
                let city = data.results[0].locations[0].adminArea5;
                //console.log(city)
                let state = data.results[0].locations[0].adminArea3;
                let country = data.results[0].locations[0].adminArea1;
                userlocation = `Welcome all from ${city},${state},${country}!`;
                document.getElementById("address").innerHTML = userlocation;
                //console.log(userlocation)
            })
    }
    // fetchAddress();


}