"use strict";
// MAP – CS445 - Final Project
// Linked to index.html File
(function () {
    let div;
    let userToken = "";
    // Create New Element and Add Properties. Append to Element
    let createElmt = function (elmtType, elmt, InfoAdd) {
        let el = document.createElement(elmtType);
        // Add Info to Created Element
        InfoAdd.forEach(function ([type, add]) {
            switch (type) {
                case "class":
                    el.classList.add(add);
                    break;
                default:
                    //******Type Error I Cannot Get Rid Of 
                    // type IfEquals<X, Y, A, B> =
                    // (<T>() => T extends X ? 1 : 2) extends
                    // (<T>() => T extends Y ? 1 : 2) ? A : B;
                    // type WritableKeysOf<T> = {
                    //     [P in keyof T]: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P, never>
                    // }[keyof T];
                    // type WritablePart<T> = Pick<T, WritableKeysOf<T>>;
                    // type key = WritablePart<keyStr>
                    // type keyStr = keyof HTMLElement
                    // el[type as keyof HTMLElement] = add; // 60+ Errors Cannot Assign Read Only Properties
                    // Error No index signature with a parameter of type 'string' was found on type 'HTMLElement'
                    el[type] = add;
            }
        });
        if (elmt)
            elmt.appendChild(el);
        return el;
    };
    let createLoginPage = function () {
        let frag = document.createDocumentFragment();
        // Form
        let form = createElmt("form", frag, [["class", "centered"], ["autocomplete", "one-time-code"]]);
        form.onsubmit = function () { return false; }; // Disable for Ajax
        // Header
        let el = createElmt("div", form, [["class", "centered"]]);
        createElmt("h2", el, [["class", "center"], ["innerText", "Please Login"]]);
        // Username
        let subEl = createElmt("p", el, []);
        createElmt("label", subEl, [["innerText", "Username:"]]);
        let user = createElmt("input", subEl, [["type", "text"], ["class", "margin"], ["value", "map"]]);
        // Password
        subEl = createElmt("p", el, [["class", "margin"]]);
        createElmt("label", subEl, [["innerText", "Password:"]]);
        let pw = createElmt("input", subEl, [["type", "password"], ["class", "margin"], ["value", "123456"]]);
        // Login Button
        subEl = createElmt("div", el, [["class", "center"], ["class", "margin"]]);
        createElmt("button", subEl, [["innerText", "Login"], ["class", "loginBtn"]]).onclick = function () {
            // Login
            let loginReq = {
                method: "POST",
                body: JSON.stringify({ username: user.value, password: pw.value }),
                headers: { "Content-Type": "application/json" }
            };
            HTTPRequest("https://cs445-project.herokuapp.com/api/login", loginReq)
                .then((n) => n.json())
                .then(({ status, token }) => {
                if (status) {
                    // Success - Load Animation Page
                    userToken = token;
                    loadAnimationPage();
                    this.onclick = null;
                }
                else {
                    //Invalid Login
                    userToken = "";
                    alert("User and/or Password Invalid. Please Verify Username/Password and Try Again");
                }
            });
        };
        return frag;
    };
    let createAnimationPage = function (updtFromHistory) {
        let frag = document.createDocumentFragment();
        // Header
        let el = createElmt("div", frag, [["class", "centered"]]);
        let welcome = createElmt("h2", el, [["class", "center"], ["innerText", "Welcome"]]);
        // Update Location
        if (updtFromHistory) {
            welcome.innerText = displayAnimation.location;
        }
        else {
            // Request Location
            let dispLocation = function (location) {
                displayAnimation.location = location;
                welcome.innerText = location;
            };
            navigator.geolocation.getCurrentPosition(function ({ coords: { latitude: lat, longitude: long } }) {
                // Please do not steal my key
                HTTPRequest(`http://www.mapquestapi.com/geocoding/v1/reverse?key=IML1aluZdsjo4Uuj91wjTRca2WGH1oCC&location=${lat},${long}`)
                    .then(n => {
                    if (n.status === 403)
                        throw Error;
                    return n.json();
                })
                    .then(({ results: [{ locations }] }) => {
                    let { adminArea1: country, adminArea3: state, adminArea5: city } = locations[0];
                    dispLocation(`Welcome: from ${city}, ${state}, ${country} Thank You for Visiting`);
                }).catch(() => { dispLocation(`Welcome: From ? Location Unavailable`); });
            }, 
            // Get Location Error
            () => { dispLocation(`Welcome: From ? Location Unavailable`); });
        }
        // Text Area
        let subEl = createElmt("div", el, [["class", "margin"], ["class", "center"]]);
        let txtArea = createElmt("textarea", subEl, [["class", "animation"]]);
        // Load Animation Button
        subEl = createElmt("div", el, [["class", "center"], ["class", "margin"]]);
        let refreshBtn = createElmt("button", subEl, [["innerText", "Load Animation"], ["class", "margin"], ["class", "loginBtn"]]);
        let refreshAnimation = function () {
            let animationReq = {
                method: "GET",
                headers: { "Authorization": "Bearer " + userToken }
            };
            let tries = 0;
            let request = function () {
                HTTPRequest("https://cs445-project.herokuapp.com/api/animation", animationReq)
                    .then(n => n.text())
                    .then(n => {
                    if (n === displayAnimation.imageStr && tries++ < 5) {
                        // Duplicate - Request Again
                        request();
                    }
                    else {
                        // Display Animation
                        tries = 0;
                        displayAnimation.setimage(n);
                        displayAnimation.animate(txtArea);
                    }
                });
            };
            request();
        };
        refreshBtn.onclick = refreshAnimation;
        // Refresh for History Changes
        if (updtFromHistory)
            displayAnimation.animate(txtArea);
        // Logout Button
        createElmt("button", subEl, [["innerText", "Logout"], ["class", "margin"], ["class", "loginBtn"]]).onclick = function () {
            loadLoginPage();
            userToken = "";
            displayAnimation.clearAnimation();
            this.onclick = null;
            refreshBtn.onclick = null;
        };
        return frag;
    };
    let loadLoginPage = function (fromHistory = false) {
        clearPage();
        if (!fromHistory)
            addToHistory("login");
        div.appendChild(createLoginPage());
    };
    let loadAnimationPage = function (fromHistory = false) {
        clearPage();
        div.appendChild(createAnimationPage(fromHistory));
        if (!fromHistory)
            addToHistory("animation");
    };
    let clearPage = function () {
        div.firstChild.remove();
    };
    let addToHistory = function (urlAdd) {
        history.pushState({ display: urlAdd }, "", "/" + urlAdd);
    };
    // Object to Handle Animation
    let displayAnimation = {
        imageStr: "",
        imageAry: [""],
        timerId: -1,
        location: "",
        setimage(img) {
            this.imageStr = img;
            this.imageAry = img.split("=====\n");
        },
        animate: function (elmt) {
            this.clearAnimation();
            let cnt = 0;
            let { length } = this.imageAry;
            if (length === 0)
                return;
            // Interval to Display Animation
            this.timerId = window.setInterval(() => {
                elmt.value = this.imageAry[cnt++];
                cnt = cnt % length;
            }, 200);
        },
        clearAnimation() {
            if (this.timerId >= 0) {
                clearInterval(this.timerId);
                this.timerId = -1;
            }
            ;
        }
    };
    // Fetch Requests
    let HTTPRequest = async function (url, data) {
        try {
            const response = await fetch(url, data);
            return response;
        }
        catch (err) {
            alert("An Error has Occurred. Please See Console for Details\n" + err);
            return err;
        }
    };
    // Initialize
    window.onload = () => {
        div = document.getElementById("outlet");
        loadLoginPage();
    };
    // Handle History
    window.addEventListener("popstate", function ({ state }) {
        if (state && state.display === "animation") {
            if (userToken) {
                loadAnimationPage(true); // Currently Logged In
                return;
            }
            else {
                window.alert("Already Logged Out. Please Login Again!");
                loadLoginPage(false);
            }
        }
        // Load Login, Push /login if Needed
        loadLoginPage(state !== null);
    });
    // CSS Styles
    let styles = [
        `.centered {
                  position: fixed;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }`,
        `.center {
                text-align: center;
                }`,
        `.margin{
                margin: 10px
                }`,
        `body{
                font-size: 30px;
                background-color: azure;
                }`,
        `button{
                font-size: 20px;
                padding: 10px;
                margin-top: 30px;
                }`,
        `.loginBtn {
                padding-right: 40px;
                padding-left: 40px;
                border-radius: 10px;
                }`,
        `input{
                font-size: 20px;
                border-radius: 5px;
                padding:5px
                }`,
        `form  {display: table;}`,
        `p     {display: table-row;}`,
        `label { display: table-cell;}`,
        `input { display: table-cell;}`,
        `.animation{
                width: 450px;
                height: 350px;
                border-radius: 5px;
                }`,
        `button:hover{
                  cursor:pointer;
                }`,
    ];
    // Create/ Append Stylesheet and Insert Rules
    let style = createElmt("style", document.head, [["type", "text/css"]]).sheet;
    styles.forEach(n => style.insertRule(n, 0));
}());
