"use strict";
let loginToken;
let outlet;
let timerId;
window.onload = function () {
  outlet = document.getElementById("outlet");

  window.loginTemplate = `
  <h1>Please Login</h1>
  Username <input value = "mwp"><br>
  Password <input value = "123"><br>
  <button onclick="login()">Login</button
`;
  outlet.innerHTML = window.loginTemplate;
  history.pushState({ page: 1 }, null, "?login");
};

async function login() {
  history.pushState({ page: 2 }, null, "?animation");

  const response = await fetch(
    "https://cs445-project.herokuapp.com/api/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "map",

        password: "123456",
      }),
    }
  );

  const result = await response.json();
  loginToken = result;
  console.log(loginToken);
  const animationTemplate = `<h3>Welcome all from <span id="location"></span></h3>
 <textarea id="animation" rows="10" cols="50"></textarea><br>

  <button onclick="refresh()">Refresh Animation</button>
  <button onclick="logout()">Logout</button>
  `;
  outlet.innerHTML = animationTemplate;

  let geoKey = "hl5CFvCH0GGgkLuulKNPcQ5q1bPDGvYH";

  navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    let geoLink = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${geoKey}&location=${lat},${long}&includeRoadMetadata=true&includeNearestIntersection=true`;

    fetch(geoLink)
      .then((r) => r.json())
      .then((data) => {
        let res = data.results[0].locations[0];
        console.log(`${res.adminArea5}, ${res.adminArea3}, ${res.adminArea1} `);

        let place = document.getElementById("location");

        place.innerHTML = `${res.adminArea5}, ${res.adminArea3}, ${res.adminArea1} `;
      });
  });

  showAnimation();
}

async function showAnimation() {
  let animation = await fetch(
    " https://cs445-project.herokuapp.com/api/animation",
    {
      method: "GET",
      headers: { Authorization: `Bearer ${loginToken.token}` },
    }
  );
  let resA = await animation.text();
  let frame = resA.split("=====\n");

  let frameCount = 0;
  window.timerId = setInterval(function () {
    document.getElementById("animation").innerHTML =
      frame[frameCount % frame.length];
    frameCount++;
  }, 300);
}

function refresh() {
  clearInterval(window.timerId);
  document.getElementById("animation").innerHTML = "";
  showAnimation();
}

function logout() {
  history.pushState({ page: 2 }, "animation", "?login ");
  clearInterval(window.timerId);

  outlet.innerHTML = window.loginTemplate;
}
