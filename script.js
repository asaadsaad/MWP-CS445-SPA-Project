
window.onload = function animationProject() {

    let myLogin = `<h1>Please login </h1><br/>
     username: <input type="text" value="mwp" id="input1" /> <br/>
             password: <input type="text" value="123" id="input2" /> <br/>
             <button type="button" id="login">login</button>`


    let myAnimation = `<h1 id="locationTitle"> </h1>
             <button type="button" id="animation">Refresh Animation</button>
             <button type="button" id="logout">Logout</button>
             <textarea type="text" id="outputDiv" cols="30" rows="15" style="font-size: 18px;"></textarea>`


    document.getElementById("outlet").innerHTML = myLogin;
    let tokenId, strId, animationID, addressId;
    let keyId = "8SdUOIMUJzlXswkGbSVInlBgxi17ejOI";


    document.getElementById("login").addEventListener('click', async function () {
        document.getElementById("outlet").innerHTML = myAnimation;




        navigator.geolocation.getCurrentPosition(success, fail)
        let longitude, latitude;

        function fail() {
            console.log('some thing went wrong');
        }

        function success(position) {
            longitude = (position.coords.longitude).toFixed(6);
            latitude = (position.coords.latitude).toFixed(6);
            findLocation();

            console.log(longitude);
            console.log(latitude)

            async function findLocation() {
                let response3 = await fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${keyId}&location=${latitude},${longitude}`,
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    })
                response3 = await response3.json();
                console.log(response3);
                const city = response3.results[0].locations[0].adminArea5;
                const state = response3.results[0].locations[0].adminArea3;
                const country = response3.results[0].locations[0].adminArea1;
                document.getElementById('locationTitle').innerHTML = `welcome all from ${city},${state},${country}`;
            }
        }


        try {
            response = await fetch(`http://mumstudents.org/api/login`,
                {
                    method: `POST`,
                    headers: { 'content-Type': 'application/json' },
                    body: JSON.stringify({ username: "mwp", password: "123" })
                })
            data = await response.json();
            tokenId = data.token;
        }
        catch (err) {
            console.log(err);
        }

        getAnimation();

        async function getAnimation()  {
        
        try {
            response2 = await fetch('http://mumstudents.org/api/animation',
                {
                    method: 'GET',

                    headers: { 'Content-Type': 'application/text', Authorization: `Bearer ${tokenId}` },
                })

            strId = await response2.text();
            playAnimation();

  async function playAnimation()  {
           strId = await strId.split("=====\n");
            let count = 0;
            animationID = await setInterval(() => {
                document.getElementById("outputDiv").innerHTML = strId[count];
                count++
                if(count==strId.length){
                    count=0;
                }
            }, 200)

        }
           
          

        }

       
        catch (err) {
            console.log(err);
        }

    }
        animation.addEventListener("click", async function () {
            await clearInterval(animationID);
            getAnimation();
             
         })

         logout.addEventListener("click", async function () {
            document.getElementById("outlet").innerHTML = myLogin;
         })



    }



    )




}



