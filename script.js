window.onload = singlePage;

function singlePage() {

  const KEY = "5aQ8mwDkBUizqbxGg48NuIcoWCnogSyM";

  let animationId;
  let token;

  const loginStream = `
 <h1>Please login</h1>
 UserName <input placeholder="mwp" value="map"/> <br>
 Password <input placeholder="123" value="123456"/> <br>
 <button id='login'>Login</button>`;

  const animationStream = `
<div id="adress">Welcome to SPA Animation</div>
<textarea name="" id="animation" cols="50" rows="20" style="font-size: 18px;"></textarea> <br>
<button id="refresh">Refresh Animation</button>
<button id="logout">Logout</button>
`;

  stream({page:'login'},"/login");
  
   
  function stream(state, url) {
    if (state.page === 'login') {
      document.getElementById("outlet").innerHTML = loginStream;
      history.pushState(state, null, url);
    }
    if (state.page === 'animation') {
      document.getElementById("outlet").innerHTML = animationStream;
      history.pushState(state,null,url);
    }
  }
  document.getElementById("login").addEventListener("click", function(e) {
    streaming();
    streamFrom();
    
     
    stream({page:'animation'},'/animation');
  });

  async function streaming() {
    let data = {
      username: document.querySelectorAll("input")[0].value,
      password: document.querySelectorAll("input")[1].value
    };

    const response = await fetch("https://cs445-project.herokuapp.com/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain,*/*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    token = result.token;
    console.log(token);

    callRobot();

  document.getElementById("refresh").addEventListener("click", callRobot);
  document.getElementById("logout").addEventListener("click", function() {
    clearInterval(animationId);
    stream({page: 'login'},'login');
  });
  }

  function streamFrom() {
    navigator.geolocation.getCurrentPosition(success, failed);

    async function success(position) {
      let long = position.coords.longitude;
      let lat = position.coords.latitude;

      console.log(position);

      let response = await fetch(
        `http://www.mapquestapi.com/geocoding/v1/reverse?key=${KEY}&location=${lat},${long}&&includeRoadMetadata=true&includeNearestIntersection=true`
      );
      response = await response.json();
      console.log(response);
      const city = response.results[0].locations[0].adminArea5;
      const state = response.results[0].locations[0].adminArea3;
      const country = response.results[0].locations[0].adminArea1;
      const zip = response.results[0].locations[0].postalcode;

      let result = document.querySelector("#adress");
      result.innerHTML = `welcome all from ${city},${state},${country}`;
      
    }

    function failed(err) {
      document.querySelector("#adress").innerHTML = "welcome anonymous";
    }
  }
  async function callRobot() {
    
    if (animationId) {
      clearInterval(animationId);
    }

    const response = await fetch("http://www.mumstudents.org/api/animation", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response);
    const robot = await response.text();
    console.log(robot);

    
    const frames = robot.split("=====\n");
    const framelength = frames.length;
    let currentframe = 0;

    animationId = setInterval(() => {
      document.querySelector("#animation").value = frames[currentframe];
      currentframe++;
      if (currentframe === framelength) {
        currentframe = 0;
      }
    }, 200);
    
    document.getElementById("animation").innerHTML = robot;
  }
}
