/* eslint-disable require-jsdoc */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable strict */
window.onload = function () {
    const loginPage = `<h1> Please login</h1>
Username <input type="text" placeholder="mwp" value = "mwp"/> <br>
Password <input type="text" placeholder="123" value = "123"/> <br>
<button id ="logInButton">Login</button> <br>`;
    const animationPage = `
        <textarea name=" Welcome all from " id="" cols="60" rows="20"></textarea><br>
        <button id ="Refanimation">Refresh Animation</button> 
        <button id ="logoutid">Logout</button> <br>`;

    let outlet = document.getElementById("outlet");
    outlet.innerHTML = loginPage; //autoloading log in page

    let loginBtn = document.getElementById("logInButton");
    loginBtn.addEventListener("click", nextPage);  //to go to animation page
    
    function nextPage() {
        outlet.innerHTML = animationPage;
        redirectingPage();                //to load the second page
    }
    function redirectingPage() {
        let myLogOut = document.getElementById("logoutid");
        //  let tex
        myLogOut.addEventListener("click", function () {
            outlet.innerHTML = loginPage;
        })

    }
}