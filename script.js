window.onload = function () {
    let loginView, loginBtn, animationView, animationArea, refreshBtn, logoutBtn, questApiUrl, lat, long, userLocation, animationToken, animationFrames = [], loadFramesTimeout, displayFramesTimout, displayFrameInterval;
    const OUTLET = getElement('#outlet');
    const QUEST_API_KEY = 'Y0ROZGOJZ8PxsijeatYiupEeXX4y2G4Z';
    const TOKEN_URL = `http://www.mumstudents.org/api/login`;
    const ANIMATION_URL = `http://www.mumstudents.org/api/animation`;
    let i = 0;
    
    loginView = `
    <div id="loginView">
        <h1>Please Login</h1>
        <label for="username">UserName: </label>
        <input type="text" id="username" value="mwp"><br>
        <label for="password">Password: </label> 
        <input type="password" value="123"><br>
        <button id="login">Login</button>
    </div>
    `;

    animationView = `
    <div id="animationView">
        <h2 id="location">Your location</h2>
        <textarea id="animationArea" cols="100" rows="30"></textarea><br>
        <button id="refresh">Refresh Animation</button>
        <button id="logout">Logout</button>
    </div>
    `;
    getLatLong();
    loadLogin();

    /**
     * Function the current use lat and long
     */
    function getLatLong() {
        // getting current user lat long
        navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            console.log(`lat: ${lat}, long: ${long}`);
        }, () => { err => console.log('Error:' + err) }, { enableHighAccuracy: true, timeout: 5000 });
    }

    /**
     * Function to load login view
     */
    function loadLogin() {
        OUTLET.innerHTML = loginView;
        loginBtn = getElement('#login');
        loginBtn.addEventListener('click', loadAnimationView);
        
    }

    /**
     * Function to load animation view
     */
    function loadAnimationView() {
        getUserLocation();

        OUTLET.innerHTML = animationView;
        animationArea = getElement('#animationArea');

        refreshBtn = getElement('#refresh');
        refreshBtn.addEventListener('click', refreshAnimation);

        logoutBtn = getElement('#logout');
        logoutBtn.addEventListener('click', logOut);

        getToken();

        loadFramesTimeout = setTimeout(() => {
            getAnimationFrames();
        }, 1000)

        displayFramesTimout = setTimeout(() => {
            displayAnimation();
        }, 1500);
    }

    /**
     * Function to get user location asynchronously
     */
    function getUserLocation() {
        //41.0031878,-91.965341
        mapQuestApiUrl = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${QUEST_API_KEY}&location=${lat},${long}`;
        console.log(mapQuestApiUrl);

        fetch(mapQuestApiUrl).then(response => response.json()).then(data => {
            let address = data.results[0].locations[0];
            userLocation = `${address.street}, ${address.adminArea5}, ${address.adminArea3}, ${address.postalCode}`;
            getElement('#location').innerHTML = userLocation;
        })
    }

    /**
     * Function to get token for animation api using POST request asynchronously
     */
    function getToken() {
        fetch(TOKEN_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "username": "mwp",
                "password": "123"
            })
        }).then(response => response.json()).then(data => {
            animationToken = data.token;
            console.log(animationToken);
        });
    }

    /**
     * Function to get animation frames from the animation api using GET request asynchronously
     */
    function getAnimationFrames() {
        console.log(animationToken);
        fetch(ANIMATION_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${animationToken}`
            }
        }).then(response => response.text()).then(data => {
            console.log(data);
            animationFrames = data.split('=====');
        });
    }

    /**
     * Function to display animation frames
     */
    function displayAnimation() {
        debugger
        displayFrameInterval = setInterval(() => {
            if (i < animationFrames.length) {
                animationArea.value = animationFrames[i++]; 
            } else {
                i = 0;
            }
            // i++;
        }, 200);
    }

    /**
     * Function to refresh the animation view asynchronously
     */
    function refreshAnimation() {
        clearTimeout(loadFramesTimeout);
        clearTimeout(displayFramesTimout);
        clearInterval(displayFrameInterval);
        i = 0;

        loadFramesTimeout = setTimeout(() => {
            getAnimationFrames();
        }, 1000)

        displayFramesTimout = setTimeout(() => {
            displayAnimation();
        }, 1500);
    }

    /**
     * Function to logout and redirect to the login view
     */
    function logOut() {
        loadLogin();
    }

    /**
     * Function to get an element
     * @param {String} selector selector for an element
     */
    function getElement(selector) {
        return document.querySelector(selector);
    }
}

/**
 * inject the login view
 * add click event to the login button
 * upon clicking the login button do the following:
 * 1. inject animation view
 *      - add click event to refresh animation and logout           buttons
 * 2. make a get request to geolocation api:
 *      -get the latitude and longitued from the                  response
 * 3. use the latitude and longitude to make a get request to mapquest api:
 *      -get the information you need street, city, zip          from the response and
 *      -display it on animation header
 * 4. make a post request to http://www.mumstudents.org/api/login to get token
 * 5. use this token to make a GET request to http://www.mumstudents.org/api/animation to get the animation text
 * 6. extract the animation text from the response
 * 7. split the animation text using '====='
 * 8. display each frame in the animation text area every 200 millisecond
 * 9. when the use clicks the refresh button:
 *      - make a new GET request to http://www.mumstudents.org/api/animation using the same token
 *      -extract,split,display (the same thing like in step 6,7,8 except this time the frames are different)
 *      - puhs the current page to the history
 *      - clear intervals that you used earlier to avoid unexpected output
 *10. when the user clicks the logout page:
        - push the current page to the history
        -load login page
        -change the route to be displayed
 */
