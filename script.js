"use strict";
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
                    //****************** typing error 
                    // interface I1 {
                    //   readonly n: number
                    //   s: string
                    // }
                    // type IfEquals<X, Y, A=X, B=never> =
                    // (<T>() => T extends X ? 1 : 2) extends
                    // (<T>() => T extends Y ? 1 : 2) ? A : B;
                    // type WritableKeys<T> = {
                    //   [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>
                    // }[keyof T];
                    // type I2 = Pick<I1, WritableKeys<I1>>; 
                    // equivalent to { s: string; }
                    // el[type as I2] = add;
                    // el[type as keyof WritableKeys<HTMLElement>] = add;
                    el[type] = add;
            }
        });
        if (elmt)
            elmt.appendChild(el);
        return el;
    };
    let createLoginPage = function () {
        let frag = document.createDocumentFragment();
        // Header
        let el = createElmt("div", frag, [["class", "centered"]]);
        createElmt("h2", el, [["class", "center"], ["text", "Please Login"]]);
        // Username
        let subEl = createElmt("div", el, [["class", "margin"]]);
        createElmt("label", subEl, [["innerText", "Username:"]]);
        let user = createElmt("input", subEl, [["type", "text"], ["value", "map"]]);
        // Password
        subEl = createElmt("div", el, [["class", "margin"]]);
        createElmt("label", subEl, [["innerText", "Password:"]]);
        //******* CHANGE TO PASSWORD ["type","password"]
        let pw = createElmt("input", subEl, [["type", "text"], ["value", "123456"]]);
        // Login Button
        subEl = createElmt("div", el, [["class", "center"], ["class", "margin"]]);
        createElmt("button", subEl, [["innerText", "Login"]]).onclick = function () {
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
        // Get Location
        if (updtFromHistory) {
            welcome.innerText = displayAnimation.location;
        }
        else {
            navigator.geolocation.getCurrentPosition(function ({ coords: { latitude: lat, longitude: long } }) {
                //**Key Goes Here
                HTTPRequest(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${key}&location=${lat},${long}`)
                    .then(n => n.json())
                    .then((n) => {
                    let { results } = n;
                    let { locations } = results[0];
                    let { adminArea1: country, adminArea3: state, adminArea5: city } = locations[0];
                    displayAnimation.location = `Welcome: from ${city}, ${state}, ${country} Thank You for Visiting`;
                    welcome.innerText = displayAnimation.location;
                });
            }, 
            // Get Location Error
            () => { welcome.innerText = `Welcome: From ? Location Unavailable`; });
        }
        // Text Area
        let subEl = createElmt("div", el, [["class", "margin"]]);
        let txtArea = createElmt("textarea", subEl, [["class", "animation"]]);
        // Load Animation Button
        subEl = createElmt("div", el, [["class", "center"], ["class", "margin"]]);
        let refreshBtn = createElmt("button", subEl, [["innerText", "Load Animation"], ["class", "margin"]]);
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
        createElmt("button", subEl, [["innerText", "Logout"], ["class", "margin"]]).onclick = function () {
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
            let length = this.imageAry.length;
            if (length === 0)
                return;
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
    //************* responsetype optional
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
    // History
    window.addEventListener("popstate", function ({ state }) {
        if (state && state.display === "animation") {
            if (userToken) {
                loadAnimationPage(true); // Currently Logged In
                return;
            }
            else {
                window.alert("Already Logged Out. Please Login Again!");
            }
        }
        // Load Login, Push /login if Needed
        loadLoginPage(state !== null);
    });
    // CSS Styles
    let styles = [".margin {margin: 10px;}",
        ".center {text-align: center;}",
        `.centered {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }`,
        `.animation {
                      width: 450px;
                      height: 350px;
                 }`,
    ];
    // Create/ Append Stylesheet and Insert Rules
    let style = createElmt("style", document.head, [["type", "text/css"]]).sheet;
    styles.forEach(n => style.insertRule(n, 0));
}());
