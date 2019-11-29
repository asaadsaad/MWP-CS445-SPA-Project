/* eslint-disable require-jsdoc */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable strict */
window.onload = function () {

    // navigator.geolocation.getCurrentPosition(function (position) {
    //     console.log(position);
    // });
    
        let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtd2EiLCJpc3N1ZWRBd…w8CNDpTIUjNBL_EtDqkXG4qGOF8H_Ve1S2Gg2PwmCYOkfgmWA"
    const loginPage = `<h1> Please login</h1>
    Username <input type="text" placeholder="mwp" value = "mwp"/> <br>
    Password <input type="text" placeholder="123" value = "123"/> <br>
   <button id ="logInButton">Login</button> <br>`;
    const animationPage = `
        <h3 id = "location"></h3>
        <textarea id= "animTextArea" cols="60" rows="20"></textarea><br>
        <button id ="Refanimation">Refresh Animation</button> 
        <button id ="logoutid">Logout</button> <br>`;

    let outlet = document.getElementById("outlet");
    outlet.innerHTML = loginPage; //autoloading log in page

    let loginBtn = document.getElementById("logInButton");
    loginBtn.addEventListener("click", nextPage);  //to go to animation page

    function nextPage() {
        outlet.innerHTML = animationPage;
        yourLocation()
        redirectingPage();
        refFunction()

        //fetchForAnim()    //to load the second page
    }
    function redirectingPage() {
        let myLogOut = document.getElementById("logoutid");
        //  let tex
        myLogOut.addEventListener("click", function () {
            outlet.innerHTML = loginPage
        })
    }

    function refFunction() {
        // let txtarAnimPage = document.getElementById("animTextArea");
        let refButn = document.getElementById("Refanimation");

        refButn.addEventListener("click",moveAnim)

    }
    function fetcForToken() {
        fetch("http://mumstudents.org/api/login",
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({ username: "mwp", password: "123" })
            })
            .then(res => res.json())
            .then(elem => {token = elem.token
                moveAnim()}
            )}
            
    function moveAnim(){   
        fetcForToken();        
                fetch("http://mumstudents.org/api/animation", {
                    method: 'GET',
                    headers: { "Authorization": `Bearer ${token}` },

                })
                    .then(res => res.text())
                    .then(elem => {
                      let displayArray = elem.split("=====/n")
                        console.log(displayArray)
                        document.getElementById("animTextArea").innerHTML = displayArray
                    })
        
    }
    

    function yourLocation() {
        fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=
               UGe5a24nOhIAkbWIG3UCWtSDN0xKJeZ3&location=41.0076,-91.9637`)
            .then((res) => res.json())
            .then((data) => {
                let Mylocation = data.results[0].locations[0];
                let state = Mylocation.adminArea5;
                let city = Mylocation.adminArea3
                let country = Mylocation.adminArea1
                document.getElementById("location").innerHTML = `Welcome to all from  ${state} ${city},${country}`

            });
    }

}



