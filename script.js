/* eslint-disable require-jsdoc */
"use strict";
window.onload = function () {

  const key = "iMLTuAXntzfWDQsqrKFVOiQKURpyaCnf";
  let longitude;
  let latitude;
  let output = document.querySelector("#outlet");
  let logInView = `
   <h1>Login Here</h1>
   Username:<input id="mwp" value="MWP"/><br>
   Password: <input id="123" value="123"/><br>
   <button id = "logIn">Loging</button> `;
  let Username = document.getElementById("#mwp");
  let Password = document.getElementById("#123");
  //About login view and the login function. 
  output.innerHTML = logInView;
  let logInElement = document.querySelector("#logIn");
  logInElement.addEventListener("click", logIn);

  //This variable is about the textarea where our animation is displayd
  let animationView = `
    <h1 id="myLocation"></h1>
    <textarea id="animation" rows="20" cols="40"style="font-size:10px"></textarea>
    <button id="refresh">Refresh Animation</button>
    <button id="logOut">Logout</button>`;
  //logIn function takes as to the animation area
  function logIn() {
    alert("welcome! you are loged in to the animation page!");
    output.innerHTML = animationView;
    let logOutElement = document.getElementById("logOut");

    logOutElement.addEventListener("click", logOut);
    myGeoLocation();
  }
  //loOut function can bringback to the login page
  function logOut() {
    alert("goodbye!you are going to logout!");
    output.innerHTML = logInView;
  }
  //geo location function can provide "Allow" and "block" options to get the latitude and altitude.
  // success function can work the allow, and the fail function do if the user press block  the function will show the message
  //also call the getLocation function 

  function myGeoLocation() {
    navigator.geolocation.getCurrentPosition(success, fail);
    function success(position) {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      console.log(position)
      getLocation();
    }
    function fail(err) {
      console.log(err.code + err.message)
    }
  }
  //getLocation function can get our eact location from map by using the KEY
  async function getLocation() {
    let response = await fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${key}&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true`, {
      method: "GET",
      headers: {
        "Countent-Type": "application/json",
      }
    })
    let getResponse = await response.json();
    console.log(getResponse);
    let country = getResponse.results[0].locations[0].adminArea1;
    let state = getResponse.results[0].locations[0].adminArea3;
    let city = getResponse.results[0].locations[0].adminArea5;
    document.querySelector("#myLocation").innerHTML = `WELCOME TO THE UNIFIED FIELD OF ${country},${city},${state}`
  }


};
