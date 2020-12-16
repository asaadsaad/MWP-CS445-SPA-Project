let login_Page = `<h1>Please Login</h1><br>
    Username:<input type="text" id="name"><br>
    Password: <input type="number" id="num"><br>
    <button id="logbtn">Login</button>`

let animation_Page = `<h1>Welcome All</h1>
    <h2 id="location"></h2>
    <textarea rows="40" cols="100" id="anim"></textarea>
    <button  id="ref">Refresh Animation</button>
    <button  id="log">Logout</button>`

window.onload = loginPage


function loginPage() {
    let value = document.querySelector("#outlet")
    value.innerHTML = login_Page;


    let g = document.getElementById("logbtn")
    g.addEventListener('click', logged)
}


function logged() {
    let value = document.querySelector("#outlet")
    value.innerHTML = animation_Page

    let g = document.getElementById("log")
    g.addEventListener('click', loginPage)


}











