// your code here
/*===========================================================================
===Singla Page Animation retriving data from online server and animate=======
===============================String========================================*/
/**
 * when the window load directly find the announmous function 
 * and inside the login page invoked the it redirect to it .
 */

window.onload = function () {

    //variable which we need to the next path
    let mykey = "KjP5zwaRx5DO6MDhmIMI9fMtKsksKA1W";
    let longitude, latitude, token, animatedstring;
    let div = document.getElementById("outlet");

    //DOM which is added into div area when the window is loaded
    const templatelogin = `<div id="logindiv">

    <h1>Please Login</h1>
    <hr><hr>
    Username: <input type="text" id="username" placeholder="map"><br><hr>
    Password: <input type="text" id="password" placeholder="123456"><br><hr>
    <input type="button" id="login" class="btn btn-info" value="Login" > 
    <input type="button" id="register" class="btn btn-info" value="Register" >
    </div>`

    const templateAnimation = ` 
    <div id="logindiv">
    <h2>እንኳን ደና መጡ</h2>
    <h2 id="welcome">  wellcome all from .............</h2>
    <textarea rows="20" cols="40" id="playground" align="center"></textarea><br>
    <button type="button" id="refresh" onclick="ab()" class="btn btn-info">Refresh_Animation</button>
    <button type="button" id="logout" onclick="abc()" class="btn btn-info">Logout</button> </div>
            `
    loginpage();
    let refreshbutton = document.getElementById("refresh")
    refreshbutton.addEventListener("click", Refresh);
        function Refresh()  {
           // clearInterval(animatedstring)
            //getAnimation();
            alert("ama  referesh")
    }
    logoutbutton=document.getElementById("logout")
    logoutbutton.addEventListener("click", logoutfunction);
    function logoutfunction() {
        // div.innerHTML = templatelogin
        // token = null;
        // loginpage();
        alert("am logout")


    }
    /**
     * History API to handle forward and back arrow 
     * which diplayed on tab
     */

    window.addEventListener('popstate', function (event) {
        if (event.state.page === 1) {
            loginpage();
        } else {
            playingpage();
        }
    })

    function loginpage() {
        // loading the dom to login template
        div.innerHTML = templatelogin;
        history.pushState({page: 1 }, "Mylogin", "?loginpage");

        let login = document.getElementById("login")
        //add event listener to the login button
        login.addEventListener("click", myLoginFunction);


    }

    function playingpage() {
        history.pushState({
            page: 2
        }, "animation", "?playingpage")
        div.innerHTML = templateAnimation;
        getlocation()
        getAnimation();

    }



    async function myLoginFunction() {
        try {

            const result = await fetch("https://cs445-project.herokuapp.com/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": "map",
                    "password": "123456"
                })
            })

            const validlogin = await result.json()
            token = validlogin.token;
            const status = validlogin.status;

            if (status === true) {
                playingpage();
            }

        } catch (error) {

            alert(error);

        }

    }
}



