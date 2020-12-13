// your code here
/*===========================================================================
===Singla Page Animation retriving data from online server and animate=======
===============================String========================================*/

window.onload = function () {
    let div = document.getElementById("outlet")

    //DOM which is added into div area when the window is loaded
    const templatelogin = `<h1>Please Login</h1>
            <fieldset style="width:600px">
            <legend>animated game:</legend>
                Username: <input type="text" placeholder="map"><br>
                Password: <input type="text" placeholder="123456"><br>
            <button id="loguser">Login</button>
            </fieldset>`
    const templateAnimation = ` 
            <h3>Wellcome All from location ........................</h3>
            <fieldset>
                <legend>animated game:</legend>
                <textarea id="txtarea" name="w3review" rows="30" cols="70">
                    this is display area for the animated pictures
                </textarea>  <img src="./" /></im><br/>
                <button>Refresh page</button>
                <button>Logout</button>
            </fieldset>

            `
    // loading the dom to login template
    div.innerHTML = templatelogin


    let loginuser = document.getElementById("loguser")
    //add event listener to the login button
    loginuser.addEventListener("click", myLoginFunction);

    
    async function myLoginFunction() {
        
        // document.getElementById("demo").innerHTML = 
        alert("hey i am login button see your console for token data");
   
        try {

            let response = await fetch("http://www.mumstudents.org/api/login",
                {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        "username": "map",
                        "password": "123456"
                    })
                })
            let datafromserver = await response.json();
            token = datafromserver;
            console.log(token)
            
        } catch (error) {

            alert(error);

        }

    }
}