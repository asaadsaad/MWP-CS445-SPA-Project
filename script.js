// your code here
window.onload = function () {
    let mapsKey = `CSFyNjI9A2gLtHH9xNLjS7oOQGpjaHED`;
    let loginPage =
        `<h3>Please Login</h3>Username <input id="username" type="text"><br>
Password <input id="password" type="text"><br>
<button id="loginId">Login</button>`;

    let animationPage = `    <h3 id="location">welcome All from <h3 ></h3>
                </h3>
                <textarea id="textarea" cols="50" rows="15"></textarea><br>
                <button id="refAnimBtn">Refresh Animation</button>
                <button id="logoutButn">Logout</button>`;
    let outlet = document.getElementById("outlet");
    outlet.innerHTML = loginPage;
    let loginBtn = document.getElementById("loginId");
    loginBtn.addEventListener("click", loadAnimationPage);
    function loadAnimationPage() {
        outlet.innerHTML = animationPage;
        logOut();
        refresh();
        getPos();
    }
    function logOut() {
        document.getElementById("logoutButn").addEventListener("click", logOutFunc);
        function logOutFunc() {
            outlet.innerHTML = loginPage;
        }
    }
    async function getToken() {
        let tokenResponse = await fetch("http://mumstudents.org/api/login", {
            method: "POST",
            headers: {
                "Accept": "application/json,text/plain,*/*",
                'content-Type': "application/json"
            },
            body: JSON.stringify(
                {
                    "username": "mwp",
                    "password": "123"
                })
        })
        let tokenObj = await tokenResponse.json();
        let animeResponse = await fetch("http://www.mumstudents.org/api/animation", {
            method: "GET",
            headers: { "Authorization": `Bearer ${tokenObj.token}` }
        });
        let animeString = await animeResponse.text();
        // console.log(animeString);
        eachString = animeString.split('=====');
        // console.log(eachString);
        function animate(arr) {
            for (let i = 0; i < arr.length; i++){
                setInterval(() => {
                   console.log(arr[i]) 
                }, 500);
            }
        }
        animate(eachString);
    }
    getToken();
    function refresh() {
        document.getElementById("refAnimBtn").addEventListener("click", refreshFunc);
        let textNode = document.getElementById("textarea");
        function refreshFunc() {

            textNode.innerHTML = eachString;
        }
    }
    async function getPos() {
        let position = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${mapsKey}&location=30.333472,-81.470448`)
        let obj = await position.json()
        let location = obj.results[0].locations;
        document.getElementById("location").innerHTML = `Welcome to ${location[0].adminArea5},${location[0].adminArea3},${location[0].adminArea1}`;
    }
    getPos();
}
            // arr.forEach((element, index, arra) => {
            //     setInterval((element) => {
            //         console.log(arra[index])
            //     }, 500);
            // });







