window.onload = function () {
    let token = "";
    let animaresult;
    let isFirstPageLoaded=true;
    let interval = "";
    let geo = "GnbD8akWduu4C7RmTqYTJ7f6ODvTEbbv";
    //login template
    let t = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtd2EiLCJpc3N1ZWRBdCI6IjIwMTktMTEtMjciLCJ1c2VybmFtZSI6Im13cCJ9.U9ciwh5lcPwFlJdxhNQkeiMc7AMYAnawfKNidw8CNDpTIUjNBL_EtDqkXG4qGOF8H_Ve1S2Gg2PwmCYOkfgmWA"
    const login = `<h1>Please Login</h1>
    User name:<input id="default1" value ="mwp"></input><br><br>
    Password:  <input id="default2" value="123"></input><br><br>
    <button id="button">Login</button>`
    //animation template
    const animation = `<h1 id="geolocation">Welcome all from</h1>
        <textarea id="textarea" rows="30"  cols="90"> </textarea><br>
        <button id="refresh"> Refresh animation</button>
        <button id="logout">Logout</button>`

    //loginfunction
    function loginpage() {
        outlet.innerHTML = login;
        //history.pushState(state, title, url);
    }
    loginpage();
    //animation function
    function animapage() {
        outlet.innerHTML = animation;
        //history.pushState(state,title, url);

    }
    button.addEventListener('click', LoginClicked);
    //loginbutton clicked
    function LoginClicked() {
        //1.when login clicked it will fetch from the server
        fetchLogin();
        //2.when login button clicked it will redirect me to the animation page
        animapage();
        //3.when the login button is cliked it will take me to the logout or animapage 
        allAnimaContent();
        //4.when the login is clicked iw will fetch the animations form the server
        fetchAnimation();
        //5.when the login is cliked it will fetch the geolocation
        geolocationFetch();

    }
    //logout and referesh button functionality
    function allAnimaContent() {
        //when logout button is clicked i want to see the login page 
        logout.addEventListener("click", loginpage);
        //the refresh button will fetch animation
        refresh.addEventListener('click', displayRefesh);
        
    }

    //login fetch: post request
    async function fetchLogin() {
        let loginfetch = await fetch(`http://www.mumstudents.org/api/login`, {
            method: "POST",
            body: JSON.stringify({
                "username": "mwp",
                "password": "123"
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await loginfetch.json();
        //console.log(result);
        token = result.token;
        //return result;
        console.log(token);
    }
    //animation fetch
    async function fetchAnimation() {
        //we need to clear before we fetch
         if (interval) clearInterval(interval);
        let animafetch = await fetch("http://www.mumstudents.org/api/animation", {
            method: "GET",
            headers: {
                "content-type": "application/text",

                "Authorization": `Bearer ${t}`,
            }

        });
        //this will fetch and bring the result in text format
         animaresult = await animafetch.text();
        //to display the first animation on the animation page with out refreshing
        if(isFirstPageLoaded){
            displayFirstAnima();
        }
        
    }


    //display the anima in the textarea
    function displayFirstAnima() {

        let splitedanima = animaresult.split("=====\n");
         let index= 0;
        let arrayLength= splitedanima.length;
        interval=setInterval(() => {
            textarea.innerHTML = splitedanima[index];
            index++;
            if (index === arrayLength) {
                index=0;
            }
        }, 200);
    }

    function displayRefesh() {
        isFirstPageLoaded=false;
        fetchAnimation();
        let splitedanima = animaresult.split("=====\n");
        let arrayLength = splitedanima.length;
        let index= 0;
        interval = setInterval(() => {
            textarea.innerHTML = splitedanima[index];
            index++;
            if (index === arrayLength) {
                index = 0;
            }
        }, 200);

    }

    //geolocation
    async function geolocationFetch() {
        navigator.geolocation.getCurrentPosition(sucess);
        async function sucess(position) {
            console.log(position);
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            let geofetch = await fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${geo}&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true`);
            const output = await geofetch.json();
            const city = output.results[0].locations[0].adminArea5;
            const state = output.results[0].locations[0].adminArea3;
            const country = output.results[0].locations[0].adminArea1;
            geolocation.innerHTML = `Welcome all from ${city},${state},${country}!`;
        }

    }
}