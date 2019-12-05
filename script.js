
window.onload = function () {
    let his = window.location
    history.pushState({ page: 2 }, "animation", "?loging page ")
    let loged = false;
    let navigatorKey = "dumnufmhzSXEK1MB8EYjjGHgZgpLEGml"
    let animFrame, timerId, text, status;

    let loginglook = ` 
    <link href="loginstyle.css" type="text/css" rel="stylesheet">
    <h1> Please login </h1>
    Username: <input id="UserName" type="text" value= "mwp"></br>
    Password: <input id="password" type="text"value= "123"></br>
    <button type="button" id="loging">Login</button>`;

    let animationLook = `
    <link href="animationstyle.css" type="text/css" rel="stylesheet"><h1 id="status"></h1>
    <textarea id="textarea" rows="25" cols="60"></textarea>
    <button type="button" id="refresh">Refresh Animayion</button>
    <button type="button" id="logout">logout</button>`;

    let divLook = document.querySelector("#outlet");
    divLook.innerHTML = loginglook;

    //  ******** for the login page ********** 

    let login = document.querySelector("#loging")
    let UserName = document.querySelector("#UserName")
    let password = document.querySelector("#password")

    // addEventListener login page 
    login.addEventListener("click", logingFunc);

    // addEventListener login page 
    function addEvent() {
        if (loged) {

            let RefreshAnim = document.querySelector("#refresh");
            let logout = document.querySelector("#logout");
            text = document.querySelector("#textarea");
            RefreshAnim.addEventListener("click", cleartime);
            logout.addEventListener("click", logoutFunc);
            status = document.querySelector("#status");
        }
    }

    // ********************** creating function *******************

    // loging function 
    function logingFunc() {
        history.pushState("myAnimation", "animation", "?animation")
        navigator.geolocation.getCurrentPosition(success, fail);
        divLook.innerHTML = animationLook;
        loged = true;
        tokenFetch()
        addEvent()
        loged = false;
    }

    // error function for location 

    function success(position) {

        Longitude = position.coords.longitude;
        Latitude = position.coords.latitude;
        fetchLocation()
    }

    function fail(msg) {
        alert(" you said no ")
    }

    // Fetch function 

    async function fetchLocation() {

        const locationfetch = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${navigatorKey}&location=${Latitude},${Longitude}&includeRoadMetadata=true&includeNearestIntersection=true`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

        const resultlocation = await locationfetch.json()

        let arr = resultlocation.results[0]
        let objectlocation = arr.locations[0]
        let country = (objectlocation.adminArea1)
        let city = (objectlocation.adminArea5)
        let state = (objectlocation.adminArea3)

        status.innerHTML = `WELCOME FROM ,${country},${city},${state}`

    }

    // logout function 

    function logoutFunc() {
        divLook.innerHTML = loginglook;
        loged = false;

        window.location.replace(his)
        history.pushState({ page: 2 }, "animation", "?loging page ")


    }

    async function tokenFetch() {

        const response = await fetch('http://mumstudents.org/api/login',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({

                    "username": "mwp",

                    "password": "123"
                })
            });

        const result = await response.json()
        tokenObject = result

    }


    async function fetchAnimation() {
        const response = await fetch('http://mumstudents.org/api/animation',
            {
                method: 'GET',
                headers: {
                    "content-type": "application/text",
                    Authorization: `Bearer ${tokenObject.token}`
                }
            });

        const anim_result = await response.text()
        animFrame = anim_result;

        showAnimation()
    }

    function showAnimation() {
        let anima_Array = animFrame.split("=====\n");
        text.innerHTML = anima_Array[0]
        let current_frame = 0;
        let max_frames = anima_Array.length;

        timerId = setInterval(() => {
            text.innerHTML = anima_Array[current_frame];
            current_frame++;
            if (current_frame === max_frames) {
                current_frame = 0;
            }
        }, 200);
    };

    function cleartime() {
        clearInterval(timerId)
        fetchAnimation();
    }

    window.addEventListener('popstate', function (event) {
        if (event.state.page === 1) {
            clearInterval(timerId)
            logingFunc();
        } else {
            clearInterval(timerId)
            logingFunc();
        }
    });

}








