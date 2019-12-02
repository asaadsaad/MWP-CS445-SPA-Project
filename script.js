window.onload = function () {

  let token;
  let timerId;
  let count;
  let anime;
  const loginTemplate = `
       <h1>Please login</h1>
       UserName <input placeholder="mwp" value="mwp"/> <br>
       Password <input older="123" value="123"/> <br>
       <button id="login">Login</button>`;

  const animationTemplate =
    `
         <div id="adress">Welcome to SPA Animation</div>
         <textarea name="" id="animation1" cols="50" rows="20" style="font-size: 18px;"></textarea> <br>
         <button id="refresh">Refresh Animation</button>
         <button id="logout">Logout</button>
         `;

  let post = async function () {

    {
      const response = await fetch('http://mumstudents.org/api/login',
        {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: "mwp", password: "123" })
        })

      const myresponse = await (response.json());
      token = myresponse.token;
      myGet();
    }
  }

  myGet = async function () {
    clearInterval(timerId);

    const result = await fetch('http://www.mumstudents.org/api/animation',
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    const obj = await result.text()
    const anime = obj.split("=====\n");
    const mylength = anime.length;
    count = 0;

    history.pushState(anime, "document.title", "index.html");
    console.log(history.state.length)
    timerId = setInterval(function () {
      document.getElementById("animation1").innerHTML = anime[count];
      count++
      if (count === mylength) {
        count = 0;
      }
    }, 200);

  }
  function locationFinder() {

    let Key = "nOkTZJzGcN8wKdZbHtemhMf4zHkvJBVG";

    navigator.geolocation.getCurrentPosition(success);

    async function success(position) {

      long = position.coords.longitude;
      lat = position.coords.latitude;

      let theLocation = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${Key}&location=${lat},${long}&includeRoadMetadata=true&includeNearestIntersection=true`)
      theLocation = await theLocation.json()

      const city = theLocation.results[0].locations[0].adminArea5;
      const state = theLocation.results[0].locations[0].adminArea3;

      document.getElementById('adress').innerHTML = `welcome all from ${city}, ${state}`;
    }
  }

  history.pushState("login", "document.title", "index.html");
console.log(history.state)

  function login() {
    document.getElementById("outlet").innerHTML = loginTemplate;
    clearInterval(timerId);
    //  let x= "file:///Users/simon/Documents/cs%20445%20assignments/final%20project/MWP-CS452-2019-SPA-Project/index.html"
    //   window.location.replace(x);

  }

  login();

  function aniPage() {
    document.getElementById("outlet").innerHTML = animationTemplate;

    locationFinder()
    document.getElementById("logout").addEventListener("click", login);


    document.getElementById("refresh").addEventListener("click", myGet);

  }
  document.getElementById("login").addEventListener("click", aniPage);
  document.getElementById("login").addEventListener("click", post);

  clearInterval(timerId);
  //clearInterval(timerId1);

  window.addEventListener('popstate', function () {

    clearInterval(timerId);

    if (history.state === null) {
      clearInterval(timerId);
      //login()

    }
    if (history.state === login) {
      clearInterval(timerId)
      document.getElementById("outlet").innerHTML = history.state;
      // let x = "file:///Users/simon/Documents/cs%20445%20assignments/final%20project/MWP-CS452-2019-SPA-Project/index.html"
      // window.location.replace(x);


    }

    // clearInterval(timerId);

    count = 0;
    timerId = setInterval(function () {
      document.getElementById("animation1").innerHTML = history.state[count];
      count++
      if (count === history.state.length) {
        //console.log(history.state)
        count = 0;

      }

    }, 200);



  });


  //window.addEventListener('popstate', login)
  // clearInterval(timerId);

}











