window.onload = function () {


  let longitude;
  let latitude;
  const output = document.querySelector("#outlet");
  let loc;
  let animationPage;


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

  login.onclick = async function () { //ask token to Asaad.

    let user = await fetch(`https://cs445-project.herokuapp.com/api/login`, {
      method: "post",
      body: JSON.stringify({
        username: firstname.value,
        password: password.value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });


    // console.log(user)
    const authorize = await user.json();
    console.log(authorize)


    if (authorize.status) {
      navigator.geolocation.getCurrentPosition(success, fail);

      async function success(position) {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;

        try {

          const geoposition = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=FAL1JLFMUlCJQtNdzgA8WyJtIiayOEDS&location=${latitude},${longitude}`)

          const data = await geoposition.json();
          console.log(data)
          // return data;

          document.querySelector("h4").innerHTML = `Welcome all from ${data.results[0].locations[0].adminArea5},${data.results[0].locations[0].adminArea4} ${data.results[0].locations[0].adminArea4Type},${data.results[0].locations[0].adminArea3} ${data.results[0].locations[0].adminArea3Type}, ${data.results[0].locations[0].adminArea1}`

        } catch (error) {
          
          console.log(error)
        }

      }


      animationPage =
        `<h4>Welcome all from ${longitude} and ${latitude}</h4>
   <textarea id = "animation page" cols = "75" rows = "25"></textarea><br>
   <button id="refresh">Refresh Animation</button>   <button id ="logout">Logout</button>`


      const anime = document.querySelector("#refresh");

      output.innerHTML = animationPage;

      anime.onclick = async function () {

        let animation = await fetch(`https://cs445-project.herokuapp.com/api/animation`, console.log({
          method: "post",
          body: JSON.stringify({
            username: firstname.value,
            password: password.value
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }));

        const characters = await animation.json();
        console.log(characters)
      }


      function fail(msg) {

        console.log(msg.code + msg.message); // Log the error
      }
    } else {
      output.innerHTML = "error: Please try again....."
    }

  }
}