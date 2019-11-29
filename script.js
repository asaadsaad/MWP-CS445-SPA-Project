window.onload = function (){
let animationData;
let data;
let animationId
  // over all html structure
  let animationTemplate= `<textarea  id="textAreaId" cols="90%" rows="45%"></textarea>
            <br>
            <br>
           <button id="animation_id"> Refresh Animation </button>
           
           <button id="logout_id"> LogOut </button> `
           
  let loginTemplate = `<h1>Pleas Login</h1>
                    <label>User Name</label>
                    <input id="input_id" placeholder="wmp"> </input><br> <br>
                    <label>Password </label>
                    <input id="input_id" placeholder="123"> </input><br><br><button id="login_id">login</button> `

document.getElementById("outlet").innerHTML=loginTemplate


// feching from the server
async function login() {
    //autorization 
    let response1 = await fetch("http://mumstudents.org/api/login",
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "username": "mwp", "password": "123" })
        })
    data = await response1.json();
    document.getElementById("outlet").innerHTML=animationTemplate
    
   
    getAnimation()
//accesed token
    }   

     async function getAnimation(){
    let response2 = await fetch("http://mumstudents.org/api/animation",
        {
            method: "Get",
            headers: { "Authorization": `Bearer ${data.token}` }


        })
    animationData = await response2.text() 
    clearInterval(animationId);
   
    document.getElementById("animation_id").addEventListener("click",getAnimation)
    let animationsplit = animationData.split("=====") 
    let count=0;
    animationId = setInterval(function(){
        document.getElementById("textAreaId").innerHTML=animationsplit[count] 
        ++count;
         if(count===animationsplit.length){
            count=0;   
         }
    },200)
    

    }
   
 document.getElementById("login_id").addEventListener("click",login)
                   
   
   
   
    }//onload finish here



