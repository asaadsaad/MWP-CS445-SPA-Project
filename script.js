// The div will display the login page when the page loads by calling the login function, 
// The function log will send a fetch request with the name and password entered as input when the login button is clicked.
// Once the inputs are matching the page will greet the user with location.
// the div will display the template page when the user is logged in.
// The page will send a second request for a new frames everytime the user clicks the refresh button.
// The div will display the login page again when the user clicks log out button.

window.onload = function login() {
    let loginTemplate = `<h1>Login Please</h1>
    <input type="text" id="username" placeholder="User name" required /><br><br>
    <input type="text" id="password" placeholder="Passwod" required /><br><br>
    <button type="button" id="loginButton" class="btn btn-primary btn-lg">Login</button>`;
    document.querySelector('div').innerHTML = loginTemplate;
    
    

    document.getElementById('loginButton').onclick = async function log() {
        let inputsObj = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
        //console.log(inputsObj)
        }

        const fetchedData = await fetch('https://cs445-project.herokuapp.com/api/login', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputsObj)

        })

            .then(response => response.json())

            .then((response) => { response.status === true ? animationPage() : login() })

        function animationPage() {
            let animationTemplate = `<h1>Welcome</h1>
            <textarea id="animation" name="anim" rows="20" cols="50"></textarea><br><br>
            <button type="button" id="refreshAnimation" class="btn btn-primary btn-lg">Refresh Animation</button>
            <button type="button" id="logout" class="btn btn-primary btn-lg">Logout</button>`;
            document.querySelector('div').innerHTML = animationTemplate;
            document.getElementById('refreshAnimation').onclick = refreshing;
            document.getElementById('logout').onclick = loggingOut;
            
        }
        getLocation()
        
    }
    
    function getLocation() {
        navigator.geolocation.getCurrentPosition(showPosition);
    }

    function showPosition(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        // console.log(latitude)
        // console.log(longitude)
        greeterWithLocation()
        animFetch()
    }

    async function greeterWithLocation() {
        let loc = await fetch('http://open.mapquestapi.com/geocoding/v1/reverse?key=soAPyBnsVHIA5KhbILyUTH4vDfYI1Tno&location=41.013567099999996,-91.95915409999999&includeRoadMetadata=true&includeNearestIntersection=true')
        // console.log(loc)
        let parsedloc = await loc.json();
        //console.log(parsedloc)
        let cityStateCountry = parsedloc.results[0].locations[0].adminArea5 + ", " + parsedloc.results[0].locations[0].adminArea3 + ", " + parsedloc.results[0].locations[0].adminArea1 + "!";
        document.querySelector('h1').innerHTML = `<h4>Welcome all from ${cityStateCountry}</h4>`
    }
    let timerid;
    let animArray;
    let tok = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXQiOiJNb2Rlcm4gQXN5bmNocm9ub3VzIFByb2dyYW1taW5nIiwiaWF0IjoxNjA3OTg0MzEzfQ.zdugpxz3FKBdEXbf0nuXeDhI1zVzqrXYDv_OmYkzCbA",
        status: true
    }
    let animFetch = async function () {
        let fetchedFrames = await fetch('https://cs445-project.herokuapp.com/api/animation', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + tok.token,
            },
        })
        let recievedAnimation = await fetchedFrames.text();
        animArray = recievedAnimation.split("=====\n");
        let tempIndex = 0
        timerid = setInterval(function () {
            document.getElementById("animation").innerHTML = animArray[tempIndex]
            tempIndex++;
            if (tempIndex === animArray.length) {
                tempIndex = 0
            }

        }, 200)

    }
    
      function refreshing() {
          clearInterval(timerid);
          document.querySelector('textarea').innerHTML = animFetch();
      }
    
     function loggingOut() {
         clearInterval(timerid)
         document.querySelector('div').innerHTML = loginTemplate;
         
     }

}


