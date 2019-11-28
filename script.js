window.onload = SPA;

function SPA() {

    // select
    let outlet = document.querySelector("#outlet");
    let token;
    let timerId;



    // login template

    let loginTemplate = `
    <h1>Please Login</h1>
    Username : <input type="text" id="username" placeholder="mwp" value="mwp"><br>
    Password : <input type="text" id="password" placeholder="123" value="123"><br>
    <button id="login">Login</button>
    `
    // animation template
    let animationTemplate = `<div id="location" style="font-size :20px">welcome to my animation spa</div>
    <textarea id="display" row="40" cols="40" style="font-size:20px"></textarea><br>
    <button id="refresh" >Refresh Animation</button>
    <button id="logout">Logout</button>
    `


    // listneer

    //check
    let addPost = async function () {
        let username = document.querySelector("#username").value;
        let password = document.querySelector("#password").value;
        let res = await fetch('http://www.mumstudents.org/api/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        let response = await res.json();
        token = response.token;
        animationPage();
        getPost();

    }

    let getPost = async function () {
        if (timerId) {
            clearInterval(timerId)
        }
        let resolve = await fetch("http://www.mumstudents.org/api/animation", {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })

        let data = await resolve.text();
        let array = data.split("=====\n")
        console.log(array)
        let index = 0;
        timerId = setInterval(() => {
            document.querySelector("#display").value = array[index];
            index++;
            if (index == array.length) {
                index = 0;
            }
        }, 200)

        //document.querySelector('#display').innerHTML = array;

    }

    // Find location of the user using API key & location(longitude & latitude) - reverse geocode

    function location() {

        navigator.geolocation.getCurrentPosition(success, fail);

        async function success(position) {
            let key = "Q6NBLIK5NWGiVhHZwd4vZyiw4A1IgD9Z";
            let lng = position.coords.longitude;
            let lat = position.coords.latitude;
            console.log(position)
            let address = await fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${key}&location=${lat},${lng}&includeRoadMetadata=true&includeNearestIntersection=true`)

            address = await address.json();
            let city = address.results[0].locations[0].adminArea5;
            let state = address.results[0].locations[0].adminArea3;
            let country = address.results[0].locations[0].adminArea1;
            document.querySelector("#location").innerHTML=`welcome all from ${city},${state},${country}`;

        }


        function fail(msg) {
            console.log(msg.code + msg.message);
        }

    }

    function loginPage() {
        outlet.innerHTML = loginTemplate;
        
    }
    loginPage()
    document.querySelector("#login").addEventListener("click", addPost);

    function animationPage() {
        outlet.innerHTML = animationTemplate;
        document.querySelector("#logout").addEventListener("click", loginPage);
        document.querySelector("#refresh").addEventListener("click", getPost);
        location()
        
    
    }

}