window.onload = function () {

    let token, timerId, count;
    let outlet = document.getElementById("outlet");

    const loginTemplate =
        `<h1>Please login</h1>
         UserName <input id="un" placeholder="mwp" value="mwp"/> <br>
         Password <input id = "pw" value="123"/> <br>
         <button id="login">Login</button>`;

    /*Animation HTML template that holds the textarea to hold the animations
    having two buttons to refresh and logout from the animation
     */
    const animationTemplate =
        `<div id="address">Welcome to SPA Animation</div>
        <textarea name="" id="animation1" cols="50" rows="20" style="font-size: 18px;"></textarea> <br>
        <button id="refresh">Refresh Animation</button>
        <button id="logout">Logout</button>`;

    /**asyn function that fetches the animation using the Get,
    displayes the animations to the user.
    pushes the pages into history. 
     */
    getAnimation = async function () {
        history.pushState("refresh", "title 2", "?Animation2")

        clearInterval(timerId);

        const result = await fetch('http://www.mumstudents.org/api/animation', {

            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const obj = await result.text()
        const animeString = obj.split("=====\n");
        const mylength = animeString.length;
        count = 0;

        timerId = setInterval(function () {

            document.getElementById("animation1").innerHTML = animeString[count];
            count++

            if (count === mylength) {
                count = 0;
            }
        }, 200);

    }

    /**locates the users place by fetching from mapquestapi 
       after sending  the key, longutiude, and latitutude.
     */
    function geolocation() {

        let Key = "nOkTZJzGcN8wKdZbHtemhMf4zHkvJBVG";

        navigator.geolocation.getCurrentPosition(success);

        async function success(position) {

            long = position.coords.longitude;
            lat = position.coords.latitude;

            let theLocation = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${Key}&location=${lat},${long}&includeRoadMetadata=true&includeNearestIntersection=true`)
            theLocation = await theLocation.json()

            const city = theLocation.results[0].locations[0].adminArea5;
            const state = theLocation.results[0].locations[0].adminArea3;
            const address = document.getElementById('address')
            address.innerHTML = `welcome all from ${city}, ${state}`;
        }
    }

    /*  login button function, 
    takes into the animation page.
     */
    function login() {

        clearInterval(timerId);
        outlet.innerHTML = loginTemplate;
        const loginPage = document.getElementById("login");
        loginPage.addEventListener("click", animationPage);
        history.pushState("logout", "title 1", "?page =login");
        // 
    }
    login();

    /**this async function fetches the animation, after checking the passward and 
    user name.
    two listeners for logging out and refreshing the animation page
     */
    async function animationPage() {

        const userName = document.getElementById("un");
        const passWord = document.getElementById("pw");

        if (userName.value === "mwp" && passWord.value === "123") {

            const response = await fetch('http://mumstudents.org/api/login',
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: "mwp", password: "123" })
                })

            const myresponse = await (response.json());
            token = myresponse.token;
            outlet.innerHTML = animationTemplate;

            geolocation();

            history.pushState("login", "title 1", "?page =Animation");

            const logOut = document.getElementById("logout");
            const refresh = document.getElementById("refresh");

            logOut.addEventListener("click", login);
            refresh.addEventListener("click", getAnimation);
        }

        else {
            alert("wrong password ")
        }
    }

    /**
     * @param  {} "popstate" method to pop out history
     * @param  {} function @ pops history states from the history array
     */
    window.addEventListener("popstate", function () {
        if (history.state === animationTemplate) {
            clearInterval(timerId);
            animationPage()
        }
        else {

            clearInterval(timerId);
            login()
        }
    })
}











