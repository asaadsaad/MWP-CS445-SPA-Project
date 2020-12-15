// your code here

window.onload = spa
function spa() {

    const loginTemplate = `
                            <h1>Please Login</h1>
                            <label>Username</label>
                            <input type="Username" class="user" id="userid" placeholder="map" value="map">
                            <div>
                                <label>Password</label>
                                <input type="password" class="pass" id="passwordid" placeholder="123456" value="123456">
                            </div>
                            <button type="submit" id = "login" class="btn btn-primary">Login</button>
                            `

    const animationTemplate = `
                                <div>
                                    <h1 id = "location"></h1>
                                    <textarea id="disAnimation" cols="80" rows="30"></textarea><br><br>
                                    <button id="refAnimationBTN" class="button">Refresh Animation</button>
                                    <button type="button" id="logout">Logout</button>
                                </div>
                                `


    ///////////////////////////////////////////////////////
    let fullAdress;
    let latitud;
    let longitud;
    let geoKey = "opPTwim7J6IURz5wAUrMZ9cmrvn8HXxq";
    let outlet = document.getElementById("outlet");

    outlet.innerHTML = loginTemplate;

    ////////////////////////////////////////////////////////////////////Geolocation fetch
    async function location() {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitud = position.coords.latitude;
            longitud = position.coords.longitude;
        })

        let fetchJson = await fetch(`https://www.mapquestapi.com/geocoding/v1/reverse?key=${geoKey}&location=41.00704387603765,-91.96811967883806&includeRoadMetadata=true&includeNearestIntersection=true`);
        let fetchObj = await fetchJson.json();
        let adress = fetchObj.results[0].locations[0]
        fullAdress = `Welcome all from ${adress.adminArea5}, ${adress.adminArea3}, ${adress.adminArea1}! `
        document.getElementById('location').innerHTML = fullAdress
    }


//////////////////////////////////////////////////////////////////////////////
    const logInButton = document.getElementById("login");
    logInButton.addEventListener("click", logInFunction);
    function logInFunction() { // //The login function holds all the DOM elements for the credential page.
        activitiesAfterLogin()
    }

//////////////////////////////////////////////////////////////////////////////
    function activitiesAfterLogin() {
        outlet.innerHTML = animationTemplate;
        location()

        document.getElementById("logout").addEventListener("click", logoutAnimPage);
        function logoutAnimPage() { //Back to the login page when we click the logout button
            outlet.innerHTML = loginTemplate;
            const logInButton = document.getElementById("login");
            logInButton.addEventListener("click", logInFunction);
        }
    }
}