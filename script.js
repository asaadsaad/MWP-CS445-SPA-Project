/* eslint-disable require-jsdoc */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable strict */
window.onload = function () {
    let longitude;
    let latitude;
    let timer;
    let counter = 0
    let DevKey = `UGe5a24nOhIAkbWIG3UCWtSDN0xKJeZ3`
    let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtd2EiLCJpc3N1ZWRBd…w8CNDpTIUjNBL_EtDqkXG4qGOF8H_Ve1S2Gg2PwmCYOkfgmWA"
    const loginPage = `<h1> Please login</h1>
    Username <input type="text" placeholder="mwp" value = "mwp"/> <br>
    Password <input type="text" placeholder="123" value = "123"/> <br>
   <button id ="logInButton">Login</button> <br>`;
    const animationPage = `
        <h3 id = "location"></h3>
        <textarea id= "animTextArea" cols="80" rows="30"></textarea><br>
        <button id ="Refanimation">Refresh Animation</button> 
        <button id ="logoutid">Logout</button> <br>`;

    let MainPage = document.getElementById("outlet");
    MainPage.innerHTML = loginPage; //autoloading log in page

    let loginBtn = document.getElementById("logInButton");
    loginBtn.addEventListener("click", MainPageFunc);  //to go to animation page

    function MainPageFunc() {
        MainPage.innerHTML = animationPage;
        // yourLocation()
        getlatAndLong()
        redirectingPage();
        refFunction()
    }
    function redirectingPage() {
        let myLogOut = document.getElementById("logoutid");
        //  let tex
        myLogOut.addEventListener("click", function () {
            MainPage.innerHTML = loginPage
        })
    }
    function refFunction() {
        displayAnimation()
        // let txtarAnimPage = document.getElementById("animTextArea");
        let btnreffresh = document.getElementById("Refanimation");

        btnreffresh.addEventListener("click", displayAnimation)

    }
    function fetcForToken() {
        fetch("http://mumstudents.org/api/login",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: "mwp", password: "123" })
            })
            .then(res => res.json())
            .then(elem => {
              
                token = elem.token
                displayAnimation()
            })
    }

    function displayAnimation() {
        clearInterval(timer)
        let displayArray; 
        fetch("http://mumstudents.org/api/animation", {
            method: 'GET',
            headers: { "Authorization": `Bearer ${token}` },

        })
            .then(res => res.text())
            .then(elem => {
                displayArray = elem.split("=====\n")
                let counter = 0;
                 timer = setInterval(function () {
                    
                    document.getElementById("animTextArea").innerHTML = displayArray[counter]
                    counter++;
                    if (counter == displayArray.length) {
                        counter = 0  
                    } 
            
                }, 400); 
     
            })
           
    }
    function getlatAndLong() {

        navigator.geolocation.getCurrentPosition(success, error);

        function success(pos) {
            longitude = pos.coords.longitude;
            latitude = pos.coords.latitude;
            UserLocation()
            //console.log('Your current position is:');
            // return crd.latitude

        }
        function error() {
            console.warn(`ERROR(${error.code}): ${error.message}`);
        }

    }
function UserLocation() {
    // console.log("long"+longitude)
    // console.log("lat"+latitude)
    fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${DevKey}&location=${latitude},${longitude}`)
        .then((res) => res.json())
        .then((data) => {
            let Mylocation = data.results[0].locations[0];
            let state = Mylocation.adminArea5;
            let city = Mylocation.adminArea3
            let country = Mylocation.adminArea1
            document.getElementById("location").innerHTML = `Welcome all from ${state} ${city},${country}`

        });
}
fetcForToken()
}
