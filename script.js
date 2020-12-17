window.onload = singlePage;
window.addEventListener('popstate', singlePage)
function singlePage() {

  const KEY = "5aQ8mwDkBUizqbxGg48NuIcoWCnogSyM";

  let animationId;
  let token;
  let movement;
  let lati;
  let long;

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

window.addEventListener('popstate', function (event) {
  if (event.state.page === 1) {
      clearInterval(animationId)
      stream();
  } else {
      clearInterval(animationId)
      robotLogin();
  }
})

stream()
   
function stream() {
    let outlet = document.querySelector("#outlet");
    outlet.innerHTML = loginStream;
    
    history.pushState({
        page: 1
    }, "login", "?login")

    
    let button = document.querySelector("#login");

    
    button.addEventListener("click", fetchLogin);
  }

async function fetchLogin() {
    const result = await fetch("https://cs445-project.herokuapp.com/api/login", {
    method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": "map",
            "password": "123456"
        })
    })

    const myJson = await result.json()
    token = myJson.token;
    const status = myJson.status;

    if (status === true) {
        robotLogin(); 
    }
}

function robotLogin() {
  history.pushState({
      page: 2
  }, "animation", "?animation")
  outlet.innerHTML = animationStream;

  fetchAddress();
  callRobot(); 
}

function fetchAddress() {

  navigator.geolocation.getCurrentPosition(success, fail);
  
  function success(position) {
      long = position.coords.longitude;
      lati = position.coords.latitude;
      address(); 
      loginAndOut(); 
  }
  
  function fail(msg) {
      alert(`${msg.code} ...... ${msg.message} `);
      
      outlet.innerHTML = "need geoLocation";
      

  }

}
async function address() {
  const result = await fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${Key}&location=${lati},${long}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      }
  })
  const position = await result.json();
  const city = position.results[0].locations[0].adminArea5;
  const state = position.results[0].locations[0].adminArea3;
  const country = position.results[0].locations[0].adminArea1;
  
  geolocation.innerHTML = `Thanks for accessing from ${city}, ${state} ${country}`;


}
function loginAndOut() {
    
  let refresh = document.querySelector("#refresh");
  let logout = document.querySelector("#logout");
  logout.addEventListener("click", logoutOf);
  refresh.addEventListener("click", removeAnimation);

}
function moving() {
  const array = movement.split("=====\n");
  
  let animation = document.querySelector("#animation");
  animation.innerHTML = array[0];
  
  let curr = 0;
  let maxlength = array.length;
  animationId = setInterval(() => {
      animation.innerHTML = array[curr];
      curr++;
      if (curr === maxlength) {
          curr = 0;
      }
  }, 200);
}
function removeAnimation(){
  clearInterval(animationId);
  callRobot();


}
function logoutOf() {
  outlet.innerHTML = loginStream;
  token = null;
  stream(); 


}
async function callRobot() {
  const result = await fetch("https://cs445-project.herokuapp.com/api/animation", {
      method: "GET",
      headers: {
          "Content-Type": "application/text",
          Authorization: `Bearer ${token}`

      }


  })
  movement = await result.text();
  moving();
}
}











