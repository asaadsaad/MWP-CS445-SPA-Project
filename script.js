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
    <button id="decreaseBTN">-</button><span>-- speed ++</span><button id="increaseBTN">+</button>
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


     const speedArr=[50,100,200,300,400,500,600,700,800,900,1050];
     let speedIndex=(speedArr.length-1)/2;
     let myAnimation=true;
     let tempFetchAnimationPictures="";


        function allContentOfAnimation(){
            geoLocationFunc().then(()=>{document.getElementById("dis_h3").innerHTML=streetYourAddress});
            mineAnimationFunc();

    document.getElementById("increaseBTN").addEventListener("click",_=>{
        if(animationId)clearInterval(animationId);
        (speedIndex>0)? --speedIndex : speedIndex=0;
        (myAnimation)?mineAnimationFunc():tempFuncToSupportSpeed();
    });

    document.getElementById("decreaseBTN").addEventListener("click",_=>{
        if(animationId)clearInterval(animationId);
        (speedIndex<speedArr.length)? ++speedIndex : speedIndex=speedArr.length-1;
        (myAnimation)?mineAnimationFunc():tempFuncToSupportSpeed();
    });

    document.getElementById("logoutBTN").addEventListener("click",function(){
        token="";
        outlet.innerHTML=loginTemplate;
       // history.pushState({ 'page_id': 1}, "login", "login.html");

        });

    document.getElementById("refAnimationBTN").addEventListener("click",function(){
        myAnimation=false;
        speedIndex=(speedArr.length-1)/2;
        fetchAnimationFunc();
    });    

        }

        function mineAnimationFunc() {
        const textArea=document.getElementById("disAnimation");
          let picSplit = picture.split("=====");
          tempFetchAnimationPictures=picSplit;
          let reset = 0;
          animationId = setInterval(_ => {
            textArea.value = picSplit[reset++];
            if (reset == picSplit.length) {
              reset = 0;
            }
          }, speedArr[speedIndex]);
          //console.log(picSplit[3]);
        }
        function fetchAnimationFunc(){
            const textArea=document.getElementById("disAnimation");
            getPictureFromServer().then(reso=>{
                let resetCount=0;
                let aniSplit=reso.split("=====");
                tempFetchAnimationPictures=aniSplit;
                animationId= setInterval(_=>{
                 textArea.value=aniSplit[resetCount++];
                 if(resetCount==aniSplit.length){resetCount=0}
             },speedArr[speedIndex]);
             //console.log(aniSplit);
            });
        }

        function tempFuncToSupportSpeed(){
            const textArea=document.getElementById("disAnimation");
            let resetCount=0;
            animationId= setInterval(_=>{
             textArea.value=tempFetchAnimationPictures[resetCount++];
             if(resetCount==tempFetchAnimationPictures.length){resetCount=0}
         },speedArr[speedIndex]);
        }

}





