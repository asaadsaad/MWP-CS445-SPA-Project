
window.onload = function animationProject() {

    let myLogin = `username: <input type="text" id="input1" /> <br/>
             password: <input type="text" id="input2" /> <br/>
             <button type="button" id="login">login</button>`


    document.getElementById("outlet").innerHTML = myLogin;

    let tokenId, strId;

    document.getElementById("login").addEventListener('click', async function () {
        response = await fetch('http://mumstudents.org/api/login',
            {
                method: 'POST',
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify({ username: "mwp", password: "123" })
            })
        data = await response.json();
        tokenId = data.token;


        response2 = await fetch('http://mumstudents.org/api/animation',
            {
                method: 'GET',
                headers: { "Authorization": `Bearer ${tokenId}` },
            })

        resStr = await response2.text();
        strId = resStr;

        document.getElementById("outlet").innerHTML = strId;



    //     response3 = await fetch('http://open.mapquestapi.com/geocoding/v1/reverse',
    //     {
            
    //     })

    // resStr = await response3.text();
    // strId = resStr;

    // document.getElementById("outlet").innerHTML = strId;

    }

    )




}



