


let loginForm = `<h1> Please Login</h1>
Username <input placeholder="name" value="mwp"/><br/>
Password <input placeholder="char" value="123456"/><br/>
<button type="button" id="login">Login</button>`


let animationForm = `<h3 id="geoloc">Welcome All</h3>
<textarea rows="30" cols="120" id="animation"></textarea><br>
<button type="button" id="refreshAnim">Refresh Animation</button>
<button type="button" id="logout">Logout</button>`


let Tokens, playAnimation;

window.onload = animApp
/**
 * when window is loading the login page will display
 */
function animApp() {

    let outLet = document.getElementById("outlet")
    outLet.innerHTML = loginForm

    history.pushState({page: 1}, "login page", "?login")

    let loginBtn = document.querySelector("#login")

    loginBtn.addEventListener("click", displayPage)

    /**
     * fetching and cheking the body and display the animation page
     */
    async function displayPage() {
        try {


            let response = await fetch("https://cs445-project.herokuapp.com/api/login",
                {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        "username": "map",
                        "password": "123456"
                    })

                })

            let result = await response.json();
            Tokens = result.token

            outLet.innerHTML = animationForm
            history.pushState({page: 2}, "dispaly page", "?animation")
            
            fetchTokensAnimation();
            getGeoLocation()
        } catch (error) { alert(error) }

    }

    /**
     * fetch each tokens and split each tokens with "====="
     */

    async function fetchTokensAnimation() {
        try{
        let animResponse = await fetch("https://cs445-project.herokuapp.com/api/animation",
            {
                method: "GET",

                headers: {
                    "Content-Type": "application/text",
                    Authorization: `Bearer ${Tokens}`
                }
            })
        console.log(animResponse)
        let animResult = await animResponse.text()
        console.log(animResult)
        let resultArray = animResult.split("=====\n")
        let tokenLength = 0;
        let arrLength = resultArray.length
        clearInterval(playAnimation)
        playAnimation = setInterval(() => {
            document.getElementById("animation").innerHTML = resultArray[tokenLength];
            tokenLength++
            if (tokenLength === arrLength) tokenLength = 0;
        }, 300)

        }catch(error){
            alert(error)
        }
    }

    

    /**
     * navigate the geolocation latitude and longitude
     */

        function getGeoLocation() {
        navigator.geolocation.getCurrentPosition(success, (failed) => { alert(failed.message) });

        function success(position) {
            currentLongitude = position.coords.longitude;
            currentLatitude = position.coords.latitude;

            fetchCurrentLocation()
            refreshAnimationPage()
        }
    }

    /**
     * fetch the current location based on the given longitude, latitude and geolocation key
     */

    async function fetchCurrentLocation() {
        try {
            let geoLocationKey = "om1PtZHStjj5GgHz7NRKVFnFfVHSbk11"
            let getLocation = await fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${geoLocationKey}&location=${currentLatitude},${currentLongitude}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            let resultLocation = await getLocation.json()
            console.log(resultLocation)

            let country = resultLocation.results[0].locations[0].adminArea1
            console.log(country)
            let state = resultLocation.results[0].locations[0].adminArea3
            let city = resultLocation.results[0].locations[0].adminArea5

            document.getElementById("geoloc").innerHTML = `Welcome All from ${city}, ${state} ${country}`
        } catch (error) { alert(error) }
    }

    /**
     * refereshing the animation page to get different pattern whenever it called
     */

    function refreshAnimationPage() {
        let refresh = document.querySelector("#refreshAnim")
        let logoutBtn = document.querySelector("#logout")
        refresh.addEventListener("click", () => { clearInterval(playAnimation); fetchTokensAnimation(); })
        logoutBtn.addEventListener("click", () => {
            outLet.innerHTML = loginForm;
            Tokens = null;
            animApp();
        })
    }
    /**
     * history API for baking to the login page
     */
    window.addEventListener("popstate", (event) => {
        if (event.state.page === 1) {
            clearInterval(playAnimation);
            animApp()
        } else {
            clearInterval(playAnimation);
            displayPage()
        }
        
    })

}



