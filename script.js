// your code here
window.onload = function () {
    let token, intervalID, geoApiKey;
    //outlet id from index.html div
    const display = document.querySelector('#outlet');
    //first day - loginpage
    const loginTemp = `
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
    /*loginPage
    will display login templete
    when clicked send an Ajax call to the server to authenticate the user.
     The server should respond back with a token.
     */
    loginPage();
    function loginPage() {
        display.innerHTML = loginTemp;
        const loginB = document.querySelector('#login');
        loginB.addEventListener('click', getToken);

    }
    /*Animation page contains
    -welcome text and user location , textbox for animation, refresh button and logout button
     */
    // JSON.stringify({
    //     "username": 'mwp', 'password': '123'
    // })
    async function getToken() {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        console.log("input username", username);
        console.log("input password", password)
        let data = {
            username: 'mwp',
            password: '123'
        }
        let response = await fetch('https://cs445-project.herokuapp.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': 'mwp',
                'password': '123'
            })
        })
        let respondBody = await response.json();
        console.log(respondBody)
    }

};
