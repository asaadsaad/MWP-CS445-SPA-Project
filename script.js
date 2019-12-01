
function SPA() {
    //let timeid2;
    let i;
    let token;
    let timeid;
    let login = `<h2> Please log in </h2>
    user name: <input type="text" id="username" value="mwp"><br>
    Passwword: <input type="text" id="password" value="123"><br>
    <button id="button"> login </button>`

    let animation = `
    <div id="adress">Welcome to SPA Animation</div>
    <textarea name="" id="animation" cols="50" rows="20" style="font-size: 18px;"></textarea> <br>
    <button id="refresh">Refresh Animation</button>
    <button id="logout">Logout</button>`

    async function getlogin() {
        clearInterval(timeid);
        document.getElementById("outlet").innerHTML = login;
        history.replaceState(login, "document.title", "index.html")

        let sema = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }

        let result = await fetch("http://mumstudents.org/api/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sema)
            })
        let resp = await result.json()
        token = resp
        document.getElementById("button").addEventListener("click", animationpage)



    }
    getlogin();

    function animationpage() {


        document.getElementById("outlet").innerHTML = animation
        //  document.getElementById("refresh").addEventListener('click', _ => history.pushState({ page: 2 }, "index.html", "?animation"))

        document.getElementById("logout").addEventListener("click", getlogin)
        document.getElementById("refresh").addEventListener("click", getAnimation);
        findaddress()
        //history.pushState({id:"animation"},"login", "?animation")
    }
    //window.addEventListener("popstate",(event)=>{JSON.stringify(event.state)})



    // let gettoken = async function () {

    //     let result = await fetch("http://mumstudents.org/api/login",
    //         {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(sema)
    //         })
    //     let resp = await result.json()
    //     token = resp


    //     final();


    // }
    let getAnimation = async function () {

        let anime = await fetch("http://mumstudents.org/api/animation",
            {
                headers: {
                    "Authorization": ` Bearer ${token.token}`
                }
            })
        let response = await anime.text()
        let y = response.split("=====\n")

        history.pushState(y, document.title, "index.html")

        clearInterval(timeid);
        i = 0
        timeid = setInterval(function () {

            document.getElementById("animation").innerHTML = y[i]
            //console.log(y[0])
            i++
            if (i === y.length) {
                i = 0
            }

        }, 200)

    }

    window.addEventListener("popstate", function () {
        clearInterval(timeid);
        if (history.state === login || history.state===null ) {
            clearInterval(timeid);
            document.getElementById("outlet").innerHTML = login;
            getlogin();
            
        }
        i = 0;
        if (history.state !== login ) {

            timeid = setInterval(function () {

                document.getElementById("animation").innerHTML = history.state[i];
                i++
                if (i === history.state.length) {
                    i = 0
                }

            }, 200)
        }

    })
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






