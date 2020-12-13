window.onload = function () {
  setTimeout(() => {
    const outlet = document.getElementById("outlet");
    outlet.innerHTML = `<h1>Please Login</h1>
Username <input><br>
Password <input><br>
<button>login</button`;
  }, 1000);
};
