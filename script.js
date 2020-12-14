const {fromEvent} = rxjs;
import {geoKey} from "./config.js"

(function(){
    const loginTemplate = `
        <h1>Please Login</h1>
        <p>Username <input id='user'></p>
        <p>Password <input id='password'></p>
        <button type="button" id="login">Login</button>`;
    const animationTemplate = `
        <textarea id="animation" autofocus='autofocus' rows='20' cols='40'></textarea><br>
        <span><button id='animate'>Refresh Animation</button> <button id="logout">Logout</button></span>`;
    const div = document.querySelector('#outlet');

    (function renderLogin(){
        div.innerHTML = "";
        div.innerHTML = loginTemplate;
        const login = document.querySelector('#login');
        const observeLogin$ = fromEvent(login, 'click').subscribe(validate); 
        history.pushState({page: 'login'}, null, '/login');
        async function validate(){
            const user = document.querySelector('#user');
            const password = document.querySelector('#password');
            try {
                const response = await fetch('https://cs445-project.herokuapp.com/api/login',
                { method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: user.value, password: password.value})
                })
                const body = await response.json();
                const token = body.token;
                renderAnimation(token);
                observeLogin$.unsubscribe();
            } catch(error){
                console.log(error);
            }
        }
    })();
    function renderAnimation(object){
        div.innerHTML = "";
        navigator.geolocation.getCurrentPosition(async function success(position){
            const coordinates = `${position.coords.latitude},${position.coords.longitude}`;
            const geoposition = await fetch('http://www.mapquestapi.com/geocoding/v1/reverse?key=' + geoKey + '&location=' + coordinates);
            const body = await geoposition.json();
            const h1 = document.createElement('h1');
            div.prepend(`Welcome all from ${body.results[0].locations[0].adminArea4}, ${body.results[0].locations[0].adminArea3}, ${body.results[0].locations[0].adminArea1}`, h1);
            });
        div.innerHTML = animationTemplate;
        const refresh = document.querySelector('#animate');
        const logout = document.querySelector('#logout');
        const animation = document.querySelector('#animation');
        const watchLogout$ = fromEvent(logout, 'click').subscribe(() => {
            renderLogin();
            watchLogout$.unsubscribe();
            watchAnimation$.unsubscribe()});
        const watchAnimation$ = fromEvent(refresh, 'click').subscribe(animate);
        history.pushState({page: 'animation'}, null, '/animation');
        (async function animate(){
            try{
                const response = await fetch('https://cs445-project.herokuapp.com/api/animation', {
                headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXQiOiJNb2Rlcm4gQXN5bmNocm9ub3VzIFByb2dyYW1taW5nIiwiaWF0IjoxNjA3OTE4NzExfQ.2cx6zOti0OFS6xewISy5HE7imhmL04D9VPOQsKynqs4'}
                });
                const results = response.json()
                const results2 = results.body;
                const string = results + '';
                const frames = string.split("====\n");
                let i = 0;
                const animationInterval = setInterval(() => {
                    animation.value = frames[i];
                    i++;
                    if(i = frames.length + 1){
                        i = 0;
                    }
                }, 200);
            } catch(error){
                console.log(error)
            }
        })();
    }
})();
