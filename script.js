// your code here

window.onload = animationApp;

function animationApp() {

  const GEOLOCATION_API_KEY = 'KAPjZLb1XuZglHU4hsaPZ3ip7ZRHUaFm';

  let token;
  let animationId;


  const loginTemplate = `
 <h1>Please login</h1>
 UserName <input placeholder="mwp" value="mwp"/> <br>
 Password <input older="123" value="123"/> <br>
 <button>Login</button>`;

  const animationTemplate = `
<div id="adress">Welcome to SPA Animation</div>
<textarea name="" id="animation" cols="50" rows="20" style="font-size: 18px;"></textarea> <br>
<button id="refresh">Refresh Animation</button>
<button id="logout">Logout</button>
`
}