window.onload = animation;
function animation() {
    const outlet = document.querySelector('#outlet');
    const loginArea = `
    <h1> please login</h1>
    Username <input placeholder= 'username' value= 'mwp'/><br/>
    Password <input placeholder= '123' value= '123'/><br/>
    <button id= 'btn'> Login </botton>
      `
    const animationArea =`
        <div id='address'> Welcome </div>
        <textarea id='animation' rows='20' cols='50'></textarea></t></br>
            <button id='refresh'> referesh animation</button>
            <button id='logout'> Logout</button>
            `
    login()
    function login() {
        outlet.innerHTML = loginArea;
        let login = document.querySelector('#btn')
        login.addEventListener('click', animation);
    }
    function animation() {
        outlet.innerHTML = animationArea;
        let animationButton= document.querySelector('#refresh');
        let logoutButton= document.querySelector('#logout');
        logoutButton.addEventListener('click', logout);
        animationButton.addEventListener('click', refreshed);
        //const animationA = document.querySelector('#outlet');
    }

    function logout(){
        outlet.innerHTML = loginArea;
        login();
        // let login = document.querySelector('#btn')
        // login.addEventListener('click', animation);
        
    }

}







