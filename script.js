window.onload = SPA;

function SPA() {

    // select
    let outlet = document.querySelector("#outlet");
    let token, animationId;


    // login template

    let loginTemplate = `
    <h1>Please Login</h1>
    Username : <input type="text" id="username" placeholder="mwp" value="mwp"><br>
    Password : <input type="text" id="password" placeholder="123" value="123"><br>
    <button id="login">Login</button>
    `
    // animation template
    let animationTemplate = `<div id="location" style="font-size :20px">Welcome message from</div>
    <textarea id="display" row="40" cols="40" style="font-size:20px"></textarea><br>
    <button id="refresh" >Refresh Animation</button>
    <button id="logout">Logout</button>
    `
    //check
    outlet.innerHTML = loginTemplate;



    // addPost
    document.querySelector("#login").addEventListener("click", addPost);
    // document.querySelector("#login").addEventListener("click", x);



    function addPost() {

        let username = document.querySelector("#username").value;
        let password = document.querySelector("#password").value;
        fetch('http://www.mumstudents.org/api/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'

                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(res => res.json())
            .then((data) => {
                token = data.token;
                //console.log(data);
                //console.log(token);
            })
            .catch(error => console.log(error));


        outlet.innerHTML = animationTemplate

        fetch("http://www.mumstudents.org/api/animation", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            .then((res) => res.text())
            .then(data => document.querySelector("#display").innerHTML = (data))


        //setTimeout(() => console.log(token), 3000)



    }

    

}