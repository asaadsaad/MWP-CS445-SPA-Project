window.onload = function () {
        let token = "";
        let animArray;   
        let interval="";
        let Geolocation API key="";
        //login template
        let t="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtd2EiLCJpc3N1ZWRBdCI6IjIwMTktMTEtMjciLCJ1c2VybmFtZSI6Im13cCJ9.U9ciwh5lcPwFlJdxhNQkeiMc7AMYAnawfKNidw8CNDpTIUjNBL_EtDqkXG4qGOF8H_Ve1S2Gg2PwmCYOkfgmWA"
        const login = `<h1>Please Login</h1>
    User name:<input id="default1" value ="mwp"></input><br><br>
    Password:  <input id="default2" value="123"></input><br><br>
    <button id="button">Login</button>`
        //animation template
        const animation = `<h1 id="geolocation">Welcome all from</h1>
        <textarea id="textarea" rows="30"  cols="90"> </textarea><br>
        <button id="refresh"> Refresh animation</button>
        <button id="logout">Logout</button>`

        //loginfunction:
        function loginpage() {
            outlet.innerHTML = login;
            //history.pushState(state, title, url);
        }
        loginpage();
        //animation function
        function animapage() {
            outlet.innerHTML = animation;
            //history.pushState(state, title, url);
        }
        button.addEventListener('click', LoginClicked);
        //loginbutton clicked
        function LoginClicked() {
            fetchLogin();
            animapage();

            logoutButton();
            fetchAnimation();
        }

        function logoutButton() {
            document.getElementById("logout").addEventListener("click", loginpage);
            refresh.addEventListener('click',displayRefesh);
        }

        //login fetch: post request
        async function fetchLogin() {
            let loginfetch = await fetch(`http://www.mumstudents.org/api/login`, {
                method: "POST",
                body: JSON.stringify({
                    "username": "mwp",
                    "password": "123"
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await loginfetch.json();
            //console.log(result);
            token = result.token;
            //return result;
            console.log(token);
        }
        //animation fetch
       async function fetchAnimation() {
        if(interval)clearInterval(interval);
           let animafetch = await fetch("http://www.mumstudents.org/api/animation",                 {
                    method: "GET",
                    headers:{
                        "content-type":"application/text",

                            "Authorization":`Bearer ${t}`,
                    }
                    
                });
                const animaresult=await animafetch.text();
                animArray=animaresult;
               
                displayFirstAnima();
            }
        

        //display the anima in the textarea
        function displayFirstAnima(){

 let splitedanima = animArray.split("=====\n");

 let count= 0; 
 let lastAnima= splitedanima.length;
 setInterval(() => {
    textarea.innerHTML= splitedanima[count];
    count++
     if (count===lastAnima){
         count=0;
     }
 }, 200);
}
function displayRefesh(){
   
    fetchAnimation();
    let splitedanima = animArray.split("=====\n");
    let count=0;
    interval=setInterval(() => {
        textarea.innerHTML= splitedanima[count];
    count++;
    if(count===splitedanima.length){
        count=0;
    }
    }, 200);
    
}

//geolocation
    async function geolocationFetch() {
        let geofetch = await fetch(`http://open.mapquestapi.com/geocoding/v1/reverse`, {
            method: "GET",
            body: JSON.stringify({
                "username": "mwp",
                "password": "123"
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await loginfetch.json();
        //console.log(result);
        token = result.token;
        //return result;
        console.log(token);
    }
}
   

}
