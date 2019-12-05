
function assignment() {
  let  playAnimationInterval =0 ,userAnimation = "" ,userToken = "" ,animArray = [], userLat = 0 , userLong = 0;
  let userLoginUI = `<h1> Please Login </h1>
     <form id="userLoginForm">
     username:<input type='text' id='username' value='mwp'/><br>  
     Password:<input type='password' id='password' value='123'/><br> 
     <button id="submit">Login </button>
     </form>`;
  let userAnimUI = `<h3 id="userLocation">user location</h3>
       <textarea id="animTag" cols="60" rows="27"></textarea>
       <br />
       <button id="animLoadButton">Refresh animation</button>
       <button id="userLogOutButton">Log out</button>
       `;
  async function getAnimationServer() {
    userAnimation = await gettingAnimations(
      "http://mumstudents.org/api/animation"
    );
    animArray = userAnimation.split("=====\n");
    getUserLocation();
    document.getElementById("outlet").innerHTML = userAnimUI;
    history.pushState(animArray, null, '/logging')
    playAnimWithInterval();
    document.getElementById("userLogOutButton").onclick = () => logOutUser();
    document.getElementById("animLoadButton").onclick = () => getAnimationServer();
  }

  function logOutUser() {
    clearInterval(playAnimationInterval);
    userToken = "";
    window.history.pushState({}, null, "/");
    document.getElementById("outlet").innerHTML = userLoginUI;
  }
  function playAnimWithInterval() {
    let animTag = document.getElementById("animTag");
    let animationLength = animArray.length;
    let animPlayCounter = 0;
    playAnimationInterval = setInterval(() => {
      if (animationLength > 0 && animPlayCounter < animationLength) {
        animTag.innerHTML = animArray[animPlayCounter];
        animPlayCounter++;
      } else {
        animPlayCounter = 0;
      }
    }, 200);
  }
  window.onload = () => {
    document.getElementById("outlet").innerHTML = userLoginUI;
    document.getElementById("userLoginForm").onsubmit = async function (event) {
      event.preventDefault();
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      let responseObj = await getTokenFromServer(
        "http://mumstudents.org/api/login",
        {
          username,
          password
        }
      );
      userToken = responseObj.token;
      getAnimationServer();
    };
  };
  window.addEventListener("popstate", function () {
    if (history.state === null) {
      logOutUser();

    }
    else {
      clearInterval(playAnimationInterval);
      animArray = history.state;
      playAnimWithInterval();
    }
  });


  async function getTokenFromServer(requesturl = "", data = {}) {
    const response = await fetch(requesturl, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data)
    });
    return await response.json();
  }
  async function gettingAnimations(requesturl = "") {
    const response = await fetch(requesturl, {
      headers: new Headers({
        Accept: "application/json",
        Authorization: "Bearer " + userToken
      })
    });
    return await response.text();
  }

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        userLat = position.coords.latitude;
        userLong = position.coords.longitude;
        fetch(
          `http://www.mapquestapi.com/geocoding/v1/address?key=leD58xaywYgcRGiGPl2hSPFJuBLaYqmm&location=${userLat},${userLong}`
        )
          .then(res => res.json())
          .then(data => {
            let street = data.results[0].locations[0].street;
            let state = data.results[0].locations[0].adminArea3;
            let country = data.results[0].locations[0].adminArea1;
            document.getElementById(
              "userLocation"
            ).innerHTML = ` Wellcome all from ${street}, ${state}, ${country}!`;
          });
      });
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
}

assignment();
