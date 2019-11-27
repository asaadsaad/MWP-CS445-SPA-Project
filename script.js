window.onload = main;
function main() {

    // outlet declaration
    const out = document.querySelector('#outlet');

    const logins = `
        <h2>Please LogIn</h2>
        User name : <input type="text" id="uname" placeholder="username" value="mwp" />
        Password : <input type="text" id="pass" placeholder="password" value="123" />
        <input type="button" id="lgin" value="Login"/>`;

    const animations = `
    <div id="location">WELCOME to ASCII Animation SPA</div> 
    <textarea id="animation" style="font-size: 15px;" rows="55" cols="35" ></textarea><br>
    <input type="button" id="refr" value="Refresh Animation" />
    <input type="button" id="lout" value="Log Out" />`;
    // create two routes
    let MyRouters = function (name, routers) {
        return
        ({
            name: name,
            routers: routers
        });
    };

    let myRouts = new MyRouters("myRouts",
        [
            {
                path: "/",
                name: "Login - Page"
            },
            {
                path: "/animation",
                name: "Animation - Page"
            }
        ]);

    let currPath = window.location.pathname;
    if (currPath === "/") {
        out.innerHTML = logins;
    } if (currPath === "/animation") {
        out.innerHTML = animations;
    }

}