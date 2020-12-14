const output = document.querySelector("#outlet");

const loginPage =
`
<h1>Please login</h1>
<h3>
<label for="firstname">First name:</label><br>
<input type="text" id="firstname" value = "map"/> <br>
<label for="lastname">Last name:</label><br>
<input type="text" id="lastname" value = "123456"> <br>
<button id ="login">Login</button>
</h3>`

output.innerHTML = loginPage;

const animationPage =