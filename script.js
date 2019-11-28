/* eslint-disable require-jsdoc */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable strict */
window.onload = function () {
    //let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtd2EiLCJpc3N1ZWRBd…w8CNDpTIUjNBL_EtDqkXG4qGOF8H_Ve1S2Gg2PwmCYOkfgmWA"
    const loginPage = `<h1> Please login</h1>
Username <input type="text" placeholder="mwp" value = "mwp"/> <br>
Password <input type="text" placeholder="123" value = "123"/> <br>
<button id ="logInButton">Login</button> <br>`;
    const animationPage = `
        <textarea name=" Welcome all from " id= "animTextArea" cols="60" rows="20"></textarea><br>
        <button id ="Refanimation">Refresh Animation</button> 
        <button id ="logoutid">Logout</button> <br>`;

    let outlet = document.getElementById("outlet");
    outlet.innerHTML = loginPage; //autoloading log in page

    let loginBtn = document.getElementById("logInButton");
    loginBtn.addEventListener("click", nextPage);  //to go to animation page

    function nextPage() {
        outlet.innerHTML = animationPage;
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
        let txtarAnimPage = document.getElementById("animTextArea");
        let refButn = document.getElementById("Refanimation");

        refButn.addEventListener("click", function () {
            txtarAnimPage.innerHTML = displayAnim;
        })

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
                fetch("http://mumstudents.org/api/animation", {
                    method: 'GET',
                    headers: { "Authorization": `Bearer ${elem.token}` },

                })
                    .then(res => res.text())
                    .then(elem => {
                        displayAnim = elem.split("=====")
                        console.log(elem)
                    })
            })
    }
    fetcForToken();

}
