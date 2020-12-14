"use strict";
/* eslint-disable */


window.onload = application
function application() {
    let loginPage = ` 
    <h1> Please login </h1>
    UserName: <input id="UserName" type="text" value= "mwp"></br>
    PassWord: <input id="password" type="text"value= "123"></br>
    <button type="button" id="login">Login</button>`;

    let animationPage = `
    <h1 id="locationstatus"></h1>
    <textarea id="textarea" rows="20" cols="50"></textarea></br>
    <button type="button" id="refresh">Refresh Animation</button>
    <button type="button" id="logout">Logout</button>`;

    let div = document.querySelector("#outlet");
    div.innerHTML = loginPage;

    let login = document.querySelector("#login")
    login.addEventListener("click", loginFunc);



    function loginFunc() {
        div.innerHTML = animationPage;
        login = true;
        addEvent()
    };

    function addEvent() {
        if (login) {
            let header=document.querySelector("#locationstatus")
            let text = document.querySelector("#textarea");
            let Refresh_Animation = document.querySelector("#refresh");
            let logout = document.querySelector("#logout");
            logout.addEventListener("click", logoutFunc);
            status = document.querySelector("#status");
        }
    }

    function logoutFunc() {
        // console.log("hamid")
        login = false;
        addEvent();
        div.innerHTML = loginPage;
        window.location.reload();
    };

}