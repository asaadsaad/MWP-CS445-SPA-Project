"use strict";
window.onload = function () {
  const outlet = document.getElementById("outlet");

  setTimeout(() => {
    outlet.innerHTML = `<h1>Please Login</h1>
Username <input value = "hungle"><br>
Password <input value = "123456"><br>
<button onclick="login()">Login</button`;
  }, 1000);
};

function login() {
  outlet.innerHTML = `<h3>Welcome all from <span id="location"></span></h3>
 <textarea rows="10" cols="50"></textarea><br>


  <button onclick="refresh()">Refresh Animation</button>
  <button onclick="logout()">Logout</button>
  `;

  let geoKey = "hl5CFvCH0GGgkLuulKNPcQ5q1bPDGvYH";

  navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    let geoLink = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${geoKey}&location=${lat},${long}&includeRoadMetadata=true&includeNearestIntersection=true`;

    fetch(geoLink)
      .then((r) => r.json())
      .then((data) => {
        let res = data.results[0].locations[0];
        console.log(`${res.adminArea5}, ${res.adminArea3} `);

        let place = document.getElementById("location");

        place.innerHTML = `${res.adminArea5}, ${res.adminArea3} `;
      });
  });
}
