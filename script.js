window.onload = function () {
  let token;
  let timerId;
  let Key = "nOkTZJzGcN8wKdZbHtemhMf4zHkvJBVG"

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
      myGet()
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
    console.log(obj)
    const anime = obj.split("=====\n");

    console.log(anime)
    const mylength = anime.length;
    let count = 0;



    timerId = setInterval(function () {
      document.getElementById("animation1").innerHTML = anime[count];
      count++
      if (count === mylength) {
        count = 0
      }

    }, 200);
  }
  function locationFinder() {
  navigator.geolocation.getCurrentPosition(success);
    let long, lat
   async function success(position) {
        long= position.coords.longitude.toFixed(3)
        lat= position.coords.latitude.toFixed(3)
      console.log(long +"," + lat)
    let theLocation = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${Key}&location=${lat},${long}&&includeRoadMetadata=true&includeNearestIntersection=true`)
         theLocation= await theLocation.json()
 
    const city=theLocation.results[0].locations[0].adminArea5;
    const state=theLocation.results[0].locations[0].adminArea3;
      
      document.getElementById('adress').innerHTML=`welcome all from ${city }, ${state}` ;
    }}

  function myHTML() {

    function login() {
      document.getElementById("outlet").innerHTML = loginTemplate
    }
    login();

    function aniPage() {

      document.getElementById("outlet").innerHTML = animationTemplate;
      locationFinder()
      document.getElementById("logout").addEventListener("click", login)
      document.getElementById("refresh").addEventListener("click", myGet)
    }
    document.getElementById("login").addEventListener("click", aniPage)
    document.getElementById("login").addEventListener("click", post)
  }

  myHTML();

}



