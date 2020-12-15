"use strict";

window.onload = function () {
  let loginToken;
  let timerId;
  const outlet = document.getElementById("outlet");

  //create templates
  const loginTemplate = `
  <h1>Please Login</h1>
  Username <input id="username" value = "mwp"><br>
  Password <input id="password" value = "123"><br>
  <button id="login">Login</button
`;
  const animationTemplate = `<h3>Welcome all from <span id="location"></span></h3>
 <textarea id="animation" rows="25" cols="50"></textarea><br>

  <button id="refresh">Refresh Animation</button>
  <button id ="logout">Logout</button>
  `;
  outlet.innerHTML = loginTemplate;
  history.pushState({ page: 1 }, null, "?/login");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const loginButton = document.getElementById("login");

  loginButton.addEventListener("click", login);

  //Login function
  async function login() {
    if (username.value == "mwp" && password.value == "123") {
      history.pushState({ page: 2 }, null, "?/animation");

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

      outlet.innerHTML = animationTemplate;

      let geoKey = "hl5CFvCH0GGgkLuulKNPcQ5q1bPDGvYH";

      //get user location
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        let geoLink = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${geoKey}&location=${lat},${long}&includeRoadMetadata=true&includeNearestIntersection=true`;

        fetch(geoLink)
          .then((r) => r.json())
          .then((data) => {
            let res = data.results[0].locations[0];

            console.log(
              `${res.adminArea5}, ${res.adminArea3}, ${res.adminArea1} `
            );

            let userLocation = document.getElementById("location");

            userLocation.innerHTML = `${res.adminArea5}, ${res.adminArea3}, ${res.adminArea1} `;
          });
      });

      showAnimation();
      let refreshButton = document.getElementById("refresh");
      refreshButton.addEventListener("click", refresh);
      let logoutButton = document.getElementById("logout");
      logoutButton.addEventListener("click", logout);
    } else {
      alert("username not found or password is incorrect!");
    }
  }

  //display animation
  async function showAnimation() {
    let animation = await fetch(
      " https://cs445-project.herokuapp.com/api/animation",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${loginToken.token}` },
      }
    );
    let resA = await animation.text();
    let frame = resA.split("=====\n"); //split the animation into an array

    let frameCount = 0;
    timerId = setInterval(function () {
      document.getElementById("animation").innerHTML =
        frame[frameCount % frame.length]; //use modulus to make the animation run forever
      frameCount++;
    }, 300);
  }

  //function refresh
  function refresh() {
    clearInterval(timerId);
    document.getElementById("animation").innerHTML = "";
    showAnimation();
  }

  //function logout
  function logout() {
    history.pushState({ page: 2 }, "animation", "?/login ");
    clearInterval(timerId);
    outlet.innerHTML = loginTemplate;
    window.onload();
    loginButton.addEventListener("click", login);
  }
};
