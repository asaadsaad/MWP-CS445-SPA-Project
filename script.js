window.onload = domain;
function domain() {
    let token;
    let animationId;
    let animation;
    const outlet = document.querySelector('#outlet');
    const loginArea = `
    <h1>Login</h1>
    Username <input value= 'mwp'/><br/>
    Password <input value= '123'/><br/>
    <button id= 'loginButton'> Login </botton>
      `
    const animationArea = `
        <h1 id= 'location'></h1>
        <textarea id='animation' rows='21' cols='64'></textarea></br>
        <button id='refresh'> referesh animation</button>
        <button id='logout'> Logout</button>
            `
    const refresh = document.querySelector('#refresh');
    login()
    function login() {
        outlet.innerHTML = loginArea;
        let login = document.querySelector('#loginButton')
        login.addEventListener('click', fetchLogin);
        login.addEventListener('click', fetchAddress);

    }
    async function fetchLogin() {
        const response1 = await fetch("http://www.mumstudents.org/api/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                "username": "mwp",
                "password": "123",
            })
        });
        let response = await response1.json();
        console.log(response)
        token = response.token;
        let status = response.status;
        if (status) {
            animation();
        } else {
            outlet.innerHTML += `<p>Authentication faild</p>`
        }
        function animation() {
            outlet.innerHTML = animationArea;
            let refreshButton = document.querySelector('#refresh');
            let logoutButton = document.querySelector('#logout');
            logoutButton.addEventListener('click', logout);
            fetchAnimation()
        }

    }
    function logout() {
        outlet.innerHTML = loginArea;
        login();
    }
    function fetchAddress() {

        navigator.geolocation.getCurrentPosition(success);
        async function success(position, fail) {
            console.log(position);
            let response = await fetch('http://www.mapquestapi.com/geocoding/v1/reverse?key=mNoe0RHDcqAUndeH8CLimq5xKwKFRZK0&location=41.0128248,-91.9599564', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            let newResponse = await response.json();
            console.log(newResponse);
            const city = newResponse.results[0].locations[0].adminArea5;
            const state = newResponse.results[0].locations[0].adminArea3;
            const country = newResponse.results[0].locations[0].adminArea1;
            document.querySelector('#location').innerHTML = `Welcome to ${country} ${city} ${state}`;
        }
        function fail() {
            console.log("Sorry there is a problem");
        }
    }
    async function fetchAnimation() {
        const response = await fetch('http://www.mumstudents.org/api/animation', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/text',
                Authorization: `Bearer ${token}`
            }
        });
        animation = await response.text();
        runingAnimation()
    }
    function runingAnimation() {
        const frames = animation.split('=====\n')
        const framesLength = frames.length;
        let currentFrame = 0;
        animationId = setInterval(() => {
            document.querySelector(`#animation`).innerHTML = frames[currentFrame];
            currentFrame++;
            if (currentFrame === framesLength) {
                currentFrame = 0;
            }
        }, 200);
    }
    refresh.addEventListener("click", function () {
         clearInterval(animationId);
        fetchAnimation()
    })
}
