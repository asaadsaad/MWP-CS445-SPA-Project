
let longitude, latitude,Token_state, token,Animation_Interval, Movement,status;
let count;
let GeoLocation_API_Key = "HwjbARM7eZ8xN7Kk4MSLC612gHNZCewS"
//let value = document.querySelector("#outlet")


let login_Template = `<h1>Please Login</h1><br>
    Username:<input type="text" id="txt" value="map"><br>
    Password: <input type="number" id="num" value="123456"><br>
    <button id="logbtn">Login</button>`

let animation_Template = `
    <h2 id="location"></h2>
    <textarea rows="40" cols="100" id="anim"></textarea><br>
    <button  id="ref">Refresh Animation</button>
    <button  id="log">Logout</button>`

window.onload = loginPage


function loginPage() {
    let value = document.querySelector("#outlet")
    value.innerHTML = login_Template;
    history.pushState({
        page: 1
    }, "login", "?login")


    let g = document.querySelector("#logbtn")
    g.addEventListener('click', logged)
}

window.addEventListener('popstate', function (event) {
    if (event.state.page === 1) {
        clearInterval(count)
        logged()

    } else {
        clearInterval(count)
        HistoryArrow()

    }
})
async function logged() {
    let Obj = await fetch("https://cs445-project.herokuapp.com/api/login", {
        method: "post",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            "username": "map",
            "password": "123456"
        })
    })

    const data = await Obj.json()
    token = data.token
    console.log(data)
    status = data.status

    if (status === true) {
        HistoryArrow();

    }
}


function HistoryArrow() {

    let value = document.querySelector("#outlet")
    value.innerHTML = animation_Template
    history.pushState(
        { page: 2 }, "animation", "?animation"
    )
    moveanim()
    location_animation()
}
function location_animation() {

    navigator.geolocation.getCurrentPosition(accept, () => { value.innerHTML = "please accept location" })
    async function accept(spot) {
        latitude = spot.coords.latitude
        longitude = spot.coords.longitude
        const data = await fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${GeoLocation_API_Key}&location=${latitude},${longitude}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" }

            })
        const adress = await data.json();
        let x = adress
        let Location = document.querySelector("#location")
        Location.innerHTML = `welcome all from ${x.results[0].locations[0].adminArea5},${x.results[0].locations[0].adminArea3},${x.results[0].locations[0].adminArea1}`
    
        animevent()
    }
}

async function moveanim() {
    const result = await fetch("https://cs445-project.herokuapp.com/api/animation", {
        method: "GET",
        headers: {
            "Content-Type": "application/text",
            Authorization: `Bearer ${token}`
        }
    })
    sourcedata = await result.text();
    console.log(sourcedata);
    const splitdata = sourcedata.split("=====\n");
    anim.innerHTML = splitdata[0];
    let next = 1;
    let maxlength = splitdata.length;
    clearInterval(count)
    count = setInterval(() => {
        anim.innerHTML = splitdata[next];
        next++;
        if (next === maxlength) {
            next = 0;
        }
    }, 200);

  
}


function Logout() {
    let value = document.querySelector("#log")
    value.innerHTML = loginPage;

    Token_state = null;
    loginPage();
}
function animevent() {
    let Refresh = document.querySelector("#ref")
    let Logout = document.querySelector('#log')
    Refresh.addEventListener("click",HistoryArrow )
    Logout.addEventListener("click", loginPage)
}











