//your code here

window.onload = function login() {
    let loginTemplate = `<h1>Login Please</h1>
    <input type="text" id="username" placeholder="User name" required /><br><br>
    <input type="text" id="password" placeholder="Passwod" required /><br><br>
    <button type="button" id="loginButton" class="btn btn-primary btn-lg">Login</button>`;
    document.querySelector('div').innerHTML = loginTemplate;

    document.getElementById('loginButton').onclick = async function log() {
        let inputsObj = {}
        inputsObj.username = document.getElementById("username").value
        inputsObj.password = document.getElementById("password").value
        //console.log(inputsObj)

        const fetchedData = await fetch('https://cs445-project.herokuapp.com/api/login', {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputsObj)

        })
        .then(response => response.json())
        .then((response) => { response.status === true? anim(): login()})
        function anim() {
            let animationTemplate = `<h1>Welcome</h1>
            <textarea id="w3review" name="w3review" rows="4" cols="50"></textarea><br><br>
            <button type="button" id="resfreshAnimation" class="btn btn-primary btn-lg">Refresh Animation</button>
            <button type="button" id="logout" class="btn btn-primary btn-lg">Logout</button>`;
            document.querySelector('div').innerHTML = animationTemplate
         }
        //
        // return fetchedData.json()
        // parsedData = await fetchedData.json();
        // console.log(parsedData)
    }
  // JSON data parsed by `data.json()
// function getLocation() {
//     navigator.geolocation.getCurrentPosition(showPosition);
// }
// let latit;
// let longit;
// function showPosition(position) {
//   latit = position.coords.latitude 
//   longit = position.coords.longitude;
// }

// let loc = await fetch('https://open.mapquestapi.com/geocoding/v1/reverse?41.013567099999996,-91.95915409999999')
// let parsedloc = await loc.json();
// console.log(parsedloc)

}
