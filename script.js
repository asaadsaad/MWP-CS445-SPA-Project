// your code here

window.onload = spa
function spa() {

    const loginTemplate = `             
                            <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
                            
                            <div class="container">
                                <form>
                                    <div class="form-group">
                                    <h1>Please Login</h1>
                                        <label>Username:</label>
                                        <input type="text" name="username" id="userid" placeholder="map" value="map">
                                    </div>
                                    <div class="form-group">
                                        <label>Password:</label>
                                        <input type="password" id="passwordid" placeholder="123456" value="123456">
                                    </div>
                                    <div class="form-group">
                                        <button class="btn btn-success" id = "login">Login</button>
                                    </div>
                                </form>
                            </div>
                            `

    const animationTemplate = `
                                <div>
                                    <h1 id = "location"></h1>
                                    <textarea id="showAnimation" cols="80" rows="30"></textarea><br><br>
                                    <button id="refAnimationBTN" class="button">Refresh Animation</button>
                                    <button type="button" id="logout">Logout</button>
                                </div>
                                `
    let fullAdress;
    let token;
    let latitud;
    let longitud;
    let moveAnimation
    const geoKey = "opPTwim7J6IURz5wAUrMZ9cmrvn8HXxq";
    const outlet = document.getElementById("outlet");

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



    const logInButton = document.getElementById("login");
    logInButton.addEventListener("click", logInFunction);
    function logInFunction() { // //The login function holds all the DOM elements for the credential page.
        activitiesAfterLogin()
    }


    async function activitiesAfterLogin() {
        outlet.innerHTML = animationTemplate;
        location()

        const response = await fetch("https://cs445-project.herokuapp.com/api/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "username": "map",
                "password": "123456"
            })
        })

        const jsonObj = await response.json()
        token = jsonObj.token;
        const status = jsonObj.status;

        if (status === true) {
            getAnimation();
        }

        const animation = document.getElementById("showAnimation");
        async function getAnimation() {
            const response = await fetch("https://cs445-project.herokuapp.com/api/animation", {
                method: "GET",
                headers: {
                    "Content-Type": "application/text",
                    Authorization: `Bearer ${token}`
                }
            })
            const allAnimation = await response.text();
            const animArray = allAnimation.split("=====\n");
            // animation.innerHTML = animArray[0];

            let currentAnim = 0;
            let maxlength = animArray.length;
            moveAnimation = setInterval(() => {
                animation.innerHTML = animArray[currentAnim];
                currentAnim++;
                if (currentAnim === maxlength) {
                    currentAnim = 0;
                }
            }, 200);
        }
        ////////////////////Refresh the page
        const refresh = document.getElementById("refAnimationBTN");
        refresh.addEventListener("click", clearLastAnimation)
        function clearLastAnimation() {
            clearInterval(moveAnimation)
            getAnimation(); //Function that fetches the animation from the API
        }
        ///////////////////Log outzthe page
        const logOut = document.getElementById("logout")
        logOut.addEventListener("click", logoutAnimPage);
        function logoutAnimPage() { //Function that return the login page 
            outlet.innerHTML = loginTemplate;
            const logInButton = document.getElementById("login");
            logInButton.addEventListener("click", logInFunction);
        }
    }
}