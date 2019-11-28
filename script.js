// your code here

window.onload = animationApp;

function animationApp() {
  const GEOLOCATION_API_KEY = "KAPjZLb1XuZglHU4hsaPZ3ip7ZRHUaFm";
  let animationId;
  let token;

  const loginPage = `
 <h1>Please login</h1>
 UserName <input placeholder="mwp" value="mwp"/> <br>
 Password <input older="123" value="123"/> <br>
 <button id='login'>Login</button>`;

  const animationPage = `
<div id="adress">Welcome to SPA Animation</div>
<textarea name="" id="animation" cols="50" rows="20" style="font-size: 18px;"></textarea> <br>
<button id="refresh">Refresh Animation</button>
<button id="logout">Logout</button>
`;

let logout=document.getElementById('logout');
let refreshA=document.getElementById('refresh');
  //login page and animation textrea page function. when first the function invokes take you
  //to the login templete.

  pagination(loginPage);

  function pagination(page) {
    if (page === loginPage) {
      document.getElementById("outlet").innerHTML = loginPage;
    }
    if (page === animationPage) {
      document.getElementById("outlet").innerHTML = animationPage;
    }
  }

  // click login button invokes fetching function to get token and takes to the animation page.

  document.getElementById("login").addEventListener("click", function(e) {
    fetching();
    // fetchAnimation(token);
    pagination(animationPage);
  });

  async function fetching() {
    let data = {
      username: document.querySelectorAll("input")[0].value,
      password: document.querySelectorAll("input")[1].value
    };

    const res = await fetch("http://www.mumstudents.org/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain,*/*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    token = result.token;
    console.log(token);
  }

  //logout.onclick=function(){ pagination(loginPage)};

  refreshA.addEventListener('click',function(){
    fetchAnimation();
  });

  async function fetchAnimation() {
   
    const response = await fetch("http://www.mumstudents.org/api/animation", {
      headers: {
        " Authorization": `Bearer ${token}`
      }
    });
    console.log(response);
    const animation = await response.text();
 
  }
}
