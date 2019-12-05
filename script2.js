
function SPA() {
    let arr;
    let i;
    let token;
    let timeid;
    let login = `<h2> Please log in </h2>
    user name: <input type="text" id="username" value="mwp" ><br>
    Passwword: <input type="text" id="password" value="123" ><br>
    <button id="button"> login </button>`

    let animation = `
    <div id="adress">Welcome to SPA Animation</div>
    <textarea name="" id="animation" cols="50" rows="20" style="font-size: 18px;"></textarea> <br>
    <button id="refresh">Refresh Animation</button>
    <button id="logout">Logout</button>`

    /** loads the login templates 
     * 
     */
    function getlogin() {
        history.pushState(login, "document.title", "index.html")
        clearInterval(timeid);
        document.getElementById("outlet").innerHTML = login;


        document.getElementById("button").addEventListener("click", animationpage)
    }
    getlogin();

    /**
     * sends post requeset to the server
     * checks password and username 
     * assign the event listners to the buttuns
     */
    async function animationpage() {

        let username = document.getElementById("username").value
        let password = document.getElementById("password").value
        if (username === "mwp" && password === "123") {

            let result = await fetch("http://mumstudents.org/api/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                })

            let resp = await result.json()
            token = resp

            document.getElementById("outlet").innerHTML = animation
            history.pushState(animation, "document.title", "index.html")
            document.getElementById("refresh").addEventListener("click", gettingtoken);
            document.getElementById("logout").addEventListener("click", getlogin)
            findaddress()
            gettingtoken();
        }
        else {
            alert(" wrong username or password ")
        }
    }
    /** gets token from the server 
     * split the strinng to array of animation 
     */
    async function gettingtoken() {
        let anime = await fetch("http://mumstudents.org/api/animation",
            {
                headers: {
                    "Authorization": ` Bearer ${token.token}`
                }
            })
        let response = await anime.text()
        arr = response.split("=====\n") // array of the animations 
        getAnimation()

    }


    /**display the animation 
     * 
     */
    let getAnimation = function () {


        clearInterval(timeid);
        i = 0
        timeid = setInterval(function () {

            document.getElementById("animation").innerHTML = arr[i]
            i++
            if (i === arr.length) {
                i = 0
            }

        }, 200)

    }
    window.addEventListener("popstate", function () {
        clearInterval(timeid);
        if (history.state === null) {
            clearInterval(timeid);
            document.getElementById("outlet").innerHTML = login
            getlogin();
        }

        getlogin();

    })
    /**get requste from the location from map quest
     * dissplay the location on div
     */
    function findaddress() {
        navigator.geolocation.getCurrentPosition(success)
        async function success(position) {
            let x = position.coords.longitude;
            let y = position.coords.latitude;
            let Address = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=QHd2uOYscxkIZAqAzzwQEWy70b3A8Izg&location=${y},${x}&&includeRoadMetadata=true&includeNearestIntersection=true`)
            let obj = await Address.json()
            let city = obj.results[0].locations[0].adminArea5
            let country = obj.results[0].locations[0].adminArea1;
            document.getElementById("adress").innerHTML = `Well come to ${city} , ${country}`
        }
    }




}

SPA()






