// // your code here

window.onload=function(){
    const loginTemplate=`
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
     integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
     <!-- Just an image -->
<nav class="navbar navbar-light" style="background-color: #e3f2fd;">
  <a class="navbar-brand" href="#">
    <img src="angular.png" width="30" height="30" alt="fail">
  </a>
</nav>
    <div  class="container">

    <form class="form">
    <div class="row-3 col-md-4 mb-3"><h1>Please Login</h1><br></div>
    <div class="form-group col-md-4 mb-3">
      <label for="un">UserName</label>
      <input type="text" id="un" value="mwp" class="form-control" >
    </div>
    <div class="form-group col-md-4 mb-3">
      <label for="pw">Password</label>
      <input type="text" id="pw" value="123" class="form-control"></br>
      <button id="logInBTN" class="btn btn-primary col-md-4 mb-3 row-5">LogIn</button>
    </div>
    
  </form>

           
           </div>`;

    const animationTemplate=`
    <style>
    .button {
        display: inline-block;
        padding: 15px 25px;
        font-size: 24px;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        outline: none;
        color: #fff;
        background-color: #4CAF50;
        border: none;
        border-radius: 15px;
        box-shadow: 0 9px #999;
      }
      .speed {border-radius: 50%;}
    
    </style>
    <nav class="navbar navbar-light" style="background-color: #e3f2fd;">
  <a class="navbar-brand" href="#">
    <img src="angular.png" width="30" height="30" alt="fail">
  </a>
</nav>
    <div>
    <h3 id="dis_h3" style="color:darkslategrey;font-weight:bold;"></h3>
    <textarea id="disAnimation" cols="70" rows="25"></textarea><br>
    <button id="refAnimationBTN" class="button">Refresh Animation</button>
    <button id="logoutBTN" class="button" style="background-color: red;">Logout</button>
    <button id="decreaseBTN" style="background-color: saddlebrown;" class="button speed">- -</button><span style="color:darkslategray;font-weight:bold"> speed </span><button style="background-color: darkolivegreen;" id="increaseBTN" class="button speed">++</button>
    <button id="startBTN" style="background-color: aquamarine;" class="button">Start</button> <button id="stopBTN" style="background-color: tomato;" class="button">Stop</button>
    </div>`;
    
    let token="";
    let geoAPI="YRKzE5ny7ImpiaGl9iN0lcGiHkUdfd9M",streetYourAddress="Welcome all from ";
     let animationId="";
     let lati="",longi="";

    //index.html
    const outlet=document.getElementById("outlet");
    outlet.innerHTML=loginTemplate;
    let picture= ` o\n/#\\\n_|_===== \\o/\n  #\n_/ \\_=====|_o_\n  # \\\n_/|_===== _o_/\n/ #\n _|\\_`;



        ///////////////////////////////////////////////// below all about fetching functions  ///////////////////////////////////

          async function geoLocationFunc(){     //geolocation fethch
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
        
        
       async function postPromisesFunc(){          ///////////////////  token fetch
            let promObj=await fetch(`http://www.mumstudents.org/api/login`,{ 
                method: 'POST', 
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
     async function getPictureFromServer(){               ////////////////// fetch Animations
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


     ///////////////////////////// below all about listener and suported functon with global property  ///////////////////////////////

     const speedArr=[50,100,200,300,400,500,600,700,800,900,1050];
     let speedIndex=(speedArr.length-1)/2;
     let myAnimation=true;
     let tempFetchAnimationPictures="",tempIndexToStopAnimation=0;


         //login.html
    const logInBTN=document.getElementById("logInBTN");

    logInBTN.addEventListener("click",logInFunc);    //login listener

        function logInFunc(){
            postPromisesFunc();
        outlet.innerHTML=animationTemplate;

        ///////////////////////////////////////////////////////below is history
        // history.pushState({ page: login}, null, "?login");
        // window.addEventListener('popstate',function(e){
        //   if(e.state.page == login){
        //     logInFunc();
        //   }
        // });
        allContentOfAnimation();
        }


        function allContentOfAnimation(){  ///////////////////////// inside this method all about animation page listener/////////

            geoLocationFunc().then(()=>{document.getElementById("dis_h3").innerHTML=streetYourAddress});
            mineAnimationFunc();
            let stop=document.getElementById("stopBTN");
            let start=document.getElementById("startBTN");
            start.disabled=true;

    stop.addEventListener("click",$=> {         ///stop animation listener
        if(animationId)clearInterval(animationId);
        start.disabled=false;
        stop.disabled=true;});
    start.addEventListener("click",$=> {         /// start animation listener
        tempFuncToSupportSpeed();
        start.disabled=true;
        stop.disabled=false;});

    document.getElementById("increaseBTN").addEventListener("click",_=>{     //speed up animation listener
        if(animationId)clearInterval(animationId);
        (speedIndex>0)? --speedIndex : speedIndex=0;
        (myAnimation)?mineAnimationFunc():tempFuncToSupportSpeed();
    });

    document.getElementById("decreaseBTN").addEventListener("click",_=>{     /// speed down animation listener
        if(animationId)clearInterval(animationId);
        (speedIndex<speedArr.length)? ++speedIndex : speedIndex=speedArr.length-1;
        (myAnimation)?mineAnimationFunc():tempFuncToSupportSpeed();
    });

    document.getElementById("logoutBTN").addEventListener("click",function(){    // log out listener
        token="";
        outlet.innerHTML=loginTemplate;
        const logInBTN=document.getElementById("logInBTN");

        logInBTN.addEventListener("click",logInFunc);
       // history.pushState({ page: animate}, null, "?animation");      //'its about history
        });

    document.getElementById("refAnimationBTN").addEventListener("click",function(){     //refresh listener
        myAnimation=false;
        speedIndex=(speedArr.length-1)/2;
        fetchAnimationFunc();
    });    

        }


        ////////////////////////  below all about helper functions   //////////////////////

        function mineAnimationFunc() {
        const textArea=document.getElementById("disAnimation");
          let picSplit = picture.split("=====");
          tempFetchAnimationPictures=picSplit;
          let reset = 0;
          animationId = setInterval(_ => {
            textArea.value = picSplit[reset++];
            tempIndexToStopAnimation=reset;
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
                 tempIndexToStopAnimation=resetCount;
                 if(resetCount==aniSplit.length){resetCount=0}
             },speedArr[speedIndex]);
             //console.log(aniSplit);
            });
        }

        function tempFuncToSupportSpeed(){
            const textArea=document.getElementById("disAnimation");
            let resetCount=tempIndexToStopAnimation;
            animationId= setInterval(_=>{
             textArea.value=tempFetchAnimationPictures[resetCount++];
             if(resetCount==tempFetchAnimationPictures.length){resetCount=0}
         },speedArr[speedIndex]);
        }

}


