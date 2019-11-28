window.onload = function () {
  let token;
  const loginTemplate = `
       <h1>Please login</h1>
       UserName <input placeholder="mwp" value="mwp"/> <br>
       Password <input older="123" value="123"/> <br>
       <button id="login">Login</button>`;

  const animationTemplate =
    `
         <div id="adress">Welcome to SPA Animation</div>
         <textarea name="" id="animation1" cols="50" rows="20" style="font-size: 18px;"></textarea> <br>
         <button id="refresh">Refresh Animation</button>
         <button id="logout">Logout</button>
         `;

  let post = async function () {
    {
      const response = await fetch('http://mumstudents.org/api/login',
        {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: "mwp", password: "123" })
        })
      const myresponse = await (response.json());
      token = myresponse.token;
      myGet()
    }
  }

  myGet = async function () {

    const result = await fetch('http://www.mumstudents.org/api/animation',
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    const obj = await result.text()
    console.log(obj)
    const anime = obj.split("=====\n");
    console.log(anime)
    const mylength = anime.length;
    
    let timerId = setInterval(() => {
      let i = 0;
      while (!(i == mylength - 1)) {
        document.getElementById("animation1").innerHTML = anime[i];
        i++;
      }
    }, 300);
  }
  function myHTML() {
    function login() {
      document.getElementById("outlet").innerHTML = loginTemplate
    }
    login();

    function aniPage() {

      document.getElementById("outlet").innerHTML = animationTemplate;
      document.getElementById("logout").addEventListener("click", login)
      document.getElementById("refresh").addEventListener("click", myGet)
    }

    document.getElementById("login").addEventListener("click", aniPage)
    document.getElementById("login").addEventListener("click", post)
  }

  myHTML();  

}



//if(anime.length!==0){
    //console.log(anime[0])
    //clearInterval(timerId)
  
  //  console.log(anime)
  // //anime.forEach(()=>{

  //   for(let i =0; i<anime.length; i++){
  //     let each = anime[i];