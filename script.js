// your code here
window.onload = function () {
    // let token = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtd2EiLCJpc3N1ZWRBdCI6IjIwMTktMTEtMjciLCJ1c2VybmFtZSI6Im13cCJ9.U9ciwh5lcPwFlJdxhNQkeiMc7AMYAnawfKNidw8CNDpTIUjNBL_EtDqkXG4qGOF8H_Ve1S2Gg2PwmCYOkfgmWA`;
    let loginPage =
        `<h3>Please Login</h3>Username <input id="username" type="text"><br>
Password <input id="password" type="text"><br>
<button id="loginId">Login</button>`;

    let animationPage = `    <h3>welcome All from<h3 id="location"></h3>
                </h3>
                <textarea id="textarea" cols="50" rows="15"></textarea><br>
                <button id="refAnimBtn">Refresh Animation</button>
                <button id="logoutButn">Logout</button>`;


    let outlet = document.getElementById("outlet");
    outlet.innerHTML = loginPage;

    let loginBtn = document.getElementById("loginId");
    loginBtn.addEventListener("click", loadAnimationPage);

    function loadAnimationPage() {
        outlet.innerHTML = animationPage;
        logOut();
        refresh();
    }

    function logOut() {

        document.getElementById("logoutButn").addEventListener("click", logOutFunc);
        function logOutFunc() {

            outlet.innerHTML = loginPage;
        }
    }
    function refresh() {
        document.getElementById("refAnimBtn").addEventListener("click", refreshFunc);
        let textNode = document.getElementById("textarea");
        function refreshFunc() {

            textNode.innerHTML = animate(d);
        }
    }
    async function getToken() {
        // let user = document.getElementById()
        // let password = document.getElementById();

        let response = await fetch("http://mumstudents.org/api/login", {
            method: "POST",
            headers: {
                "Accept": "application/json,text/plain,*/*",
                'content-Type': "application/json"
            },
            body: JSON.stringify(
                {
                    "username": "mwp",
                    "password": "123"
                })
        })
        let data = await response.json();
        // let output=await data.json()
        // token = output.token;
        // token = data.token;
        // console.log(token);


        let a = await fetch("http://www.mumstudents.org/api/animation", {
            method: "GET",
            headers: { "Authorization": `Bearer ${data.token}` }
        });
        let b = await a.text()
        let c = await b.split('=====');
         d = await animate;
        console.log(d);
       
     
    

       // .then(data => data.text())
        // .then(elem => console.log(elem));
        // console.log(elem);


    }
    getToken();
     function animate(arr) {
   arr.forEach((element,index,arra )=> {
       setInterval((element) => {
           console.log(arra[index])
       }, 500);
   });
    } 



}
// async function getAnime() {
//     let response = await fetch("http://www.mumstudents.org/api/animation", {
//         method: "GET",
//         headers: {
//             "Authorization": `Bearer ${token}`
//         }
//     });
//     let obj = await response.text();

//     console.log(typeof (obj));
//     console.log( obj);

// }

// "Accept": "application/json,text/plain,*/*",

