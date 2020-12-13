// your code here

window.onload = animationApp;


 window.addEventListener('popstate',animationApp);

function animationApp() {

  const GEOLOCATION_API_KEY = "KAPjZLb1XuZglHU4hsaPZ3ip7ZRHUaFm";

  let animationId;
  let token;

  const loginPage = `
 <h1>Please login</h1>
 UserName <input placeholder="mwp" value="mwp"/> <br>
 Password <input older="123" value="123"/> <br>
 <button id='login'>Login</button>`;

  const animationPage = `
<div id="adress">Welcome to SPA Animation</div>
<textarea name="" id="animation" cols="50" rows="20" style="font-size: 18px;"></textarea> <br>
<button id="refresh">Refresh Animation</button>
<button id="logout">Logout</button>
`;

  pagination({page:'login'},"/login");
  /**
   * @param  {string} state for the login page template
   * @param  {string} random for the null history
   * @param  {string} url for the url of the login page.
   * @returns {string} displays the login page.
   */
  function pagination(state, random, url) {
    if (state.page === 'login') {
      document.getElementById("outlet").innerHTML = loginPage;
      history.pushState(state,null,url);
    }
    if (state.page === 'animation') {
      document.getElementById("outlet").innerHTML = animationPage;
      history.pushState(state,null,url);
    }
  }

  // click login button invokes fetching function to get token and takes to the animation page.
  /**
   * @param  {string} "login" the button for login to the login page;
   * @returns {string} returns the login page
   */
  document.getElementById("login").addEventListener("click", function(e) {
    fetching();
    fetchAdress();
    /**
     * @param  {'animation'}} {page of the animation page.
     */
    pagination({page:'animation'},'/animation');
  });

  async function fetching() {
    let data = {
      username: document.querySelectorAll("input")[0].value,
      password: document.querySelectorAll("input")[1].value
    };

    //fetching the token for the username and password from the url.
    const res = await fetch("http://www.mumstudents.org/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain,*/*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    token = result.token;
    console.log(token);

    fetchAnimation();

    //refresh annimation button &
    //invoking the fetchAnimation from here.&
    //logout button.

  document.getElementById("refresh").addEventListener("click", fetchAnimation);
  document.getElementById("logout").addEventListener("click", function() {
    clearInterval(animationId);
    pagination({page: 'login'});
  });
  }

  //getting the geoloation.
  function fetchAdress() {
    navigator.geolocation.getCurrentPosition(success, failed);

    async function success(position) {
      let long = position.coords.longitude;
      let lat = position.coords.latitude;

      console.log(position);

      let response = await fetch(
        `http://www.mapquestapi.com/geocoding/v1/reverse?key=${GEOLOCATION_API_KEY}&location=${lat},${long}&&includeRoadMetadata=true&includeNearestIntersection=true`
      );
      response = await response.json();
      console.log(response);
      const city = response.results[0].locations[0].adminArea5;
      const state = response.results[0].locations[0].adminArea3;
      const country = response.results[0].locations[0].adminArea1;
      const zip = response.results[0].locations[0].postalcode;

      document.querySelector(
        "#adress"
      ).innerHTML = `welcome all from ${city},${state},${country}`;
    }

    function failed(err) {
      document.querySelector("#address").innerHTML = "welcome anonymous";
    }
  }
  async function fetchAnimation() {
    //any time you are clicking the refresh animation, the animation Id needs to be cleared.
    //clear interval is calling from here.

    if (animationId) {
      clearInterval(animationId);
    }

    const response = await fetch("http://www.mumstudents.org/api/animation", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response);
    const animation = await response.text();
    console.log(animation);

    //changing the animation to array in order to play the diffent parts at interval.
    const frames = animation.split("=====\n");
    const framelength = frames.length;
    let currentframe = 0;

    animationId = setInterval(() => {
      document.querySelector("#animation").value = frames[currentframe];
      currentframe++;
      if (currentframe === framelength) {
        currentframe = 0;
      }
    }, 200);
    //display the animation in the text area.
    document.getElementById("animation").innerHTML = animation;
  }
}
