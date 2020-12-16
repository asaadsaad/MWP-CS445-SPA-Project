// your code here
window.onload = function () {

     let loginTemplate = `
     <div style="margin: 50px; height: 220px; width:350px; background-color: MediumSeaGreen;">
     <p style="font-size: 30px"> <b> Login Here </p>
     
     User Name: <input  id="username" type="text"  placeholder="mwp" value="mwp"> <br>
     Password: <input id="password" type="password"  placeholder="123" value="123"> <br><br>
     <input  id="login" type="button" value="Login"> 
     </div>`

     document.getElementById("outlet").innerHTML = loginTemplate;

     history.pushState({screen: "loginScreen"}, null, '/login')



     let animationTemplate = `
      <div id="animationPage" style="height: 420px; width:440px; background-color: MediumSeaGreen;  margin: 50px">
     
          <p id="welcomming" style="font-size: 20px"> </p>

          <div id="animationArea" style="padding-right: 20px; margin: 20px">
          <textarea disabled id="animationTextArea" style="height: 320px; width:380px"></textarea> <br>
          <input type="button"  id="refreshAnimation" value="Refresh Animation">
          <input type="button" id="logoutBotton" value="Logout"  >
          </div>
     </div>`

     document.getElementById("login").addEventListener("click", displayAnimaTemplate);


     function displayAnimaTemplate() {
          document.getElementById("outlet").innerHTML = animationTemplate;

          getGeoLocation()
          fetchData()
          update()

          history.pushState( {screen: "Animation sceen"}, null, '/animation')
     }


     let animationId;
     async function fetchData() {   //feching token and animation

          // fetch takent state
          const fetchToken = await fetch("https://cs445-project.herokuapp.com/api/login", {
               method: 'POST',
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                    username: 'map',
                    password: '123456'
               })
          })
          const respondToken = await fetchToken.json();
          const token = respondToken.token;
          // console.log(token)


          // fetch animation
          const fetchAnimation = await fetch("https://cs445-project.herokuapp.com/api/animation",
               {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${token}` }
               })
          let aminationRespond = await fetchAnimation.text();
          aminationRespond = aminationRespond.split("=====\n");


          // display anination 
          palayAmination()
          function palayAmination() {
               let frameLength = 0;
               animationId = setInterval(function () {
                    document.getElementById("animationTextArea").innerHTML = aminationRespond[frameLength];
                    frameLength++;
                    if (frameLength == aminationRespond.length) { frameLength = 0 };

               }, 150);
          }
     }


     function getGeoLocation() {

          let locationKey = "AqK0xFKWQGXZBQSTX56v8pr4ki9AEGz1"

          navigator.geolocation.getCurrentPosition(success, fail);
          async function success(position) {
               let longitude = position.coords.longitude;
               let latitude = position.coords.latitude;
               let locationInfo = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${locationKey}&location=${latitude},${longitude}`)
               locationInfo = await locationInfo.json();
               // console.log(locationInfo)
               let city = locationInfo.results[0].locations[0].adminArea5;
               let state = locationInfo.results[0].locations[0].adminArea3;
               let country = locationInfo.results[0].locations[0].adminArea1;
               let currentLocation = `You are in ${city},  ${state}, ${country}`;

               document.getElementById("welcomming").innerHTML = currentLocation;
          }
          function fail(details) {
               console.log(details.message);
          }
     }

     function update() {
          // referesh animation
          document.getElementById("refreshAnimation").addEventListener("click", function () { clearInterval(animationId); displayAnimaTemplate() });

          // logout
          document.getElementById("logoutBotton").addEventListener("click", function () {

               clearInterval(animationId);
               document.getElementById("outlet").innerHTML = loginTemplate;

               // login again befor refreshing the window             
               document.getElementById("login").addEventListener("click",function(){displayAnimaTemplate();  history.pushState({screen: "loginScreen"}, null, '/login')


               } );
          });
     }
}