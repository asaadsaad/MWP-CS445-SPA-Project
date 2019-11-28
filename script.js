
// 'use strict';
/**
 * This project is a play animation 
 * this first function encapsulate every code and runs after all code is loaded.
 * @augments no parameter for this function
 * @returns it return the login page where users verify themselves and start to play with the animation. 
 */
window.onload = function animationProject() {

    let myLogin = `<h1>Please refresh and login </h1><br/>
             username: <input type="text" value="mwp" id="input1" /> <br/>
             password: <input type="text" value="123" id="input2" /> <br/>
             <button type="button" id="login">login</button>`


    let myAnimation = `<h1 id="locationTitle"> </h1>
             <textarea type="text" id="outputDiv" cols="60" rows="15" style="font-size: 18px;"></textarea></br>
             <button type="button" id="animation">Refresh Animation</button>
             <button type="button" id="logout">Logout</button>`


    document.getElementById("outlet").innerHTML = myLogin;
    let tokenId, animationID, textId, longitude, latitude, keyId = "8SdUOIMUJzlXswkGbSVInlBgxi17ejOI";


    /**
     * I add login listener that accepts two parameters.
     * I recommend the user to refresh the page to make sure every code is loaded before every click
     * This event includes multiple function
     * @param  {"click"} is the first parameter that allow the user run the event via one click.
     * @param  {function } is the second parameter that does not take any parameter.
     * @returns this event has multiple functions so do as multiple returns.
     */
    document.getElementById("login").addEventListener('click', async function () {
        document.getElementById("outlet").innerHTML = myAnimation;


        /**
        *This function request the user to display his/her geolocation
        * It takes two parameters
        * @param  {function} success is the first function parameter
        * @param  {function} fail is the second function paramter
        * @returns {object} geolocation information if successfully accessed the user location
        * @returns {error} message if fails to locate the user
        */
        navigator.geolocation.getCurrentPosition(success, fail)

        function fail() {
            console.log('Fail to get your location. Try it out again');
        }

        function success(position) {
            longitude = (position.coords.longitude).toFixed(6);
            latitude = (position.coords.latitude).toFixed(6);


            async function findLocation() {
                try {
                    /**
                    * This function fetch (get) allow to get the geolocation address of the user ased on access id, the latitude and longitude information
                   * @param  {string} is an id to allow access to the server
                   * @param  {number} is latitude information of the user
                   * @param  {number} is longitude information of the user
                   * @returns (JSON) is an JSON geolocation information
                    */
                    let response1 = await fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${keyId}&location=${latitude},${longitude}`,
                        {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                        })
                    response1 = await response1.json();
                    console.log(response1);
                    const city = response1.results[0].locations[0].adminArea5;
                    const state = response1.results[0].locations[0].adminArea3;
                    const country = response1.results[0].locations[0].adminArea1;
                    document.getElementById('locationTitle').innerHTML = `Welcome all from ${city}, ${state},${country}`;
                }
                /**
               * This function handle error in case geolocation information request go wrong.
                * @param  {error} error message
                * @returns (error) return error message .
               */
                catch (err) {
                    console.log(err);
                }
            }
            findLocation();
        }

        try {
            /**
        * This function fetch (post) the user information to the server
        * @param  {object} includes method and headers about the user
        * @returns (JSON) token id once the server request is accepted.
         */

            response2 = await fetch(`http://mumstudents.org/api/login`,
                {
                    method: `POST`,
                    headers: { 'content-Type': 'application/json' },
                    body: JSON.stringify({ username: "mwp", password: "123" })
                })
            response2 = await response2.json();
            tokenId = response2.token;
        }
        /**
            * This function handle error in case login request go wrong.
            * @param  {error} error message
            * @returns (error) return error message .
            */
        catch (err) {
            console.log(err);
        }

        getAnimation();

        /**
            * This function is used to as callback function everytime the user click refresh animation
            * @param  {none} no parameter
            */
        async function getAnimation() {
            try {

                /**
                * This function fetch (get) the animation information from the server
                * @param  {object} includes method and headers about the user
                * @returns (text) is an animation once the server request is accepted.
                */
                response3 = await fetch('http://mumstudents.org/api/animation',
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/text', Authorization: `Bearer ${tokenId}` },
                    })

                textId = await response3.text();
                playAnimation();
                async function playAnimation() {
                    textId = await textId.split("=====\n");
                    let count = 0;
                    animationID = await setInterval(() => {
                        document.getElementById("outputDiv").innerHTML = textId[count];
                        count++
                        if (count == textId.length) {
                            count = 0;
                        }
                    }, 200)
                }
            }
            /**
           * This function handle error in case animation request go wrong.
           * @param  {error} error message
           * @returns (error) return error message .
           */
            catch (err) {
                console.log(err);
            }
        }
        /**
         * I add refresh animation listener that accepts two parameters.
         * @param  {"click"} is the first parameter that allow the user to clear the refresh button.
         * @param  {function } is the second parameter that does not take any parameter.
         * @returns {function} this first return function clear the existing animation.
         * @returns {function} this second return function call the get animation function and play new animation.

         */
        animation.addEventListener("click", async function () {
            await clearInterval(animationID);
            getAnimation();
        });

        /**
        * I add logout listener that accepts two parameters.
        * @param  {"click"} is the first parameter that allow the user to logout of the animation game.
        * @param  {function } is the second parameter that does not take any parameter.
        * @returns returns the login page where the user can login and play again.
        */
        logout.addEventListener("click", async function () {
            document.getElementById("outlet").innerHTML = myLogin;
        });
    });
}



