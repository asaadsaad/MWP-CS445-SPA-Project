window.onload=function(){

    const login=
    `<h1>Please Login</h1>
    User name:<input id="default1"></input><br><br>
    Password:  <input id="default2"></input><br><br>
    <button id="button">Login</button>`
    document.getElementById("outlet").innerHTML=login
    document.getElementById("default1").value="mwp";
    document.getElementById("default2").value="123";
    let button=document.getElementById("button");
    //when our login button clicked
    function loginClicked(){
       window.location.assign("http://127.0.0.1:5500/firstproject/MWP-CS452-2019-SPA-Project/index.html");
    }
    button.addEventListener("click",loginClicked);

}

