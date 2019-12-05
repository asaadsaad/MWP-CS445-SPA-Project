/* eslint-disable require-jsdoc */
"use strict";

window.onload = function () {
  const key = "iMLTuAXntzfWDQsqrKFVOiQKURpyaCnf";
  let longitude, latitude, timerId, tokenObj, tokentAddress, animationArray, animArea, pathName, username, Password, output, logInView, logInElement, animationView, logOutElement;


  // let outlet=document.querySelector("#outlet");
  output = document.querySelector("#outlet");
  logInView = `
   <h1>Login Here</h1>
   Username:<input id="mwp" value="MWP"/><br>
   Password: <input id="123" value="123"/><br>
   <button id = "logIn">Loging</button> `;
  username = document.getElementById("#mwp");
  Password = document.getElementById("#123");
  //About login view and the login function.
  output.innerHTML = logInView;
  logInElement = document.querySelector("#logIn");

  logInElement.addEventListener("click", logIn);
  //This variable is about the textarea where our animation is displayd
  animationView = `
    <h1 id="myLocation"></h1>
    <textarea id="animation" rows="30" cols="60"style="font-size:10px"></textarea><br>
    <button id="refresh">Refresh Animation</button>
    <button id="logOut">Logout</button>`;

  //logIn function takes as to the animation area


  function logIn() {
    // alert("welcome to my page!");
    output.innerHTML = animationView;
    logOutElement = document.getElementById("logOut");
    logOutElement.addEventListener("click", logOut);

    animArea = document.querySelector("#animation")
    document.querySelector("#refresh").addEventListener("click", animationfetch);
    myGeoLocation();
    fetchanimationtoken()
    animationfetch()
    history.pushState({ data: "" }, null, "/animation")

  }
  //logOut function can bringback to the login page
  function logOut() {
    //alert("See you later!");
    output.innerHTML = logInView;
    let logInElement = document.querySelector("#logIn");

    logInElement.addEventListener("click", logIn);
    history.pushState({ data: "" }, null, "/Login")

  }

  //geo location function can provide "Allow" and "block" options to get the latitude and altitude.
  // success function can work the allow, and the fail function do if the user press block  the function will show the message
  //also call the getLocation function 

  function myGeoLocation() {
    navigator.geolocation.getCurrentPosition(success, fail);
    function success(position) {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      console.log(position);
      getLocation();

    }
    function fail(err) {
      console.log(err.code + err.message);
    }
  }
  //geoLocation function send the request by Get method to 
  //getLocation function can get our exact location from map by using the KEY(the uniqu id)
  async function getLocation() {

    let response, country, state, city, getResponse;

    response = await fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${key}&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    getResponse = await response.json();
    console.log(getResponse)
    country = getResponse.results[0].locations[0].adminArea1;
    state = getResponse.results[0].locations[0].adminArea3;
    city = getResponse.results[0].locations[0].adminArea5;
    document.querySelector("#myLocation").innerHTML = `WELCOME TO THE UNIFIED FIELD OF ${country},${city},${state}`
  }
  //this function fetch username and passward and recive incrypted token id used for getting animations
  async function fetchanimationtoken() {

    const result = await fetch(`http://mumstudents.org/api/login`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({

        'username': 'mwp',
        'password': '123'
      })
    });

    const tokenResult = await result.json();
    tokenObj = tokenResult.token
    console.log(tokenObj)

  }
  //animationfetch function send the request by using token id and get multiple animation 
  tokentAddress = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtd2EiLCJpc3N1ZWRBdCI6IjIwMTktMTEtMjciLCJ1c2VybmFtZSI6Im13cCJ9.U9ciwh5lcPwFlJdxhNQkeiMc7AMYAnawfKNidw8CNDpTIUjNBL_EtDqkXG4qGOF8H_Ve1S2Gg2PwmCYOkfgmWA"



  async function animationfetch() {
    const fetched = await fetch("http://mumstudents.org/api/animation", {
      method: 'GET',
      headers: {
        "content-type": "application/text",
        Authorization: `Bearer ${tokentAddress}`
      }
    })
    const animated = await fetched.text()
    animationArray = animated;
    console.log(animated);

    animationmove()

  }
  // animationmove can recive array of animations, the function make the frames move(build animation)
  function animationmove() {

    let animationFrame, count, max;
    animationFrame = animationArray.split("=====\n")
    console.log(animationFrame)
    count = 0;
    max = animationFrame.length;
    if (timerId) clearInterval(timerId);
    timerId = setInterval(() => {

      animArea.innerHTML = animationFrame[count];

      count++

      if (count === max) {
        count = 0
      }
    }, 250);

  }


  window.onpopstate = function (event) {
    pathName = location.pathname;
    if (pathName === "/Login") {
      output.innerHTML = logInView;
      let logInElement = document.querySelector("#logIn");

      logInElement.addEventListener("click", logIn);
    } else {

      logIn();

    }

  }
}


//histry is workign on live server not on default browser !