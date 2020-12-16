


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
function animApp() {

    let outLet = document.getElementById("outlet")
    outLet.innerHTML = loginForm

    history.replaceState({}, document.title, "/login");

    let loginBtn = document.querySelector("#login")

    loginBtn.addEventListener("click", displayPage)


    async function displayPage() {
        try {


            let response = await fetch("https://cs445-project.herokuapp.com/api/login",
                {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        "username": "mwp",
                        "password": "123456"
                    })

                })

            let result = await response.json();
            Tokens = result.token

            outLet.innerHTML = animationForm
            history.replaceState({}, document.title, "/animation");

            //getGeoLocation()
            fetchTokensAnimation();

        } catch (error) { alert(error) }

    }


    async function fetchTokensAnimation() {

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
        playAnimation = setInterval(() => {
            document.getElementById("animation").innerHTML = resultArray[tokenLength];
            tokenLength++
            if (tokenLength === arrLength) tokenLength = 0;
        }, 300)
        refreshAnimationPage()
    }

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

    window.addEventListener("popstate", (event) => {
        if (event.state.page === 1) {
            clearInterval(playAnimation);
            animApp()
        }
        clearInterval(playAnimation);
        displayPage()
    })
  /*   window.addEventListener("click", back)
    function back(){
        window.location.href = "https://cs445-project.herokuapp.com/api/login";
    } */


}



