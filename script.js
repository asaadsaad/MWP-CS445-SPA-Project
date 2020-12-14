// your code here
window.onload = function () {
    var token, intervalID, frame;
    const ApiKey = "58HRZHHnoCAyde85DRAWpGbqvG3796br";;
    //outlet id from index.html div
    const display = document.querySelector('#outlet');
    //first day - loginpage loginTemplate
    const loginTemplate = `
                <h2>Please Login</h2><br><b>   
                Username: <input placeholder="mwp" value="mwp" id="username"/><br/><br/><b>
                Password: <input placeholder="123" value="123"  id="password"/><br/>
                <button id="login" class="btn btn-success">Login</button> <b>
                <style>
                body{
                    width: 600px;
                    margin: 1em auto;
                }
                </style>
                `
    const animationTemplate = `
                    <div id="address"  style="font-size:20px" style="font-weight:bold"></div>  
                    <textarea id="animation" rows="20" cols="37" style="font-size: 20px"></textarea><br><br>
                    <button id="refresh">Refresh Animation</button><b> 
                    <button id="logout">Logout</button> <b>  
                    <style>
                body{
                    width: 600px;
                    margin: 1em auto;
                }
                </style>     
                    `

    /*loginPage
    will display login templete
    when clicked send an Ajax call to the server to authenticate the user.
     The server should respond back with a token.
     */
    loginPage();
    function loginPage() {
        display.innerHTML = loginTemplate;
        const loginB = document.querySelector('#login');
        history.pushState({ 'page': 1, 'user_id': 'login' }, "", "?login?page=1");
        loginB.addEventListener('click', animationPage);

    }
    /*Animation page contains
    -welcome text and user location , textbox for animation, refresh button and logout button
     */
    function animationPage() {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        console.log("input username", username);
        console.log("input password", password)
        if (username === "mwp" && password === "123") {
            display.innerHTML = animationTemplate;
            history.pushState({ page: 2 }, "animation", "?page=2")
        }
        const logoutB = document.querySelector('#logout');
        logoutB.addEventListener('click', loginPage);
        const refreshB = document.querySelector('#refresh');
        refreshB.addEventListener('click', refreshFun);
        getToken();
    }
    async function getToken() {
        const response = await fetch("https://cs445-project.herokuapp.com/api/login", {
            method: 'POST',
            headers: {
                'Accept': "application/json,text/plain",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'map',
                password: '123456'
            })
        })
        const respondBody = await response.json();
        token = respondBody.token;
        console.log(token)
        geoInfo()
    }
    async function fetchAnimation() {
        const respAnimation = await fetch(' https://cs445-project.herokuapp.com/api/animation', {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        const respondA = await respAnimation.text();
        frame = respondA.split('=====\n');
        document.getElementById('animation').innerHTML = frame;
        // console.log(frame)
        //console.log("animation", respondA)

    }

    function refreshFun() {
        fetchAnimation();

    }
    function geoInfo() {
        navigator.geolocation.getCurrentPosition(success);

        async function success(position) {
            const lat = position.coords.latitude
            const longt = position.coords.longitude
            // console.log('lati', lat)
            // console.log("long", longt)
            let responseF = await fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${ApiKey}&location=${lat},${longt}`);
            resp = await responseF.json();
            //console.log(resp);
            const city = resp.results[0].locations[0].adminArea5
            const state = resp.results[0].locations[0].adminArea3
            const country = resp.results[0].locations[0].adminArea1
            const zip = resp.results[0].locations[0].postalCode
            document.querySelector("#address").innerHTML = `Welcome all from ${city}, ${state}, ${zip}, ${country}!`;
        };
    }
};