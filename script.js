window.onload = function () {
        //global variables
    let animationData,data,animationId, geolocationData,longitude1,latitude1;

        // over all html structure
    let animationTemplate = `<div id ="geolocation_id"></div> 
                             <textarea  id="textAreaId" cols="90%" rows="45%" disabled></textarea><br><br>
                             <button id="animation_id"> Refresh Animation </button>
                             <button id="logout_id"> LogOut </button> `

    let loginTemplate = `<h1>Pleas Login</h1><label>User Name</label>
                        <input id="input_id" placeholder="wmp"> </input><br> <br>
                        <label>Password </label>
                        <input id="input_id" placeholder="123"> 
                        </input><br><br><button id="login_id">login</button> `

    document.getElementById("outlet").innerHTML = loginTemplate


          // feching from the server
    async function login() {
           //autorization 
        let response1 = await fetch("http://mumstudents.org/api/login",
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "username": "mwp", "password": "123" })
            })
        data = await response1.json();
        document.getElementById("outlet").innerHTML = animationTemplate


        getAnimation()
        //accesed token
    }

       async function getAnimation() {
        // geolocation fetch function call 
              location_func()
  let response2 = await fetch("http://mumstudents.org/api/animation",
            {
                method: "Get",
                headers: { "Authorization": `Bearer ${data.token}` }


            })
            //
        animationData = await response2.text()
        clearInterval(animationId);

        document.getElementById("animation_id").addEventListener("click", getAnimation)
        let animationsplit = animationData.split("=====")
      //  history.pushState(animationsplit,document.title,"animation");// animation array stored on history state
        let count = 0;
        animationId = setInterval(function () {
            document.getElementById("textAreaId").innerHTML = animationsplit[count]
            ++count;
            if (count === animationsplit.length) {
                count = 0;
            }
        }, 200)

window.addEventListener("popstate",function(){
    console.log(history.state[0])
    clearInterval(animationId);
    splitedarray=history.state;
    count=0;
    animationId = setInterval(function (){
        document.getElementById("textAreaId").innerHTML=splitedarray[count]
        count++;
        if(count==splitedarray.length) {count=0};

    },200)


    
   // document.getElementById("textAreaId").innerHTML=history.state;

})

        //geolocation fetch
        function location_func() {

            navigator.geolocation.getCurrentPosition(success, fail);
            function success(position) {
                longitude1 = position.coords.longitude;
                latitude1 = position.coords.latitude;
                console.log(longitude1)
                acceslocationfun()
            }
            function fail(msg) {
                (msg.code + msg.message);
            }

            // used acceslocation function to wrap up and get the longituid variavle inside the fetch
            function acceslocationfun() {
                fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=etyxXJEu28EtN6ySr5iCsUO9QrMuUc0m&location=${latitude1},${longitude1}&includeRoadMetadata=true&includeNearestIntersection=true`
                    , { method: "GET" }
                )

                    .then(res => res.json())
                    .then(sec => {
                        console.log(geolocationData)

                        geolocationData = sec;
                        //accessed geolocation variable na
                        let geo1 = geolocationData.results[0].locations[0].adminArea1
                        let geo2 = geolocationData.results[0].locations[0].adminArea3
                        let geo3 = geolocationData.results[0].locations[0].adminArea5
                                
                        document.getElementById("geolocation_id").innerHTML = geo3 + " " + geo2 + " " + geo1
                    }
                    )
                    .then(err => { console.log(err) })

            }




        }

        document.getElementById("logout_id").addEventListener("click", logout)
        function logout() {
            document.getElementById("outlet").innerHTML = loginTemplate

        }


    }

    document.getElementById("login_id").addEventListener("click", login)






}//onload finish here



