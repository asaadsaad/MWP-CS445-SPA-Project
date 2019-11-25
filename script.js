window.onload = function () {

    //  variable area 

    let loged = false;

    let loginglook = ` <h1> Please login </h1>
    Username: <input id="UserName" type="text" value= "mwp"></br>
    Password: <input id="password" type="text"value= "123"></br>
    <button type="button" id="loging">Login</button>`;

    let animationLook = `<h1 id="status">"Start" </h1>
    <button type="button" id="refresh">Refresh Animayion</button>
    <button type="button" id="logout">logout</button>`;

    let divLook = document.querySelector("#outlet");
    divLook.innerHTML = loginglook;

    //  for the login page 
    let login = document.querySelector("#loging")
    let UserName = document.querySelector("#UserName")
    let password = document.querySelector("#password")

    //  for the animation page 
    // let RefreshAnim = document.querySelector("#refresh")
    // let logout = document.querySelector("#logout")

    // addEventListener login page 
    login.addEventListener("click", logingFunc);

    // addEventListener login page 
    function addEvent() {
        if (loged) {
            let RefreshAnim = document.querySelector("#refresh");
            let logout = document.querySelector("#logout");

            RefreshAnim.addEventListener("click", refreshFunc);
            logout.addEventListener("click", logoutFunc);
        }
    }


    // creating function
    function logingFunc() {
        alert("logggggggg")
        divLook.innerHTML = animationLook;
        loged = true;
        addEvent()
    }

    function refreshFunc() {
        alert("reeeee")
    }

    function logoutFunc() {
        alert("outttttt")
        divLook.innerHTML = loginglook;
    }


}
