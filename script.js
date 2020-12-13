
// login = "Clicked Button";
const animTemp = function () {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://cs445-project.herokuapp.com/api/login HTTP/1.1', true);
    xhr.onload = function () {
        const user = JSON.parse(this.responseText)
        const display="hello";
        document.getElementById('outlet').innerHTML = display
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

