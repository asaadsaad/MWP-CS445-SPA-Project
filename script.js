// your code here
window.onload = function () {

     let loginTemplate = `
     <div >
     <p style="font-size: 30px"> <b> Login Here </p>
     
     User Name: <input  id="username" type="text"  placeholder="tahir" value="tahir"> <br>
     Password: <input id="password" type="password"  placeholder="123456" value="123456"> <br><br>
     <input  id="login" type="button" value="Login"> 
     </div>`

     document.getElementById("outlet").innerHTML = loginTemplate;

     let animationTemplate = `
      <div id="animationPage">
     
          <p id="welcomming" style="font-size: 20px"> </p>

          <div id="animationArea">
          <textarea disabled id="animationTextArea" style="height: 290px; width:300px"></textarea> <br>
          <input type="button"  id="refreshAnimation" value="Refresh Animation">
          <input type="button" id="logoutBotton" value="Logout"  >
          </div>
     </div>`

     document.getElementById("login").addEventListener("click", displayAnimaTemplate);


     function displayAnimaTemplate() {

          document.getElementById("outlet").innerHTML = animationTemplate;

          fetchData()
     }




     let token;
     async function fetchData() {
          const response = await fetch("https://cs445-project.herokuapp.com/api/login", {
               method: 'POST',
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                    username: 'map',
                    password: '123456'
               })
          })
          const respondBody = await response.json();
          token = respondBody.token;
         
          getGeoLocation()
        
     }

     let currentLocation;

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
               currentLocation = `You are in ${city},  ${state}, ${country}`;

               document.getElementById("welcomming").innerHTML = currentLocation;
          }
          function fail(details) {
               console.log(details.message);
          }
     }
     
}