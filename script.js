function app() {
    let loginTemplate = `
    <h2> Please log in </h2>
    user name: <input type="text" id="username" value="map"><br>
    Passwword: <input type="text" id="password" value="123456"><br>
    <button id="button"> login </button>
    `
    document.querySelector("#outlet").innerHTML = loginTemplate;

}

app();

const loginInfo = {
    username: document.querySelector("#username").value,
    password: document.querySelector("#password").value
}

function getToken() {
    return function SPA() {
        return fetch("https://cs445-project.herokuapp.com/api/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginInfo)
            })
    }
}
const shizi = getToken()
shizi().then((response) => { return response.json() })
    .then((obj) => {
        token = obj;
        console.log(token)
    });



function getanimationpage() {

    const animationTemplate = `
    <div id="adress">Welcome to SPA Animation</div>
    <textarea name="" id="animation" cols="50" rows="20" style="font-size: 18px;"></textarea> <br>
    <button id="refresh">Refresh Animation</button>
    <button id="logout">Logout</button>
    `
    document.querySelector("#outlet").innerHTML = animationTemplate
    let timerID;

    const loginTemplate = `
    <h2> Please log in </h2>
    user name: <input type="text" id="username" value="map" ><br>
    Passwword: <input type="text" id="password" value="123456" ><br>
    <button id="button"> login </button>
    `

    function login() {
        history.pushState(loginTemplate, "document.title", " ?page= index.html")
        clearInterval(timerID);
        document.querySelector("#outlet").innerHTML = loginTemplate;


        document.querySelector("button").addEventListener("click", animationpage)
    }
    login();
    async function animationpage() {

        let username = document.querySelector("#username").value
        let password = document.querySelector("#password").value
        if (username === "map" && password === "123456") {

            const result = await fetch("https://cs445-project.herokuapp.com/api/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                })

            const response = await result.json()
            token = response

            document.querySelector("#outlet").innerHTML = animationTemplate
            history.pushState(animationTemplate, "document.title", "? page = animation.html")
            getAnimation();

            document.querySelector("#logout").addEventListener("click", login)
            document.querySelector("#refresh").addEventListener("click", getAnimation);
            fetchaddress()
        }
        else {
            alert(" wrong username or password ")
        }
    }
    const getAnimation = async function () {

        const reply = await fetch("https://cs445-project.herokuapp.com/api/animation",
            {
                headers: {
                    "Authorization": ` Bearer ${token.token}`
                }
            })
        const response = await reply.text()
        const result = response.split("=====\n")
        clearInterval(timerID);
        let i = 0
        timerID = setInterval(function () {

            document.querySelector("#animation").innerHTML = result[i]
            i++
            if (i === result.length) {
                i = 0
            }

        }, 200)

    }
    window.addEventListener("popstate", function () {
        clearInterval(timerID);
        if (history.state === null) {
            clearInterval(timerID);
            document.querySelector("#outlet").innerHTML = loginTemplate
            login();
        }
        document.querySelector("#outlet").innerHTML = history.state;
        clearInterval(timerID);
        login();

    })

    function fetchaddress() {
        navigator.geolocation.getCurrentPosition(success)
        async function success(position) {
            const long = position.coords.longitude;
            const lat = position.coords.latitude;
            const Address = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=QHd2uOYscxkIZAqAzzwQEWy70b3A8Izg&location=${lat},${long}&&includeRoadMetadata=true&includeNearestIntersection=true`)
            const response = await Address.json()
            const city = response.results[0].locations[0].adminArea5
            const country = response.results[0].locations[0].adminArea1;
            document.querySelector("#adress").innerHTML = `Well come to ${city} , ${country}`
        }
    }

}



document.querySelector("#button").addEventListener("click", getanimationpage)

