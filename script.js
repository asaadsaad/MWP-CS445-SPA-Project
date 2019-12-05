window.onload = function () {
    let token;
    const mapsKey = `CSFyNjI9A2gLtHH9xNLjS7oOQGpjaHED`;
    const loginPage = `<h3>Please Login</h3>Username <input id="username" type="text"><br>
Password <input id="password" type="text"><br>
<button id="loginId">Login</button>`
    // templates
    const animationPage = `    <h3 id="location">
                </h3>
                <textarea id="textarea" cols="70" rows="20"></textarea><br>
                <button id="refAnimBtn">Refresh Animation</button>
                <button id="logoutButn">Logout</button>`
    // render function
    function render(template, node) {
        node.innerHTML = template;
    }
    // DOM elements
    const outlet = document.querySelector("#outlet");

    render(loginPage, outlet);
    const loginBtn = document.querySelector("#loginId");
    loginBtn.addEventListener("click", loadAnimationPage);
    function loadAnimationPage() {
        render(animationPage, outlet);
        logOutBtn();
        getLocation();
        allAnimationFunc();
    }
    // Log out function

    function logOutBtn() {
        document.querySelector("#logoutButn").addEventListener("click", logOutFunc);
        function logOutFunc() {
            render(loginPage, outlet);
        }
    }

    // get position 

    function getLocation() {

        navigator.geolocation.getCurrentPosition(success, failed);
        async function success(position) {

            const res = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${mapsKey}&location=${position.coords.latitude},${position.coords.longitude}`)
            const obj = await res.json();
            const locationObj = obj.results[0].locations;
            const location = document.querySelector("#location")
            location.innerHTML = `Welcome to ${locationObj[0].adminArea5},${locationObj[0].adminArea3},${locationObj[0].adminArea1}`;
        }
        function failed() {
            location.innerHTML = `YOUR LOCATION NOT RECOGNIZED`;
        }
    }

    // fetch the Token

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

    
    // fetch the Animation
    
    let interval = '';

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

    //animate the fetched data from server 

    function allAnimationFunc() { 
        document.querySelector("#refAnimBtn").addEventListener("click", animate);

    }
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
}




