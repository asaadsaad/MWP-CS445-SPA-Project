window.onload = function loginTemp() {

    const logTemp = `<form><label for="task">PLEASE LOGIN FIRST !</label></form><br/>
Username:<input id="username"><br/><br/>
    Password: <input id="password"><br/><br/>
<button id="login" >LOG-IN</button>`
    const div = document.getElementById('outlet')
    div.innerHTML = logTemp;
    document.getElementById("login").addEventListener("click", user);


    function user() {
        const username = document.getElementById('username').value;
        console.log(username);
        const password = document.getElementById('password').value;
        console.log(password);
        getToken()
        function getToken() {
            fetch("https://cs445-project.herokuapp.com/api/login", {
                method: "POST",
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status) {
                        gameTemp(data.token);
                    }
                });
        }

        function gameTemp(token) {

            const animTemp = `
            <form><h1>Welcome all from: </h1></form>
            <textarea id="playground" cols=70 rows=30></textarea><br/><br/>
            <button id="refresh" >Refresh Animation</button>  
         <button id="logout" >Log-Out</button> `
            const div = document.getElementById('outlet')
            div.innerHTML = animTemp;

            let timerId;

            fetch("https://cs445-project.herokuapp.com/api/animation", {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(res => res.text())

                .then(data => {
                    const pics = data.split("=====\n");
                    let index = -1;
                    timerId = setInterval(() => {
                        ++index;
                        if (index >= pics.length) {
                            index = 0;
                        }
                        document.getElementById('playground').innerHTML = pics[index]
                    }, 200);
                })
            document.getElementById("refresh").addEventListener("click", function () {
                clearInterval(timerId);
                getToken();
            });
            document.getElementById("logout").addEventListener("click", function () {
                clearInterval(timerId);
                loginTemp();
            });

            function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(geocode);
                } else {
                    alert("Sorry, your browser does not support this feature... Please Update your Browser to enjoy it");
                }

                function geocode(position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    console.log(`Current Latitude is ${latitude} and your longitude is ${longitude}`);
                    const latlng = latitude + "," + longitude;
                    fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=a4NLzenGoJzhK1MowK1UaA1jOR88iE1I&location=${latlng}&includeRoadMetadata=true&includeNearestIntersection=true`)
                        .then(res => res.json())
                        .then(data => {
                            const addres = data.results[0].locations;
                            document.querySelector("h1").innerHTML += `${addres[0].adminArea5},${addres[0].adminArea3}
                                                                  ,${addres[0].adminArea1}`;
                        });
                }
            }
            getLocation()
        }
    }
}
