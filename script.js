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
    function refresh() {
        document.getElementById("refAnimBtn").addEventListener("click", refreshFunc);
    }
    let interval = "";
    async function refreshFunc() {
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
        if (interval) clearInterval(interval);
        let tokenObj = await tokenResponse.json();
        let animeResponse = await fetch("http://www.mumstudents.org/api/animation", {
            method: "GET",
            headers: { "Authorization": `Bearer ${tokenObj.token}` }
        });
        let animeString = await animeResponse.text();
        eachString = animeString.split('=====');
        console.log(eachString);

        // function animate(arra) {
        //     let count = 0;
        //     for (let i = count; count < arra.length; i++){
        //         console.log(arra[count]);
                
        //     }
            // eachString.forEach((element,index,arr) => {
            //     setInterval(() => {
            //         console.log(arr[index]);
            //     }, 500);
            // });
     
        // }
        
        // }
        // animate(eachString);
        let count = 0;
         interval=setInterval(function () { 
            document.getElementById("textarea").innerHTML = eachString[count++];
            if (count == eachString.length) { count = 0;}
        },300);
        
    }
    refreshFunc();
    function getPos() {
        navigator.geolocation.getCurrentPosition(success, failed);
        async function success(position) {
            console.log(position)
            let pos = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${mapsKey}&location=${position.coords.latitude},${position.coords.longitude}`)
            let obj = await pos.json()
            console.log(obj)
            let location = obj.results[0].locations;
            console.log(location);
            document.getElementById("location").innerHTML = `Welcome to ${location[0].adminArea5},${location[0].adminArea3},${location[0].adminArea1}`;
        }

        function failed() {
            document.getElementById("location").innerHTML = `locTION NOT RECOGNIZED`;

        }
    }

    // getPos();
}
            // arr.forEach((element, index, arra) => {
            //     setInterval((element) => {
            //         console.log(arra[index])
            //     }, 500);
            // });







