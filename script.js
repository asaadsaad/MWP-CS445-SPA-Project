window.onload = function () {
  const outlet = document.getElementById("outlet");

  setTimeout(() => {
    outlet.innerHTML = `<h1>Please Login</h1>
Username <input value = "hungle"><br>
Password <input value = "123456"><br>
<button onclick="login()">Login</button`;
  }, 1000);
};

function login() {

  outlet.innerHTML = `<h3>Welcome</h3>
 <textarea rows="10" cols="50"></textarea><br>





  <button onclick="refresh()">Refresh Animation</button>
  <button onclick="logout()">Logout</button>
  `;
}
