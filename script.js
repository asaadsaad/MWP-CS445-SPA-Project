window.onload = function () {
    let token, long, lati, tid;


    let frontPage =
        `<h1><b>Please login</b></h1>
    User Name <input type="text" value ="mwp"id="userName"><br>
    Pass Word <input type="text" value ="123" id="password"><br>
    <button type="button" id="lbut">Login</button>`;

    let secondPage = `
     <Div id="gioId"></Div>
    <textarea id="anima" cols="80" rows="20"></textarea> 
    <button id="refid">Refresh Animation</button>
    <button id="getApi">LogOut</button>`


    let myFirestPage = document.getElementById("outlet");
    creatingFrontPage();
/*The creating Front Page functionality it is load the frontPage html.
  The addEventListener are redirect to secondPage by listening the login Button.
  History API will be push in a new state the "back"and "forward" buttons */
    function creatingFrontPage() {
        
        clearInterval(tid);
        myFirestPage.innerHTML = frontPage;
        let loginButen = document.getElementById("lbut");
        loginButen.addEventListener('click', forMySecondpage);
        history.pushState({ page: 1 }, null, "?1")
        window.addEventListener("popstate", function (e) {
            if (e.state.page === 1) {
                creatingFrontPage();
            }
        })
    }


/* It is load the second Page html and other function are invoke in this function */
    function forMySecondpage() {
        history.pushState({ page: 2 }, null, "?2")
        myFirestPage.innerHTML = secondPage;
        clearInterval(tid);
        getTokenFunctionality()
        logOutFunctionality()
        refreshFunctionality();
        toUpdateLocation()


    }
    /*
    If it is the logout button is clicked this function it is reload the front Page html .
    The addEventListener are redirect to frontPage */

    function logOutFunctionality() {
       
        let logOutButton = document.getElementById("getApi");
            logOutButton.addEventListener('click', function () {
            myFirestPage.innerHTML = frontPage
            let loginButen = document.getElementById("lbut");
            loginButen.addEventListener('click', forMySecondpage);
            clearInterval(tid);
        })
        

    }
     /*
    If it is the refresh Animation button is clicked,
     this function it is fetch diffrent animation from the link .
    The addEventListener are redirect to getAnimation function */

    function refreshFunctionality() {
        clearInterval(tid);
        let refreshAnimation = document.getElementById("refid");
        refreshAnimation.addEventListener('click', getAnimation);
    }
    /*This function fetch the token from the web and return the token by changing in to string*/
    
    function getTokenFunctionality() {
        fetch("http://mumstudents.org/api/login",
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: "mwp",
                    password: "123"
                })
            })
            .then(res => res.json())
            .then(data => {
                token = data.token;

                getAnimation()
            })
    }
   /* This function it is fetch diffrent animationfrom from the web,
    and forward to refreshFunctionality  */

    function getAnimation() {
        clearInterval(tid);
        fetch("http://mumstudents.org/api/animation", {
            method: 'GET',
            headers: { "Authorization": `Bearer ${token}` }

        })
            .then(res => res.text())
            .then(data => {
                aniData = data.split("=====\n")


                let count = 0;
                tid = setInterval(function () {
                    document.getElementById("anima").innerHTML = aniData[count];
                    ++count;
                    if (count == aniData.length) {
                        count = 0
                    }
                }, 200)

            })


    }
    /*This function it is fetch city,state and country from the web,
    and display city,state and country in the Animation Page */

    function gioLocation() {
     
        fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=vhWCTTt1Zi5UypzejKx3B4rGTDLNxhkb&location=${lati},${long}`)
            .then(res => res.json())
            .then(data => {
                let location = data.results[0].locations[0];
                let ividlocation = document.getElementById("gioId")
                ividlocation.innerHTML = `<h3> Welcome all from ${location.adminArea5},${location.adminArea3},${location.adminArea1}!</h3>`
            });
    }

    function toUpdateLocation() {

        navigator.geolocation.getCurrentPosition(success, fail);
        function success(position) {
            long = position.coords.longitude;
            lati = position.coords.latitude;
            gioLocation();
        }
        function fail() {
            console.log("chek your network connection");
     }


    }

  

}

