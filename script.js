// your code here

window.onload=function(){
    const loginTemplate=` <h1>Please Login</h1><br>
           UserName <input type="text" id="un" value="mwp"><br>
           PassWord <input type="text" id="pw" value="123"><br>
           <button id="logInBTN">LogIn</button>`;

    const animationTemplate=`<div>
    <h3 id="dis_h3"></h3>
    <textarea id="disAnimation" cols="100" rows="40"></textarea><br>
    <button id="refAnimationBTN">Refresh Animation</button>
    <button id="logoutBTN">Logout</button>
    </div>`;

    let token="";
    let geoAPI="YRKzE5ny7ImpiaGl9iN0lcGiHkUdfd9M",streetYourAddress="Welcome all from ";
     let animationId="";
     let lati="",longi="";

    //index.html
    const outlet=document.getElementById("outlet");
    outlet.innerHTML=loginTemplate;
    let picture= ` o\n/#\\\n_|_===== \\o/\n  #\n_/ \\_=====|_o_\n  # \\\n_/|_===== _o_/\n/ #\n _|\\_`;

    //login.html
    const logInBTN=document.getElementById("logInBTN");
  
    logInBTN.addEventListener("click",function(){
    postPromisesFunc();
        outlet.innerHTML=animationTemplate;
      //  history.pushState({ 'page_id': 1}, "animate", "animate.html");

        allContentOfAnimation();
        });

        ///////////////////////////////////////////////// below geolocation part
          async function geoLocationFunc(){
            // if ("geolocation" in navigator) {
            //     navigator.geolocation.getCurrentPosition(function(position) {
            //         console.log(position.coords.latitude+" longtude => "+ position.coords.longitude);
            //        lati=position.coords.latitude;
            //        longi=position.coords.longitude;
            //       });
            //   } else {
            //     console.log("geolocation is not allowd");
            //   }
//http://www.mapquestapi.com/geocoding/v1/reverse?key=${geoAPI}&location=${lati},${longi}&includeRoadMetadata=true&includeNearestIntersection=true`);

             let promObj=await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=YRKzE5ny7ImpiaGl9iN0lcGiHkUdfd9M&location=41.007328799999996,-91.96805619999999&includeRoadMetadata=true&includeNearestIntersection=true`);
            let tokenObj = await promObj.json();
            streetYourAddress+=tokenObj.results[0].locations[0].adminArea5+", "+tokenObj.results[0].locations[0].adminArea3+", "+tokenObj.results[0].locations[0].adminArea1+"!";
           // console.log(streetYourAddress);
            //return tokenObj;
        }
        
        
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
         if(animationId)clearInterval(animationId);
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
            geoLocationFunc().then(()=>{document.getElementById("dis_h3").innerHTML=streetYourAddress});
    const textArea=document.getElementById("disAnimation");
    const refreshBTN=document.getElementById("refAnimationBTN");
    const logOutBTN=document.getElementById("logoutBTN");

let picSplit = picture.split("=====");
let reset=0;
animationId=setInterval(_=>{
    textArea.value=picSplit[reset++];
    if(reset==picSplit.length){reset=0}
},800);
console.log(picSplit[3]);

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
           animationId= setInterval(_=>{
            textArea.value=aniSplit[resetCount++];
            if(resetCount==aniSplit.length){resetCount=0}
        },200);
        //console.log(aniSplit);
       });
    });    

        }

}





