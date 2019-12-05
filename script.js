window.onload = function () {
  let outlet, token = null, animation = null, userLatitude = 0, userLongitude = 0,
    loginPage, animationPage;

  outlet = document.getElementById("outlet");


  loginPage = `<h1>Please Login</h1>
    <br />
    <form id="myLoginForm">
    <label>
    <span><b>Username</b></span>
    <input type='text' id='userName' value='mwp' required/> 
    </label>
    <br />   
    <label>
    <span><b>Password</b></span>     
    <input type='text' id='userPassword' value='123' required/> 
    </label>
    <br />  
    <button type="submit" id="submit">login</button>
     </form>`,

    animationPage = `<h3 id="locationTag"></h3>
      <textarea id="animationArea" cols="50" rows="20"></textarea>
      <br />
      <button id="loadAnimationBtn">load animation</button>
      <button id="logOutBtn">log out</button>
      `;

  outlet.innerHTML = loginPage;
  document.getElementById("myLoginForm").onsubmit = submitForm;

  async function submitForm(event) {
    event.preventDefault();
    let userName = document.querySelector("#userName").value;
    let userPassword = document.querySelector("#userPassword").value;
    let restoken = await getToken("http://mumstudents.org/api/login", {
      username: userName,
      password: userPassword
    });
    token = restoken.token;
    loadAnimation();
    
  };

  /**
   * Function to get a token asynchronously
   * @param {String} url the url to fetch token
   * @param {Object} data an object to be passed to the request body
   */
  async function getToken(url = "", data = {}) {
    const response = await fetch(url, {
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

  /**
   * 
   * @param {String} url the url to get Animation 
   */
  async function getAnimations(url = "") {
    const response = await fetch(url, {
      headers: new Headers({
        Accept: "application/json",
        Authorization: "Bearer " + token
      })
    });
    return await response.text();
  }

  /**
   * the function load Animation and split the animation data to animate ever pice
   */
  async function loadAnimation() {
    try {
      animation = await getAnimations("http://mumstudents.org/api/animation");
      animationArr = animation.split("=====\n");
      outlet.innerHTML = animationPage;
      history.pushState(animationArr, null, '/login');

      getLocation();
      document.getElementById("loadAnimationBtn").onclick = () =>
        loadAnimation();
      document.getElementById("logOutBtn").onclick = () => logOut();
      loadAnimationWithInterval();
    
    }
    catch (err) {
      console.log(err);
    }
  };
window.addEventListener("popstate",function(){
  if(history.state==null){
    logOut();

  }
  else{
    clearInterval(animationInterval);
    animationArr=history.state;
loadAnimationWithInterval();


  }
  
})
  /**
   * the function load animation with 200 millisecond intervals 
   */
  function loadAnimationWithInterval() {
    let animationArea = document.getElementById("animationArea");
    let animationLength = animationArr.length;
    let counter = 0;
    animationInterval = setInterval(() => {
      if (animationLength > 0 && counter < animationLength) {
        animationArea.innerHTML = animationArr[counter];
        counter++;
      } else {
        counter = 0;
      }
    }, 200);
  }

  /**
   * the function clear the interval function when the logOut button click
   */
  function logOut() {
    clearInterval(animationInterval);
    outlet.innerHTML = loginPage;
    token = null;
  }

  /**
   * 
   */
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  /**
   * 
   * @param {*} position 
   */
  function showPosition(position) {
    userLatitude = position.coords.latitude;
    userLongitude = position.coords.longitude;
    fetch(
      `http://www.mapquestapi.com/geocoding/v1/address?key=SfsY2tGYHQs6eSYNdkGOysxRyL5Dz4cl&location=${userLatitude},${userLongitude}`

    )
      .then(res => res.json())

      .then(data => {
        let address = data.results[0].locations[0];
        console.log(address);

        let street = address.street;
        let state = address.adminArea3;
        let country = address.adminArea1;
        document.getElementById("locationTag").innerHTML =
          `Wellcome All from ${street}, ${state}, ${country}!`;
      });
  }

} 
