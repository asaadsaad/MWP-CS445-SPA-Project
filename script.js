window.onload = myPage;
function myPage() {
    const outlet = document.querySelector("#outlet");
    let myToken, display, animations, time;
    //const loginRoute = document.getElementById("loginView");

    //create a router
    // const Router = function (name, routes) {
    //     return {
    //         routerName: name,
    //         routers: routes
    //     }
    // };
    // const myRouter = new Router("myRouter", [
    //     {
    //         path: "/",
    //         name: "Root"
    //     },
    //     {
    //         path: "/animation",
    //         name: "animation"
    //     }
    // ]);

    //to log in to the page when we click the login button and the animation page will apear
    const loginPage = `<div id="loginView"> 
    <h2>Please Login Here</h2>
    User Name: <input type="text" id="userName" placeholder="mwp" value="mwp"> <br>
    Password: <input type="text" id="passWord" placeholder="123" value="123"> <br>
    <button id="toLogin" >LogIn</button>
    </div>`
    outlet.innerHTML = loginPage;


    let loginBtn = document.getElementById("toLogin")
    loginBtn.addEventListener("click", login);

    //after we login the animation page will apear when we click the login button
    const animationPage = `<div id="animationView">
        <h2 id="greet"></h2>
        <textarea id="animateIt" rows="23" cols="55"> </textarea><br>
        <button id="nextAnimation">Refresh Animation</button>
        <button id="toLogout">LogOut</button>
        </div>`
    //login function that log in to the page when we click the login button
    function login() {
        //debugger;
        //when we login the animation page will apear with refresh and logout button  
        outlet.innerHTML = animationPage;
        //apear inside the login page and asks for a permission to detect the location
        togetLocation();
        //fetched the token inside the login page 
        fetchToken();
        //apear inside the login page and displayed with motion
        display = document.getElementById("animateIt");
        //refresh and goes to the next animation when we click the refresh animation button
        let animationBtn = document.getElementById("nextAnimation");
        animationBtn.addEventListener("click", fetchAnimation);
        //logs out when we click the logout button
        let logOutBtn = document.getElementById("toLogout");
        logOutBtn.addEventListener("click", logOut);
    };


    //to find the location where ever we go in all the places where gps is available
    function togetLocation() {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            let locationURL = `http://www.mapquestapi.com/geocoding/v1/reverse?key=CPGaa6cjsTFg0WWn33Wt53bH2n2l0TvQ&location=${lat},${long}&includeRoadMetadata=true&includeNearestIntersection=true`;
            fetch(locationURL)
                .then((res) => res.json())
                .then((position) => {
                    let city = position.results[0].locations[0].adminArea5;
                    let state = position.results[0].locations[0].adminArea3;
                    let country = position.results[0].locations[0].adminArea1;
                    let getLocation = document.getElementById("greet");
                    getLocation.innerHTML = `Welcome all from ${city}, ${state}, ${country}`;
                });
        });
    };


    //to fetch the token from the given url and i will get the token after i fetch.
    //myToken = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtd2EiLCJpc3N1ZWRBdCI6IjIwMTktMTEtMjciLCJ1c2VybmFtZSI6Im13cCJ9.U9ciwh5lcPwFlJdxhNQkeiMc7AMYAnawfKNidw8CNDpTIUjNBL_EtDqkXG4qGOF8H_Ve1S2Gg2PwmCYOkfgmWA`
    function fetchToken() {
        const URL = `http://mumstudents.org/api/login `
        fetch(URL, {
            method: "POST",
            headers: { "content-type": 'application/json' },
            body: JSON.stringify({
                "username": "mwp",
                "password": "123"
            })
        })
            .then((res) => res.json())
            .then(data => {
                myToken = data.token;
                //console.log(myToken)
                fetchAnimation();
            })
    };


    //to get all the animations text when we log in to the page using promise or async/await
    // function fetchAnimation() {
    //     const animationURL = `http://mumstudents.org/api/animation `
    //     fetch(animationURL, {
    //         method: "GET",
    //         headers: {
    //             'Authorization': `Bearer ${myToken}`
    //         }
    //     })
    //         .then((res) => res.text())
    //         .then(data => {
    //             animations = data.split('=====\n');
    //             //console.log(data)
    //             // history.pushState(loginPage, null, "/");
    //             history.pushState(animations, null, "/animation");


    //             if (time) { clearInterval(time) }
    //             animate();
    //         });
    // };

    async function fetchAnimation() {
        let anim_frame = await fetch(`http://mumstudents.org/api/animation `, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${myToken}`
            }
        })
        let data = await anim_frame.text();
        animations = data.split('=====\n');
        //console.log(data)
        // // history.pushState(loginPage, null, "/");
        // history.pushState(animations, null, "/animation");
        if (time) { clearInterval(time) }
        animate();
    }


    //to animate the animation that is wrote in a text
    function animate() {
        let index = 0;
        time = setInterval(() => {
            display.innerHTML = animations[index];
            index++;
            if (index === animations.length) {
                index = 0;
            }
        }, 200);
    };


    //to handle the history changes
    window.addEventListener("popstate", function () {
        clearInterval(time)
        document.getElementById("animateIt").innerHTML = history.state;
        animate();

    })
    // window.addEventListener("popstate", function () {
    //     document.getElementById("loginView").innerHTML = history.state;
    // })


    //to logout from the page when we click the logout button
    function logOut() {
        //displays the login page after we log out
        outlet.innerHTML = loginPage;

        let loginBtn = document.getElementById("toLogin")
        loginBtn.addEventListener("click", login);

        clearInterval(time)

    };

};
