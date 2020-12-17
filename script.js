// your code here
/*===========================================================================
===Singla Page Animation retriving data from online server and animate=======
===============================String========================================*/
/**
 * when the window load directly find the announmous function 
 * and inside the login page invoked the it redirect to it .
 */

window.onload = function () {

    //variable which we need to the next path
    let mykey = "KjP5zwaRx5DO6MDhmIMI9fMtKsksKA1W";
    let longitude, latitude, token;
    let div = document.getElementById("outlet");

    //DOM which is added into div area when the window is loaded
    const templatelogin = `<div id="logindiv">

    <h1>Please Login</h1>
    <h2 id="myclock"></h2>
    <hr><hr>
    Username: <input type="text" id="username" placeholder="map"><br><hr>
    Password: <input type="password" id="password" placeholder="123456"><br><hr>
    <input type="button" id="login" class="btn btn-info" value="Login" > 
    <input type="button" id="register" class="btn btn-info" value="Register" >
    </div>
    <style>
    body{
        margin-right: 25%;
          margin-left: 25%;
          margin-top: 20px;
               background-image: url("./miu.jpg");
               background-repeat: no-repeat;
                background-size: cover;
          }
        
          #logindiv
          {
               margin-top: 50px;
          background-image: url("./aa.png");
               background-repeat: no-repeat;
                background-size: cover;
            position: relative;
            z-index: 100;
            text-align: center;
        }
          h2 {
          text-decoration: underline;}
    </style>
    
    `
    //DOM which is added into div area when the login button is clicked
    const templateAnimation = ` 
    <div id="logindiv">
   
    <h2>እንኳን ደና መጡ</h2>
    <h2 id="myclock"></h2>
    <h2 id="welcome">  wellcome all from .............</h2>
    <textarea rows="20" cols="60" id="playground" align="center"></textarea><br>
    <button type="button" id="refresh" class="btn btn-info">Refresh_Animation</button>
    <button type="button" id="logout"  class="btn btn-info">Logout</button> </div>

    <style>
    body{
        margin-right: 25%;
          margin-left: 25%;
          margin-top: 20px;
               background-image: url("./miu.jpg");
               background-repeat: no-repeat;
                background-size: cover;
        
          }
        
          #logindiv
          {
               margin-top: 50px;
          background-image: url("./aa.png");
               background-repeat: no-repeat;
                background-size: cover;
            position: relative;
            z-index: 100;
            text-align: center;
        }
          h2 {
          text-decoration: underline;}
          #playground
          {
            text-align: center;
            background-image: url("./g33.gif");
            background-repeat: no-repeat;
            background-size: cover;
            color:black;
            position: relative;
            font-weight: bold;
          }
        
    </style>
    
            `

    /**
     * @param{no paramater to take}
     *  window load function 
     */
    loginpage();
    /**
     * History API to handle forward and back arrow 
     * which diplayed on tab
     */
    window.addEventListener('popstate', function (event) {
        if (event.state.page === 1) {
            clearInterval(TimerID)
            loginpage();
        } else {
            clearInterval(TimerID)
            playingpage();
        }
    })
    /**
     * when the window load it invoke the loginpage function
     * then it collect html and and js function into browser
     */

    function loginpage() {
        // loading the dom to login template
        div.innerHTML = templatelogin;
        showTime();
        //change the url of the page  and push 1 to the histroy api
        history.pushState({ page: 1 }, "Mylogin", "?loginpage");

        let login = document.getElementById("login")
        //add event listener to the login button
        login.addEventListener("click", myLoginFunction);

    }
    /**
     * @param{no paramter to pass}
     * 
     */
    function playingpage() {
        history.pushState({
            page: 2
        }, "animation", "?playingpage")
        div.innerHTML = templateAnimation;
        showTime();
        getlocation()
        getAnimation();

    }
    /**
     * when the refresh button is clicked 
     * it clearout ther setinterval ID to protect memory leak
     */
    function reload() {
        clearInterval(TimerID)
        getAnimation();
    }
    /**
     * when the logout button is clicked return back to login window
     */
    function logout() {
        div.innerHTML = templatelogin
        token = false;
        loginpage();
    }

    function eventload() {
        document.getElementById("refresh").addEventListener("click", reload)
        document.getElementById("logout").addEventListener("click", logout)
    }

    async function myLoginFunction() {
        try {

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

            const validlogin = await result.json()
            /**
             * the validlogin object have to propreties 
             * token and status
             */
            token = validlogin.token;
            const status = validlogin.status;

            if (status === true) {
                playingpage();
            }

        } catch (error) {

            alert(error);

        }

    }

    /**
     * @param{no parameter to pass }
     * this function gives the geolocation of the user who is currently logged in
     */
    function getlocation() {

        navigator.geolocation.getCurrentPosition(success,
            (message) => {
                alert(`${message.code}, ${message.message} `);
                div.innerHTML = "Accept location request require unless doesn't work";
            })
        /**
         * 
         * @param {*} position 
         * A callback function that takes a GeolocationPosition object as its sole input parameter.
         */
        async function success(position) {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            let destructLocation = await fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${mykey}&location=${latitude},${longitude}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            destructLocation = await destructLocation.json();
            console.log(destructLocation)
            let city = destructLocation.results[0].locations[0].adminArea5;
            // let county = destructLocation.results[0].locations[0].adminArea4Type;
            let state = destructLocation.results[0].locations[0].adminArea3;
            let country = destructLocation.results[0].locations[0].adminArea1;
            let exactaddress = `Welcome all to, ${city}, ${state}, ${country}`;
            document.getElementById("welcome").innerHTML = exactaddress;
            eventload()

        }

    }

    /**
     * @Param{ no parameter to pass}
     * this function fetch animated string from server and pass to 
     * the html to the dom playing area .
     */

    async function getAnimation() {
        const result = await fetch("https://cs445-project.herokuapp.com/api/animation", {
            method: "GET",
            headers: {
                "Content-Type": "application/text",
                Authorization: `Bearer ${token}`
            }
        })
        sourcedata = await result.text();
        console.log(sourcedata);
        const splitdata = sourcedata.split("=====\n");
        playground.innerHTML = splitdata[0];
        let next = 1;
        let maxlength = splitdata.length;
        TimerID = setInterval(() => {
            playground.innerHTML = splitdata[next];
            next++;
            if (next === maxlength) {
                next = 0;
            }
        }, 200);

    }

    ////////////////////////simple digital clock for decorator/////////////////////////
    function showTime() {
        let date = new Date();
        let h = date.getHours(); // 0 - 23
        let m = date.getMinutes(); // 0 - 59
        let s = date.getSeconds(); // 0 - 59
        let session = "AM";

        if (h >= 12) {
            h = h - 12;
            session = "PM";
        }
        if (h == 0) {
            h = 12;
        }

        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;

        let time = h + ":" + m + ":" + s + " " + session;
        document.getElementById("myclock").innerText = time;
        setTimeout(showTime, 1000);
    }


}



