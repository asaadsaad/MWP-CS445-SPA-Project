window.onload = function () {
    let loginView, animationView, animationArea, lat, long, userLocation, token, animationFrames = [], displayFrameInterval, i = 0, state, animationCounter = 0;

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

    const ROUTES = {
        '/': loginView,
        '/login': loginView,
        '/animation': animationView
    };

    window.addEventListener('popstate', popstateHandler);

    initialize();

    /**
     * Function to load the initial view
     */
    function initialize() {
        getLatLong();
        state = { data: null, path: '/', userLocation: userLocation, initialState: true };
        history.replaceState(state, null, '/login');
        render(state);
    }

    /**
     * Function to render the state
     * @param {Object} state state to the current view
     */
    function render(state) {
        debugger
        OUTLET.innerHTML = ROUTES[state.path];
        let btns = document.querySelectorAll('button');
        console.log(btns);
        if (btns) {
            btns.forEach((btn) => {
                if (btn.id === 'refresh') {
                    btn.addEventListener('click', refreshAsync);
                } else if (btn.id === 'logout') {
                    btn.addEventListener('click', logOut);
                } else {
                    btn.addEventListener('click', logInAsync);
                }
            });
        }
        let location = getElement('#location');
        if (location) {
            location.innerHTML = `Wellcome all from ${state.userLocation}`;
        }
        if (state.data) {
            displayAnimation(state.data);
        } else {
            displayAnimation(animationFrames);
        }
    }

    /**
     * Function to handle popstate event
     * @param {Event} event 
     */
    function popstateHandler(event) {
        if (event.state) {
            state = event.state;
            render(state);
        }
    }

    /**
     * Function to get the current user lat and long
     */
    function getLatLong() {
        navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            console.log(`lat: ${lat}, long: ${long}`);
        });
    }

    /**
   * Function to get user location asynchronously
   */
    async function getLocationAsync() {
        mapQuestApiUrl = `${QUEST_API_URL}?key=${QUEST_API_KEY}&location=${lat},${long}`;

        let response = await fetch(mapQuestApiUrl);
        return response.json();
    }

    /**
     * Function to load animation view
     */
    async function logInAsync() {
        let address = await getLocationAsync();
        address = address.results[0].locations[0];
        userLocation = `${address.adminArea5}, ${address.adminArea3}, ${address.adminArea1}`;

        await fetchFrameAsync();
        state.initialState = false;
        state.data = animationFrames;
        state.path = '/animation';
        state.userLocation = userLocation;
        history.pushState(state, null, `/animation?${animationCounter++}`);
        render(state);
    }

    /**
     * Function to fetch token asynchronously
     */
    async function getTokenAsync() {
        let response = await fetch(TOKEN_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "username": "mwp",
                "password": "123"
            })
        });

        response = await response.json();
        token = response.token;
    }
    
    /**
     * Function to fetch animation frames asynchronously
     *
     */
    async function fetchFrameAsync() {
        if (!token) {
            await getTokenAsync(); 
        }
        let response = await fetch(ANIMATION_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        let frames = await response.text();
        animationFrames = frames.split('=====');
    }

    /**
     * Function to display animation frames
     */
    function displayAnimation(frames) {
        clearInterval(displayFrameInterval);
        animationArea = getElement('#animationArea');
        console.log(frames.join('====='));

        if (frames.length > 0) {
            displayFrameInterval = setInterval(() => {
                if (i < frames.length) {
                    animationArea.value = frames[i++];
                } else {
                    i = 0;
                }
            }, 200);
        }
    }

    /**
     * Function to refresh the animation view asynchronously
     */
    async function refreshAsync() {
        i = 0;
        await fetchFrameAsync();
        state.initialState = false;
        state.data = animationFrames;
        state.path = '/animation';
        state.userLocation = userLocation;
        history.pushState(state, null, `/animation?${animationCounter++}`);
        render(state);
    }

    /**
     * Function to logout and redirect to the login view
     */
    function logOut() {
        clearInterval(displayFrameInterval);
        i = 0;
        animationFrames = [];
        state.data = animationFrames;
        state.path = '/';
        history.pushState(state, null, `/login`);
        render(state);
    }

    /**
     * Function to get an element using css selector
     * @param {String} selector CSS selector of an HTML element
     */
    function getElement(selector) {
        return document.querySelector(selector);
    }
}
