
    let interval = '';
    let token;
    const mapsKey = `CSFyNjI9A2gLtHH9xNLjS7oOQGpjaHED`;
    // templates
    const loginPage = `<h3>Please Login</h3>Username <input id="username" placeholder="mwp" type="text"><br>
Password <input id="password" placeholder="123"  type="text"><br>
<button id="loginId">Login</button>`;

    const animationPage = `    <h3 id="location">
                </h3>
                <textarea id="textarea" cols="60" rows="30"></textarea><br>
                <button id="refAnimBtn">Refresh Animation</button>
                <button id="logoutButn">Logout</button>`

    /**
     * 
     * @param {string} template the template to render
     * @param {object} node the element to render in to
     */
    function render(template, node) {
        node.innerHTML = template;
    }

    /**
     * login 
     */
    function login() {
        const outlet = document.querySelector("#outlet");
        history.pushState({ page: 1 }, null, '?login')
        render(loginPage, outlet);
    }
    login()

    // pop state
    window.addEventListener('popstate', function (event) {
        if (event.state.page === 1) {
            clearInterval(interval)
            login();
        } else {
            clearInterval(interval)
            animationButton();
        }
    })

    const loginBtn = document.querySelector("#loginId");
    loginBtn.addEventListener("click", loadAnimationPage);
    /**
     * load the animation page in to the div 
     */
    function loadAnimationPage() {
        render(animationPage, outlet);
        logOutBtn();
        getLocation();
        animationButton();
        animate()
    }
    // Log out function

    function logOutBtn() {
        document.querySelector("#logoutButn").addEventListener("click", logOutFunc);
        function logOutFunc() {
            render(loginPage, outlet);
        }
    }

    /**
     * get the location of the user
     */
    function getLocation() {

        navigator.geolocation.getCurrentPosition(success, failed);
        /**
         * 
         * @param {object} position an html object that has latitude and longitude
         */
        async function success(position) {

            const res = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${mapsKey}&location=${position.coords.latitude},${position.coords.longitude}`)
            const obj = await res.json();
            const locationObj = obj.results[0].locations;
            const location = document.querySelector("#location")
            location.innerHTML = `Welcome to ${locationObj[0].adminArea5},${locationObj[0].adminArea3},${locationObj[0].adminArea1}`;
        }
        /**
         * if the location fails
         */
        function failed() {
            location.innerHTML = `YOUR LOCATION NOT RECOGNIZED`;
        }
    }


    /**
     * fetch the token 
     */
    async function fetchToken() {
        const tokenResponse = await fetch("http://mumstudents.org/api/login", {
            method: "POST",
            headers: {
                "Accept": "application/json,text/plain,*/*",
                'content-Type': "application/json"
            },
            body: JSON.stringify(
                {
                    "username": "mwp",
                    "password": "123"
                })
        })
        const tokenObj = await tokenResponse.json();
        token = tokenObj.token;
    }
    /**
     * fetch the animation
     */
    async function fetchAnimation() {

        await fetchToken();
        if (interval) clearInterval(interval);
        const animationResponse = await fetch("http://www.mumstudents.org/api/animation", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });
        const animationArr = await animationResponse.text();
        return animationArr;

    }


    /**
     * animation button to trigger the animation
     */
    function animationButton() {
        document.querySelector("#refAnimBtn").addEventListener("click", animate);
        history.pushState({ page: 2 }, null, '?Animation')

    }
    /**
     * do the actual animation/animate the fetched data from server
     */
    function animate() {
        fetchAnimation().then(function (animationArr) {
            const eachString = animationArr.split('=====');

            let count = 0;
            let textElement = document.querySelector("#textarea");
            interval = setInterval(function () {
                textElement.innerHTML = eachString[count++];
                if (count == eachString.length) { count = 0; }
            }, 200);
        });
    }





