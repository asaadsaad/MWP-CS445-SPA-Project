const user = () => {
    const username = document.getElementById('username').value;
    console.log(username)
    const password = document.getElementById('password').value;
    console.log(password)
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
                getLocation();
            }
        })
}

window.onload = function loginTemp() {
    const logTemp = `<form><label for="task">PLEASE LOGIN FIRST !</label></form><br/>
Username:<input id="username"><br/><br/>
    Password: <input id="password"><br/><br/>
<button id="login" >LOG-IN</button>`
    const div = document.getElementById('outlet')
    div.innerHTML = logTemp;
    document.getElementById("login").addEventListener("click", user);

}

getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geocode);
    } else {
        alert("Sorry, your browser does not support this feature... Please Update your Browser to enjoy it");
    }
}
geocode = (position) => {
    const animTemp = `
    <form><h1>Welcome all from: </h1></form>
    <textarea id="playground" cols=50 rows=50></textarea><br/><br/>
    <button id="refresh" >Refresh Animation</button>  
 <button id="logout" >Log-Out</button> `
    const div = document.getElementById('outlet')
    div.innerHTML = animTemp;
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Current Latitude is ${latitude} and your longitude is ${longitude}`);
    const latlng = latitude + "," + longitude;
    fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=a4NLzenGoJzhK1MowK1UaA1jOR88iE1I&location=${latlng}&includeRoadMetadata=true&includeNearestIntersection=true`)
        .then(res => res.json())
        .then(data => {
            const addres = data.results[0].locations;
            document.querySelector("h1").innerHTML += `${addres[0].adminArea5},${addres[0].adminArea3}
                                                      ,${addres[0].adminArea1}`
        });

}





