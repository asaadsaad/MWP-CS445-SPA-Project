
"use strict";
window.onload = function () {
    // declare global variables here 
    // eslint-disable-next-line quotes
    const DevKey = `UGe5a24nOhIAkbWIG3UCWtSDN0xKJeZ3`;
    let longitude,latitude,timer;
    let token = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtd2EiLCJpc3N1ZWRBd…
    w8CNDpTIUjNBL_EtDqkXG4qGOF8H_Ve1S2Gg2PwmCYOkfgmWA`;
    const loginPage =
    // input user name, header, password , background colour, text allign functionalities
        `<style>
        body {
            background-color: silver;
        }
        </style>
        <div align ="center" style= "border:1px solid red">
        <h1> Please login</h1>
         Username <input type="text" placeholder="mwp" value = "mwp"/> <br><br>
         Password <input type="text" placeholder="123" value = "123"/> <br><br>
         <button align ="center" class="btn btn-primary mr-4"  id ="logInButton">Login</button> <br>
         </div>`;
    const animationPage =
     // input logout button , animation button functionalities
        `<style>
        body {
            background-color: coral;
        }
        </style>
        <div align ="center" style= "border:1px solid red">
        <h3 id = "location"></h3>
        <textarea id= "animTextArea" cols=80" rows="20"></textarea><br>
        <button  class="btn btn-warning mr-4" id ="Refanimation">Refresh Animation</button> 
        <button class="btn btn-success mr-4" id ="logoutid">Logout</button> <br>`;
    // select the element using query selector
    let MainPage = document.querySelector("#outlet");
    let MainPageFunc = () => {
        MainPage.innerHTML = loginPage; //autoloading log in page
        document.querySelector("#logInButton").addEventListener("click", animaPage);
        //add event listener for the log in button to log in when clicked
        history.pushState({ dataPage1: "one" }, null, "?name =secondPAge");
        window.addEventListener("popstate", function (event) {
            if (event.state.dataPage1 === "one") {
                clearInterval(timer);
                MainPageFunc();
            }
        });
    };
    //call the function here
    MainPageFunc();
    // animation page/ second page with all functionality for the page and history 
    // push state to get back to log in page when arrow pressed
    // eslint-disable-next-line require-jsdoc
    function animaPage() {
        clearInterval(timer);
        MainPage.innerHTML = animationPage;
        history.pushState({ dataPage1: "one" }, null, "?name == firstPage");
        getlatAndLong();
        redirectingPage();
        refFunction();
    }
    let redirectingPage = () => {
        // log out page when clicked and back to main page
        // clear interval in every fetch animation when counter reaches zero
        clearInterval(timer);
        let myLogOut = document.getElementById("logoutid");

        myLogOut.addEventListener("click", function () {
            MainPage.innerHTML = loginPage;
            // MainPage.innerHTML = animationPage
            document.querySelector("#logInButton").addEventListener("click", animaPage);

        });
    };
    // eslint-disable-next-line require-jsdoc
    function refFunction() {
        // clear the interval every time we fetch new animation
        clearInterval(timer);
        displayAnimation();
        let btnreffresh = document.querySelector("#Refanimation");

        btnreffresh.addEventListener("click", displayAnimation);
    }
    let fetcForToken = () => {
        fetch("http://mumstudents.org/api/login",
            {
                // eslint-disable-next-line quotes
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ username: "mwp", password: "123" })
            })
            // parse it to json object
            .then(res => res.json())
            .then(elem => {
                token = elem.token;
                displayAnimation();
            });
    };
    let displayAnimation = () => {
        clearInterval(timer);
        let displayArray;
        //fetch animaion
        fetch("http://mumstudents.org/api/animation", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },

        })
            .then(res => res.text())
            .then(elem => {
                let counter;
                displayArray = elem.split("=====\n");
                counter = 0;
                timer = setInterval(function () {
                    document.querySelector("#animTextArea").innerHTML = displayArray[counter]
                    counter++;

                    if (counter == displayArray.length) {
                        counter = 0;
                    }

                }, 200);

            });
    };
    fetcForToken();
    let getlatAndLong = () => {
        // use geolocation api to look for the latitude and longitude(coordinates) of the location
        navigator.geolocation.getCurrentPosition(success, error);
        // eslint-disable-next-line require-jsdoc
        function success(pos) {
            longitude = pos.coords.longitude;
            latitude = pos.coords.latitude;
            UserLocation();
        }
        // display error with the code if not able to get response
        // eslint-disable-next-line require-jsdoc
        function error() {
            console.warn(`ERROR(${error.code}): ${error.message}`);
        }
    };
    // eslint-disable-next-line require-jsdoc
    function UserLocation() {
        fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${DevKey}&location=${latitude},${longitude}`)
            .then(function (res) {
                // parse it to json object
                return res.json();
            })
            .then(function (data) {
                let Mylocation = data.results[0].locations[0];
                let state = Mylocation.adminArea5;
                let city = Mylocation.adminArea3;
                let country = Mylocation.adminArea1;
                // finally display the location
                document.getElementById("location").innerHTML = `Welcome all from ${state} ${city},${country}`;
            });
    }
};
