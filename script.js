
let outPut=document.getElementById("outlet");
let aniPut= document.getElementById("outlet")

const loginTemplate = `
       <h1>Please login</h1>
       UserName <input placeholder="mwp" value="mwp"/> <br>
       Password <input older="123" value="123"/> <br>
       <button id="animation">Login</button>`;

function login (){
    outPut.innerHTML= loginTemplate
}
login();

function aniPage(){
    const animationTemplate = 
    `
      <div id="adress">Welcome to SPA Animation</div>
      <textarea name="" id="animation" cols="50" rows="20" style="font-size: 18px;"></textarea> <br>
      <button id="refresh">Refresh Animation</button>
      <button id="logout">Logout</button>
      `;
      aniPut.innerHTML= animationTemplate;    
}

document.getElementById("animation").addEventListener("click", aniPage)


let obj;

fetch('http://mumstudents.org/api/login',
{
method: "POST",
headers:{'Content-Type': 'application/json'},
body: JSON.stringify({username: "mwp", password: "123"})
})

  .then(response =>{return response.json()})
  .then( (data) =>{
        obj= data;
      console.log(obj)
})

















// fetch('http://mumstudents.org/api/animation')
// .then(response => response.json()) 
// .then(myJson => console.log(myJson));

  

//console.log(tokenId);




  

 

  




