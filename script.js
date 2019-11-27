// your code here
window.onload=function(){
    const loginTemplate=` <h1>Please Login</h1><br>
           UserName <input type="text" id="un" value="mwp"><br>
           PassWord <input type="text" id="pw" value="123"><br>
           <button id="logInBTN">LogIn</button>`;

    const animationTemplate=`<div>
    <h3 id="dis_h3"> Welcome all from ..</h3>
    <textarea id="disAnimation" cols="100" rows="40"></textarea><br>
    <button id="refAnimationBTN">Refresh Animation</button>
    <button id="logoutBTN">Logout</button>
    </div>`;

    let token="";
    // let animationId="";
     let lati="",longi="";

    //index.html
    const outlet=document.getElementById("outlet");
    outlet.innerHTML=loginTemplate;
    let picture= `   
   o
  /#\
  _|_
 =====
  \o/
   #
 _/ \_  
    `;

    //login.html
    const logInBTN=document.getElementById("logInBTN");
  
    logInBTN.addEventListener("click",function(){
    postPromisesFunc();
        outlet.innerHTML=animationTemplate;
      //  history.pushState({ 'page_id': 1}, "animate", "animate.html");

        allContentOfAnimation();
        });

        ///////////////////////////////////////////////// below geolocation part
        // if ("geolocation" in navigator) {
        //     navigator.geolocation.getCurrentPosition(function(position) {
        //        // console.log(position.coords.latitude+"  "+ position.coords.longitude);
        //        lati=position.coords.latitude;
        //        longi=position.coords.longitude;
        //       });
        //   } else {
        //     console.log("geolocation is not allowd");
        //   }

        //   async function geoLocationFunc(){
        //     let promObj=await fetch(`http://open.mapquestapi.com/geocoding/v1/reverse`, {
        //    method: 'GET',
        //    headers: {
        //     'Content-Type': 'application/json'
        //    }
        //  });
        //     let tokenObj = await promObj.json();
        //     console.log(tokenObj);
        //     return tokenObj;
        // }
        // geoLocationFunc();
        
       async function postPromisesFunc(){
            let promObj=await fetch(`http://www.mumstudents.org/api/login`,{ 
                method: 'POST', // or 'PUT'
                body: JSON.stringify({
                                "username": "mwp",
                                "password": "123"
               }), 
                headers: {
                           'Content-Type': 'application/json'
                    }
               });

            let tokenObj = await promObj.json();
          //  console.log(tokenObj.token);
            token=tokenObj.token
            return tokenObj;
       }
     async function getPictureFromServer(){
         let promObj=await fetch("http://mumstudents.org/api/animation", {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
         let tokenObj = await promObj.text();
        // console.log(tokenObj);
         return tokenObj;
     }





        function allContentOfAnimation(){
    const h3Tag=document.getElementById("dis_h3");
    const textArea=document.getElementById("disAnimation");
    const refreshBTN=document.getElementById("refAnimationBTN");
    const logOutBTN=document.getElementById("logoutBTN");

// let picSplit = picture.split("=====");
// let reset=0;
// setInterval(_=>{
//     textArea.value=picSplit[reset++];
//     if(reset==picSplit.length){reset=0}
// },800);

    logOutBTN.addEventListener("click",function(){
        token="";
        outlet.innerHTML=loginTemplate;
       // history.pushState({ 'page_id': 1}, "login", "login.html");

        });

    refreshBTN.addEventListener("click",function(){
      
       getPictureFromServer().then(reso=>{
           let resetCount=0;
           textArea.value='';
           let aniSplit=reso.split("=====");
           setInterval(_=>{
            textArea.value=aniSplit[resetCount++];
            if(resetCount==aniSplit.length){resetCount=0}
        },200);
        console.log(aniSplit);
       });
    });    

        }

}





