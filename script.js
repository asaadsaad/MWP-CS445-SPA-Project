//Code for the animation project

"use strict"
window.onload = function () {
    let isLogin = false;


    //Create a HTML Page
    let loginPage = `<h1>Please Login</h1><br>
    Username: <input type="text" id="username"><br>
    Password: <input type="text" id="password"><br>
    <input type="button" id="login" value="Login">`

    let animationPage = `<h1>Welcome all from</h1>
    <h2 id="geolocation"></h2>
    <input type="text" id="animation"><br>
    <button type="button" id="refresh">Refresh Animation</button>
    <button type="button" id="logout">Logout</button>`

    login();
    //function to login to the animation
    function login() {
        //Get the DOM Element to create Login Page
        let outlet = document.querySelector("#outlet");
        outlet.innerHTML = loginPage;

        //Get the DOM Element for Login Page
        let loginButton = document.querySelector("#login");
        let username = document.querySelector("#username");
        let password = document.querySelector("#password");

        //Create EventListener for Login Page
        loginButton.addEventListener("click", insideLogin);

    }


    function animEventList() {
        //Get the DOM Elements once inside the animation page
        let geolocation = document.querySelector("#geolocation");
        let animation = document.querySelector("#animation");
        let refresh = document.querySelector("#refresh");
        let logout = document.querySelector("#logout");

        //Create an EvenListener once inside the animation page
        //refresh.addEventListener("click", getNewAnimation);
        logout.addEventListener("click", logoutOfAnimation);

    }














    //Functions for the EventListenter

    //To login
    function insideLogin() {
        outlet.innerHTML = animationPage;
        isLogin = true;
        animEventList()
    }



    //To logout
    function logoutOfAnimation() {
        if (isLogin) {
            outlet.innerHTML = loginPage;
            isLogin = false;
            login();

        }
    }


}