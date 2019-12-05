//window.onload = function () {
    /*
    The application have references to the following
    */
    let lat,lon,frame,timerId,token,user,password;
    let Geolocation_API_Key = "ycSAKAgeWuIeiGZbLuSi5wp0867aaJFL";
    
    // define logintemp, animationTemp and outlet
    const loginTemp = `
                <h1>Please Login</h1><br>   
                Username: <input placeholder="mwp" value="mwp" id="username"/><br/><br/>
                Password: <input placeholder="123" value="123" id="password"/><br/>
                <button id="login">Login</button>  
            `
    const animationTemp = `
                    <div id="address"  style="font-size:20px" style="font-weight:bold"></div>  
                    <textarea id="animation" rows="25" cols="50" style="font-size: 20px"></textarea><br><br>
                    <button id="refresh">Refresh Animation</button>
                    <button id="logout">Logout</button>        
                    `
    const outlet = document.querySelector("#outlet");

    /*login template is loaded into the DOM when the application starts
    * History API will push a new state to history. users used the “back” and “forward”
    buttons, read the state and render the correct view into the DOM.
    * login button, when clicked, send an Ajax call to the server to authenticate the user.
    */
    firstPage();
    function firstPage() {

        outlet.innerHTML = loginTemp
        document.querySelector("#login").addEventListener('click', aniTemp);
        history.pushState({ page: 1 }, "title 1", "?page=1")

        window.addEventListener('popstate', function (event) {
            if(event.state.page===1){
                clearInterval(timerId)
                firstPage() 
            };
        });
    };

    /*
    *two listeners, one for “Load animation” so every time is clicked you will fetch a new animation frames from the server.
    * The other listener is for “Logout button”
    * User and Password authentication before Ajax call to the server 
    */
    function aniTemp() {
        user = document.querySelector("#username").value;
        password = document.querySelector("#password").value;
       // console.log(user)
        // console.log(password)

        if(user === "mwp" && password === "123"){
        history.pushState({ page: 2 }, null , "?page=2");
        clearInterval(timerId);
        outlet.innerHTML = animationTemp;
      
        document.querySelector("#refresh").addEventListener('click', refreshbtn);
        document.querySelector("#logout").addEventListener('click', logoutbtn);
        gettoken();
        fechLocation();
        } else{
            alert("Check your user and Password")
        };
    };

   /* users click on “Logout” button, you will need to clear the token, clear the
    animation, and load the login page again into the DOM.
    */
    function logoutbtn() {
        outlet.innerHTML = loginTemp;
        document.querySelector("#login").addEventListener('click', aniTemp);
        clearInterval(timerId);

    };

    /*
    * When users click on "refreshbtn" to clear the previous animation, 
    send an Ajax call to fetch a new animation frames, start a new interval.
    */

    function refreshbtn() {
        clearInterval(timerId);
        myAnimantion();
    };

    /*
    * fetch a token from a server and return the token 
    * Change a token into string 
    */
    async function gettoken() {

        const resp = await fetch("http://www.mumstudents.org/api/login", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                username: 'mwp', password: '123'
            })
        })
        const respBody = await resp.json();
        console.log(respBody);
        token = respBody.token;

        myAnimantion();
    };

    /*
    * fetch a new animation frames, start a new interval.
    * frames are separated with "=====\n", we will need to break the frames and load one frame at a time in the textarea every 200ms.
    */
    async function myAnimantion() {
        clearInterval(timerId);
        const resp = await fetch("http://mumstudents.org/api/animation", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        const respBody = await resp.text();
        //console.log(respBody);
        frame = respBody.split('=====\n');
        //console.log(frame);

        let count = 0;
        timerId = setInterval(function () {
            document.getElementById("animation").innerHTML = frame[count];
            count++;
            if (count === frame.length) {
                count = 0;
            }
        }, 200);
    };

        /*
    * fetch the current user location, and send their longitude and latitude to mapquestapi to find out their city, state, zip, country. 
    * Display an appropriate welcome message on top of the animation page.
    */

    function fechLocation() {
        navigator.geolocation.getCurrentPosition(success);

        async function success(position) {
            lat = position.coords.latitude
            lon = position.coords.longitude;
            // console.log(lat);
            // console.log(lon);

            let resp = await fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${Geolocation_API_Key}&location=${lat},${lon}`);
            resp = await resp.json();
            // console.log(resp);

            const city = resp.results[0].locations[0].adminArea5
            const state = resp.results[0].locations[0].adminArea3
            const country = resp.results[0].locations[0].adminArea1
            const zip = resp.results[0].locations[0].postalCode

            document.querySelector("#address").innerHTML = `Welcome all from ${city}, ${state}, ${zip}, ${country}!`;
        };
    };
//};