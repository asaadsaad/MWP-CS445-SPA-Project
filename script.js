// your code here
window.onload = page;
function page() {
    const loginPage =
        `<h3>Please Login</h3>Username <input id="username" type="text"><br>
Password <input id="password" type="text"><br>
<button id="login">Login</button>`

    const animationPage = `    <h3>welcome All from<h3 id="location"></h3>
                </h3>
                <textarea id="textarea" cols="50" rows="15"></textarea><br>
                <button id="refAnimBtn">Refresh Animation</button>
                <button id=" logoutBtn">Logout</button>`;


    const outlet = document.getElementById("outlet");
    outlet.innerHTML = loginPage;
    const loginBtn = document.getElementById("login");
    loginBtn.addEventListener("click", loadAnimationPage);
    function loadAnimationPage() {
        outlet.innerHTML = animationPage;

    }


}


