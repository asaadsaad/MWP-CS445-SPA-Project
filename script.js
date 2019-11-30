window.onload = domain;
function domain() {
    let token;
    let animationId;
    let animation;
    const outlet = document.querySelector('#outlet');
    const loginTemplate = `
    <h1>Login</h1>
    Username <input value= 'mwp'/><br/>
    Password <input value= '123'/><br/>
    <button id= 'loginButton'> Login </botton>
      `
    const animationTemplate = `
        <h1 id= 'location'></h1>
        <textarea id='animation' rows='21' cols='64'></textarea></br>
        <button id='refresh'> referesh animation</button>
        <button id='logout'> Logout</button>
            `
    outlet.innerHTML = loginTemplate;
    loginButton.addEventListener('click', function () {
        let loginButton = document.querySelector('#loginButton')
        fetchLogin();
        outlet.innerHTML = animationTemplate;
        fetchAddress();
        async function fetchLogin() {
            const requist = await fetch("http://www.mumstudents.org/api/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    "username": "mwp",
                    "password": "123",
                })
            });
            let response = await requist.json();
            console.log(response)
            token = response.token;
            let status = response.status;
            if (status) {
                
            } else {
                outlet.innerHTML += `<p>Authentication faild</p>`
            }
            fetchAnimation()
        }
        
        let logoutButton = document.querySelector('#logout')
        logoutButton.addEventListener('click', function(){
            outlet.innerHTML = loginTemplate;
            location.reload()
        });
    
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
            document.querySelector('#refresh').addEventListener('click',_=> history.pushState({page: 1}, " Flag Man", "?page=1"));
            document.querySelector('#refresh').addEventListener('click',_=> history.pushState({page: 2}, " Bicycle", "?page=2"));
            document.querySelector('#refresh').addEventListener('click',_=> history.pushState({page: 3}, " Lader", "?page=3"));
        }
        const refresh = document.querySelector('#refresh');
        refresh.addEventListener("click", function () {
            clearInterval(animationId);
            fetchAnimation()
        })
    
    })

}