/**
 * Funciton that loads the log in page without using the word defer in HTML
 */


window.onload = function firstPage() {

  let longitude;
  let latitude;
  let animationPage;
  const output = document.querySelector("#outlet");

  // This is creating HTML DOM for the log in page 

  const loginPage =
    `<h1>Please login</h1>
<h3>
<label >First name:</label><br>
<input type="text" id="firstname" value = "map"/> <br>
<label >Password:</label><br>
<input type="text" id="password" value = "123456"> <br>
<button id ="login">Login</button>
</h3>`

  output.innerHTML = loginPage;


  const login = document.querySelector("#login");

  /**
   * This function generates token and allows the user to login if the user id and password are correct. This takes us to the next page where the animation is shown.
   */

  login.onclick = async function () {

    let user = await fetch(`https://cs445-project.herokuapp.com/api/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: firstname.value,
        password: password.value
      }) // sending the post request according to the requirement of API

    });

    // console.log(user) 
    const authorize = await user.json(); //because we are receiving data as json accoriding to the instructions in API
     console.log(authorize)


    if (authorize.status) {

      animationPage =
        `<h4>Welcome to ${longitude}, ${latitude}</h4> 
        <textarea id = "animationpage" cols = "75" rows = "25"></textarea><br>
        <button id="refresh">Refresh Animation</button>   <button id ="logout">Logout</button>` //This is just a layout which can be edited later on as per the requirement to get the details of city and area from the mapQuest website with the help of longitude and latitude we have.

        //In this beginning I wrote longitude and latitude in the innerHTML textboxjust to see if that is printed in innerHTML. Later on I am going to change this tag fetching the city name and full address with the help of latitude and longitude

      output.innerHTML = animationPage;

      const anime = document.querySelector("#refresh");
      const stopanime = document.querySelector("#logout");
      let loop;

      /**
       * This function is to get the request for string that is needed to workout on the animation.
       */
      
      anime.onclick = async function star() {

        let animation = await fetch(`https://cs445-project.herokuapp.com/api/animation`, {
          method: "get",
          headers: {
            "Authorization": "Bearer " + authorize.token
          }
        });
        console.log(authorize.token)
        // console.log(animation)
        const characters = await animation.text();
        // console.log(characters)


        let frames = characters.split("=====\n")
        let x = frames.length;
        let currentPos = 0;
        animationpage.innerHTML = frames[0];

        loop = setInterval(() => {
          // currentPos;
          animationpage.innerHTML = frames[currentPos++];
          if (currentPos === x) {
            currentPos = 0;
          }
        }, 200);

        // clearInterval(loop);

        anime.onclick = function () {
          clearInterval(loop);
          star();
        }

        stopanime.onclick = function () {
          clearInterval(loop);
          firstPage();
        }

      }

      navigator.geolocation.getCurrentPosition(success, fail);

      /**
       * This function gives us longitude and latitude if runs successfully to be used in navigator.geolocation.getCurrentPosition
       */

      async function success(position) {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;

        try {

          const geoposition = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=FAL1JLFMUlCJQtNdzgA8WyJtIiayOEDS&location=${latitude},${longitude}`)


          // console.log(geoposition);
          const data = await geoposition.json();
          // console.log(data);
          // return data;

          const city = data.results[0].locations[0].adminArea5 ;
          const county = data.results[0].locations[0].adminArea4;
          // const countyType = data.results[0].locations[0].adminArea4Type;
          const state = data.results[0].locations[0].adminArea3;
          const country = data.results[0].locations[0].adminArea1;

          document.querySelector("h4").innerHTML = `Welcome all from ${city}, ${county} county, ${state} state, ${country}`

        } catch (error) { //if the location data cannot be fatched

          console.log(error)
        }

      }

      function fail(msg) { // this is the fail function for navigator.geolocation.getCurrentPosition method

        console.log(msg.code + msg.message); // Log the error
      }
    } else {
      output.innerHTML = "error: Please try again....."
    }

  }
}