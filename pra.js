
let count = 0;
window.onload = function () {
    let login_template = `<h1>Pleas Login</h1>
<label >User Name </label> <input type =text id = text2>
<br>
<br>
<label >Password </label> <input type =text id="text2">
<br>
 <br>
<button id="btn">Login</button>`


    let animation_template =`<textarea id="ta" cols="100%" rows="35%" ></textarea>
    <br>
    </br>
   <button id="but2"> Animation</button> </br></br> <button id="but3">Logout</button>`

    
    document.getElementById("outlet").innerHTML = login_template;
    document.getElementById("btn").addEventListener("click", loginbutton);

    function loginbutton() {

        document.getElementById("outlet").innerHTML = animation_template
    document.getElementById("but2").addEventListener("click", loginbutton)
        let mytext;
        async function myfunc() {
            response = await fetch("http://mumstudents.org/api/login",
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "username": "mwp",
                        "password": "123"
                    })

                })
            data = await response.json();

            res = await fetch("http://mumstudents.org/api/animation",
                {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${data.token}` }

                })
            result = await res.text();
            mytext = result;

            let y = mytext.split("=====")


            setInterval(function () {

                document.getElementById("ta").innerHTML = y[count]
                count++;
                if (count === y.length) {
                    count = 0;
                }
            }, 500)

        }

        myfunc()
    }
    history.pushState()
}