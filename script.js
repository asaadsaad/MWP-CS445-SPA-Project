const animTemp = function () {
    const username = document.getElementById('username').value;

    const password = document.getElementById('password').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://cs445-project.herokuapp.com/api/login HTTP/1.1', true);
    xhr.onload = function () {

        const user = JSON.parse(this.responseText)
        //console.log(user.username)
        const display = "hello ";
        if (username == user.username && password == user.password) {
            document.getElementById('outlet').innerHTML = user
        }
    }
    xhr.send();

}
window.onload = function loginTemp() {

    document.write('<form><label for="task" style="width: 100%; text-align:center;">PLEASE LOGIN FIRST !</label></form>');
    document.write('Username <input id="username"><br/><br/>');
    document.write('Password: <input id="password"><br/><br/>');

    document.write('<button id="login" >LOG-IN</button>');


    document.getElementById("login").addEventListener("click", animTemp);

}

