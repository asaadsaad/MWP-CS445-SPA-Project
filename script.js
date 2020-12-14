// your code here
const div = document.getElementById("outlet");

window.onload = function login() {

   let templateLogin = ` <h1>Please Login</h1>
                         Username<input id = "username" /></br>
                         Password<input id = "password"/></br>
                         <button id = "login">Login</button>`;
   div.innerHTML = templateLogin;


   document.getElementById("login").onclick = refreshed;
   
   function refreshed() {
      let userName = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      getToken();
      async function getToken() {
         const state = {
            username: userName, //map
            password: password  //123456
         }

         const result = await fetch("https://cs445-project.herokuapp.com/api/login", {
            method: "POST",
            headers: { 'Accept': 'application/json', "content-type": "application/json" },
            body: JSON.stringify(state)


         })
         const data = await result.json();
         var token = data.token;

         if (data.status) {
            animation();
         }
         async function animation() {
            let templateAnimation = `<h2> welcome to</h2>
                        <textarea id ="animation" rows = "30" cols = "80"></textarea></br>
                        <button id ="refresh">Refresh </button>
                        <button id ="logout">Logout</button>`;
            div.innerHTML = templateAnimation;

            document.getElementById("logout").onclick = login;
            document.getElementById("refresh").onclick = function () {
               clearInterval(intervalID);
               getToken();
            }
            function getLocation() {
               if (navigator.geolocation) {
                 navigator.geolocation.getCurrentPosition(showPosition);
               } 
             }
             
            async function showPosition(position) {
               var lat = position.coords.latitude;
               var lng = position.coords.longitude
               const getGeoLocation = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=vTlxAHpj3BYQzJctWjHLUf8Ht45yyoNT&location=
               ${lat}, ${lng}&includeRoadMetadata=true&includeNearestIntersection=true`);
               const location = await getGeoLocation.json();
               const adress = await location.results[0].locations;
              document.querySelector("h2").innerHTML += ` ${adress[0].street} ,${adress[0].adminArea5}
                                                           ,${adress[0].adminArea3} ,${adress[0].postalCode} ,${adress[0].adminArea1}`;
              console.log(adress);
             }
            getLocation();
             
            
            const res = await fetch("https://cs445-project.herokuapp.com/api/animation", {
               method: "GET",
               headers: {
                  'Authorization': `Bearer ${token}`
               }
            })
            console.log(res);
            const d = await res.text();
            let x = d.split("=====");

            let curNewsIndex = -1;
            var intervalID = setInterval(function () {
               ++curNewsIndex;
               if (curNewsIndex >= x.length) {
                  curNewsIndex = 0;
               }
               document.getElementById('animation').innerHTML = x[curNewsIndex]

            }, 200);


         }

      }
     
   }

}
