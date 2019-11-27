window.onload = myPage;
function myPage() {
    const outlet = document.querySelector("#outlet");

    //to log in to the page when we click the login button
    const loginPage = `<div> 
    <h2>Please Login Here</h2>
    User Name: <input type="text" id="userName" placeholder="mwp" value="mwp"> <br>
    Password: <input type="text" id="passWord" placeholder="123" value="123">
    <button id="toLogin" >LogIn</button>
    </div>`
    outlet.innerHTML = loginPage;
    
    // let xmass=`<img src="x.webp">`
    // outlet.innerHTML = xmass;

    let loginBtn = document.getElementById("toLogin")
    loginBtn.addEventListener("click", login);

    //after we login the animation page will apear when we click the login button
    const animationPage = `<div>
        <h2>Welcome all from</h2>
        <textarea id="animateIt" rows="25" cols="60"> </textarea><br>
        <button id="toAnimate">Refresh Animation</button>
        <button id="toLogout">LogOut</button>
        </div>`

    function login() {
        //when we login the animation page will apear  
        outlet.innerHTML = animationPage;

        let getLocation = document.getElementById("toLogin");
        navigator.geolocation.getCurrentPosition(function (position) {
            (position.coords.latitude, position.coords.longitude);
        })

        let logOutBtn = document.getElementById("toLogout");
        logOutBtn.addEventListener("click", logOut);
    }


    //to refresh all the animations when we click the Refresh Animation button
    function nextAnimation() {

    }
    // let animationBtn = document.getElementById("");
    // animationBtn.addEventListener("click", nextAnimation);



    //to logout from the page when we click the logout button
    function logOut() {
        outlet.innerHTML = loginPage;
    }

};
