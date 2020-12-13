let sourcedata;
function login() {
  fetch('https://cs445-project.herokuapp.com/api/login',
    {
      method: 'POST', // GET, POST, PUT, DELETE, etc.
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: "map", password: "123456" })

    })
    .then(response => response.json())
    .then((data) => {
      sourcedata = data;
      console.log(sourcedata);
      console.log
    })
    .catch(error => console.error(error));
}
login()
