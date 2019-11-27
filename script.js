// TODO wrap into function

// animation fields
let animationIndex = 0;
let animationFrames = [
  ".          ",
  "  .        ",
  "    .      ",
  "      .    ",
  "        .  ",
  "          .",
  " .         ",
  "   .       ",
  "     .     ",
  "       .   ",
  "         . "];
let animationTimerId;

// tokens
let token;
let isLoggedIn;
let geoApiKey;

// html fields
let outlet;
const logInPageTemplate = `
  <div class="container" id="login-div">
  <h1>Please login</h1>
    <div id="login-error" class="hidden">Invalid username/password. <br>Try again. </div>
    Username: <input type="text" id="username" value="mwp"> <br>
    Password: <input type="password" id="password" value="123"> <br>
    <button id="login-btn">Log in</button> 
  </div>
`; // TODO remove default log in data
const animationPageTemplate = `
  <div class="container" id="animation-div">
    Welcome all from <span id="location-span">somewhere</span> <br>
    <textarea id="animation-area"> </textarea> <br>
    <button id="refresh-btn">Refresh</button>
    <button id="logout-btn">Log out</button>
  </div>
`;

window.addEventListener("load", onload);
window.addEventListener("popstate", onpopstate);

function processAndDisplayAnimation(rawText) {
  animationFrames = rawText.split("=====\n");
  clearInterval(animationTimerId);
  animationIndex = 0;
  animationTimerId = setInterval(animate, 200);
}


/****************************
 *   Async functions
 *****************************/

/** 
URL: http://mumstudents.org/api/animation 
HTTP verb: GET
Request header must include the following: 
Authorization: Bearer token
Replace the token from the response received after you log in.
The server will send back a string response contains the full ASCII animation frames
*/
async function fetchAnimation(success, fail) {
  try {
    const response = await fetch("http://mumstudents.org/api/animation", {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
    });

    const text = await response.text();
    success(text);
  } catch (data) {
    console.error(data);
    fail();
  }
}

/** 
URL: http://open.mapquestapi.com/geocoding/v1/reverse
HTTP verb: GET
You will need to pass an API key and the user current coordinates as query parameters. Read the docs for more details.
This request should return back a JSON object with full details about the location.
 */
async function fetchLocation(long, lat, success, fail) {
  
  const key = "94NZs8hqHEZqPbNAztQlsonqALhJJ1Ic";
  try {
    const response = await fetch(`https://www.mapquestapi.com/geocoding/v1/reverse?key=${key}&location=${lat}%2C${long}&outFormat=json&thumbMaps=false`);
    const bodyObj = await response.json();
    const locations = bodyObj.results[0].locations;
    if (locations.length>0){
      let location = locations[0].adminArea5 + ", " + locations[0].adminArea3 + ", " + locations[0].adminArea1;
      success(location);
    }
   

  } catch (error) {
    console.error(error);
    fail();
  }
}
/** 
URL: http://mumstudents.org/api/login
HTTP verb: POST
Request body: JSON format
{“username”: “mwp”, “password”: “123”
The server will send a JSON response with the following format: {token: string, status: true}
 */
async function fetchToken(user, pw, success, fail) {

  try {
    const response = await fetch("http://mumstudents.org/api/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username: user, password: pw })
    });
    const bodyObj = await response.json();
    token = bodyObj.token;
    success();
  } catch (error) {
    console.error(error);
    fail();
  }


}


/****************************
 *   DOM Manipulations
 *****************************/
function displayLoginError() {
  document.getElementById("login-error").classList.remove("hidden");
}
function displayAnimationError() {
  document.getElementById("animation-area").value = "Error: Could not load animation";
}
function displayLocationError() {
  document.getElementById("location-span").innerText = "Earth";
}
function displayLocation(location) {
  document.getElementById("location-span").innerText = location;
}
function animate() {
  animationIndex = (++animationIndex) % animationFrames.length;
  document.getElementById("animation-area").value = animationFrames[animationIndex];
}
function goToLogin() {
  // change state
  history.pushState({ page: 1 }, "Login", "?page=1");

  // set html
  outlet.innerHTML = logInPageTemplate;
  // add btn listeners
  document.getElementById("login-btn").addEventListener("click", onClickLogin);

}
function goToAnimation() {

  // change state
  history.pushState({ page: 2 }, "Animation", "?page=2");

  // set html 
  outlet.innerHTML = animationPageTemplate;

  // add btn listeners
  document.getElementById("logout-btn").addEventListener("click", onClickLogout);
  document.getElementById("refresh-btn").addEventListener("click", onClickRefreshAnimation);


  // obtain location information
  navigator.geolocation.getCurrentPosition(
    pos => {
      fetchLocation(pos.coords.longitude, pos.coords.latitude, displayLocation, displayLocationError);
    },
    msg => {
      console.log(msg);
      displayLocationError();
    });

  // request animation
  fetchAnimation(processAndDisplayAnimation, displayAnimationError);
}


/****************************
 *   DOM Event Handlers
 *****************************/
function onload() {
  outlet = document.getElementById("outlet");
  goToLogin();
}
function onpopstate() {
  // TODO
}
function onClickLogin() {
  // get username/pw from user
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  // validate user / fetch access token. on success load animation page. on fail, display error
  fetchToken(username, password, goToAnimation, displayLoginError);
}
function onClickLogout() {
  // cancel interval
  clearInterval(animationTimerId);

  // clear app session data
  animationTimerId = null;
  token = null;
  animationFrames = null;
  animationIndex = 0;
  isLoggedIn = false;

  // load log in page
  goToLogin();

}
function onClickRefreshAnimation() {
  // request animation
  fetchAnimation(processAndDisplayAnimation, displayAnimationError);

}