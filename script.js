window.onload = function () {
    const outlet = document.getElementById('outlet');

    let loginView = `<div id="loginView">
        <h1>Please Login</h1>
        <label for="username">UserName: </label>
        <input type="text" id="username" value="mwp"><br>
        <label for="password">Password: </label> 
        <input type="password" value="123"><br>
        <button id="login">Login</button>
    </div>`;
    outlet.innerHTML = loginView;

    let loginBtn = this.document.getElementById('login');
    loginBtn.addEventListener('click', injectAnimationView);

    function injectAnimationView() {
        let animationView = `
    <div id="animationView">
        <h2>Your location</h2>
        <textarea id="animationArea" cols="100" rows="30"></textarea><br>
        <button id="refresh">Refresh Animation</button>
        <button id="logout">Logout</button>
    </div>`;
        outlet.innerHTML = animationView;
    }
}
