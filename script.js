window.onload = function () {
    let loginView, loginBtn, animationView, animationArea, refreshBtn, logoutBtn, lat, long, userLocation, token, animationFrames = [], displayFrameInterval, i = 0;

    const OUTLET = getElement('#outlet');
    const QUEST_API_URL = 'http://www.mapquestapi.com/geocoding/v1/reverse';
    const QUEST_API_KEY = 'Y0ROZGOJZ8PxsijeatYiupEeXX4y2G4Z';
    const TOKEN_URL = `http://www.mumstudents.org/api/login`;
    const ANIMATION_URL = `http://www.mumstudents.org/api/animation`;

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

        let loginViewState = `
            <div id="loginView">
                <h1>Please Login</h1>
                <label for="username">UserName: </label>
                <input type="text" id="username" value="mwp"><br>
                <label for="password">Password: </label> 
                <input type="password" value="123"><br>
                <button id="login" onclick="loadAnimationView()">Login</button>
            </div>
            `;
    }

    /**
   * Function to get user location asynchronously
   */
    function getUserLocation() {
        mapQuestApiUrl = `${QUEST_API_URL}?key=${QUEST_API_KEY}&location=${lat},${long}`;

        fetch(mapQuestApiUrl).then(response => response.json()).then(data => {
            let address = data.results[0].locations[0];
            userLocation = `${address.adminArea5}, ${address.adminArea3}, ${address.adminArea1}`;
            getElement('#location').innerHTML = `Wellcome all from ${userLocation}`;
        })
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

        clearInterval(displayFrameInterval);
        getAnimationFrames();
    }

    /**
   * Function to get animation frames from the animation api using GET request asynchronously
   */
    function getAnimationFrames() {
        if (!token) {
            fetch(TOKEN_URL, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    "username": "mwp",
                    "password": "123"
                })
            })
                .then(response => response.json())
                .then(data => {
                    token = data.token;
                    console.log('token: ' + token);
                    fetchFrames(ANIMATION_URL);
                });
        } else {
            console.log('token: ' + token);
            fetchFrames(ANIMATION_URL);
        }
    }

    /**
     * Function to fetch animation frames asynchronously
     * @param {String} url animation frame url
     */
    function fetchFrames(url) {
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.text())
            .then(data => {
                animationFrames = data.split('=====');
                displayAnimation();
            });
    }

    /**
     * Function to display animation frames
     */
    function displayAnimation() {
        displayFrameInterval = setInterval(() => {
            if (i < animationFrames.length) {
                animationArea.value = animationFrames[i++];
            } else {
                i = 0;
            }
        }, 200);
    }

    /**
     * Function to refresh the animation view asynchronously
     */
    function refreshAnimation() {
        clearInterval(displayFrameInterval);
        i = 0;

        getAnimationFrames();
    }

    /**
     * Function to logout and redirect to the login view
     */
    function logOut() {
        clearInterval(displayFrameInterval);
        i = 0;
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
