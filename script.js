window.onload = function () {

    //  variable area 
    let loged = false;
    let tokenObject = 0
    let Longitude = 0
    let Latitude = 0
    let status;
    let navigatorKey = "dumnufmhzSXEK1MB8EYjjGHgZgpLEGml"

    let loginglook = ` <h1> Please login </h1>
    Username: <input id="UserName" type="text" value= "mwp"></br>
    Password: <input id="password" type="text"value= "123"></br>
    <button type="button" id="loging">Login</button>`;

    let animationLook = `<h1 id="status">"Start" </h1>
    <textarea id="textarea" rows="40" cols="100"></textarea>
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
            RefreshAnim.addEventListener("click", refreshFunc);
            logout.addEventListener("click", logoutFunc);
            status = document.querySelector("#status")
        }
    }

    // ********************** creating function *******************

    // loging function 
    function logingFunc() {

        alert("logggggggg");
        navigator.geolocation.getCurrentPosition(success, fail);

        divLook.innerHTML = animationLook;
        loged = true;
        // navigator.geolocation.watchPosition(success, fail);


        tokenFetch()

        addEvent()
        fetchAnimation()
    }

    // error function for location 

    function success(position) {
        // console.log('Longitude:' + position.coords.longitude);
        // console.log('Latitude:' + position.coords.latitude);
        Longitude = position.coords.longitude;
        Latitude = position.coords.latitude;
        fetchLocation()
    }

    function fail(msg) {
        alert(" you said no ")
        console.log(msg.code + msg.message);
    }

    // Fetch function 

    async function fetchLocation() {

        const locationfetch = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${navigatorKey}&location=${Latitude},${Longitude}&includeRoadMetadata=true&includeNearestIntersection=true`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })

        const resultlocation = await locationfetch.json()
        console.log(resultlocation)
        let arr = resultlocation.results[0]
        // console.log(arr.locations)
        let objectlocation = arr.locations[0]
        let country = (objectlocation.adminArea1)
        let city = (objectlocation.adminArea5)
        let state = (objectlocation.adminArea3)

        // console.log(country)
        // console.log(city)
        // console.log(state)

        status.innerHTML = `welcome FROM ${country},${city},${state}`

    }

    // Refresh  function 

    function refreshFunc() {
        alert("reeeee")
    }

    // logout function 

    function logoutFunc() {
        alert("outttttt")
        divLook.innerHTML = loginglook;
        loged = false;
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
        tokenObject = result.token
        // console.log(tokenObject)

    }
    let t = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtd2EiLCJpc3N1ZWRBdCI6IjIwMTktMTEtMjYiLCJ1c2VybmFtZSI6Im13cCJ9.yvKwS6McQx4DiPTOf6K_MDbWmLPSsUAEMpWgab3k47hPSJDpnurIaL0ukyr_QiLOJlKRZ0GI3wGkV014JoB15w"
    let token = t
    // async function fetchAnimation() {



    //     const animfetch = await fetch("http://mumstudents.org/api/animation", {

    //         method: 'GET',
    //         Authorization: 'Bearer {{t}}'
    //     });
    //     // console.log(tokenObject)

    //     const animresult = await animfetch.text()

    //     console.log(animresult)


    // }

    // function fetchAnimation(){

    //     fetch(' http://mumstudents.org/api/animation ',
    //         {
    //             // method: 'GET',
    //             Authorization: 'Bearer {{t}}'
    //         })

    //         .then(response => response.text())
    //         .then(console.log)
    //     // .catch(error => console.log(error))
    // }

    // async function fetchAnimation() {

    //     const response = await fetch(' http://mumstudents.org/api/animation ',
    //         {
    //             method: 'GET',
    //             Authorization: "Bearer {{token}}"
    //             // headers: { Authorization: 'Bearer {{t}}' },

    //         });

    //     const rrr = await response.text()
    //     console.log(rrr)
    //     // tokenObject = result.token
    //     // console.log(result)

    // }
    async function fetchAnimation() {

        const response = await fetch('http://mumstudents.org/api/animation');

        const rrr = await response.text()
        console.log(rrr)
        // tokenObject = result.token
        // console.log(result)

    }


}
