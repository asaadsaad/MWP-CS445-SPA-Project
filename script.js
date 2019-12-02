

window.onload = function () {
    let tokenState = false, animationId = null, geoLocationKey = "etyxXJEu28EtN6ySr5iCsUO9QrMuUc0m";
    let userLocation="Anonymous";
    let loginTemplate = `<div class="main"><p class="sign" id="geolocation">Ascii Animation</p><form class="form1">
                        <input class="un" type="text" id="username" placeholder="mwp" value="mwp">
                        <input class="pass" type="password" id="password" placeholder="123" value="123">
                        <input class="submit" type="button" value="Login" id="login">
                        <p class="contact"><a href="https://github.com/bikale">About Us</p></div>`

    let animationTemplate = `<div class='main2'><p class="sign" id="userlocation">Welcome all to Anonymous</p>
                            <textarea disabled id="animationframe"></textarea>
                            <input class="submit2" type="button" value="Animation" id="animationBtn">
                            <input class="submit2" type="button" value="Logout" id="logoutBtn" ></div>`

        document.getElementById("outlet").innerHTML = loginTemplate;
        document.getElementById("login").addEventListener("click", loginAccess);


    async function loginAccess() {
        try {

            let response = await fetch("http://www.mumstudents.org/api/login",
                {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        "username": "mwp",
                        "password": "123"
                    })
                })
            let respoResult = await response.json();
            tokenState = respoResult;
            getGeoLocation();// accesing the geolocation
            getAnimation();// trigger the animation page
            
        } catch (error) {

            alert(error);

        }
        async function getAnimation() {

            try {
                document.getElementById("outlet").innerHTML = animationTemplate;
                document.getElementById("animationBtn").addEventListener("click", getAnimation);
                document.getElementById("userlocation").innerHTML = userLocation;
                document.getElementById("logoutBtn").addEventListener("click",function(){//logout functionality

                    document.getElementById("outlet").innerHTML = loginTemplate;
                    document.getElementById("login").addEventListener("click", loginAccess); 
                    clearInterval(animationId);
                    history.replaceState({}, document.title,"/index.html");
                });


                animResponse = await fetch("http://mumstudents.org/api/animation",
                    {
                        method: 'GET',
                        headers: { "Authorization": `Bearer ${tokenState.token}` }
                    })

                animationData = await animResponse.text();
                animationData = animationData.split("=====\n");
                history.pushState(animationData, document.title, "/animation");
                let frameLength = 0;
                clearInterval(animationId);
                animationId = setInterval(function () {
                    document.getElementById("animationframe").innerHTML = animationData[frameLength];
                    frameLength++;
                    if (frameLength == animationData.length) frameLength = 0;

                }, 200);

            } catch (error) {

                alert(error);

            }
        }
    function getGeoLocation() {

            navigator.geolocation.getCurrentPosition(success, fail);
            async function success(position) {
                let geoLongitude = position.coords.longitude;
                let geoLatitude = position.coords.latitude;
                let locationdecode = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${geoLocationKey}&location=${geoLatitude},${geoLongitude}`)
                    locationdecode = await locationdecode.json();
                let city = locationdecode.results[0].locations[0].adminArea5;
                let state = locationdecode.results[0].locations[0].adminArea3;
                let country = locationdecode.results[0].locations[0].adminArea1;
                userLocation = `Welcome all to ${city} ${state} ${country}`;
                document.getElementById("userlocation").innerHTML = userLocation;

            }
            function fail(details) {
                console.log(details.message);
            }

        }

    }

    function updatcontent(event) {

        animationData = event.state;
       // console.log(event.location.href.split("/").pop());
        if (document.location.href.split("/").pop()=="index.html") { // checking if the data is empty
            document.getElementById("outlet").innerHTML = loginTemplate;
            //history.pushState({}, document.title, document.location.href);
            document.getElementById("login").addEventListener("click", loginAccess, true);
             history.replaceState({}, document.title, "/index.html");

            //window.location.replace(document.location.href)
            // event.stopImmediatePropagation();
            clearInterval(animationId);

        } else {
            let frameLength = 0;
            clearInterval(animationId);
            animationId = setInterval(function () {
                document.getElementById("animationframe").innerHTML = animationData[frameLength];
                frameLength++;
                if (frameLength == animationData.length) frameLength = 0;

            }, 200);

        }
    }
    window.addEventListener('popstate', function (event) {
        console.log(event.currentTarget.location)
        updatcontent(event);
        
        event.preventDefault();

    })
    //Store the initial content so we can revisit it later
    history.replaceState({}, document.title, "/index.html");
};