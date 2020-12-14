


(function () {


  let div: HTMLElement;
  let userToken = "";



  // Create New Element and Add Properties. Append to Element
  let createElmt = function (elmtType: string, elmt: HTMLElement|DocumentFragment|null, InfoAdd: string[][]): HTMLElement {
    
    let el = document.createElement(elmtType)

    // Add Info to Created Element
    InfoAdd.forEach(function([type, add]): void {
      
      switch (type) {

        case "class":
          el.classList.add(add);
          break;

        // case "text":
        //   el.innerText = add;
        //   break;
        case "source":
          (<HTMLImageElement>el).src = add;
          break;
        default:
          el[type] = add;
      }
      
    })

    if(elmt) elmt.appendChild(el);
    return el;
  }



  let createLoginPage = function (): DocumentFragment {

    let frag = document.createDocumentFragment();

    // Header
    let el = createElmt("div", frag, [["class","centered"]])
    createElmt("h2", el, [["class","center"], ["text","Please Login"]])

    // Username
    let subEl = createElmt("div", el, [["class","margin"]])
    createElmt("label", subEl, [["innerText","Username:"]])
    let user = <HTMLInputElement>createElmt("input", subEl, [["type","text"]])

    // Password
    subEl = createElmt("div", el, [["class","margin"]])
    createElmt("label", subEl, [["innerText","Password:"]])

    //******* CHANGE TO PASSWORD ["type","password"]
    let pw = <HTMLInputElement>createElmt("input", subEl, [["type","text"]])

    // Login Button
    subEl = createElmt("div", el, [["class","center"], ["class","margin"]])
    createElmt("button", subEl, [["innerText","Login"]]).onclick = function(): void {

      // Login
      let loginReq = {
        method: "POST",
        body: JSON.stringify({username: user.value, password: pw.value}),
        headers: {"Content-Type": "application/json"}
      }
      
      HTTPRequest("https://cs445-project.herokuapp.com/api/login", loginReq)
        .then((n)=>n.json())  
        .then(({status, token}) => {
          if (status) {

            // Success - Load Animation Page
            userToken = token;
            loadAnimationPage();
            this.onclick = null;

          } else {

            //Invalid Login
            userToken = "";
            alert("User and/or Password Invalid. Please Verify Username/Password and Try Again")

          }
          
        })

    }

    return frag;

  }


  let createAnimationPage = function (): DocumentFragment {

    let frag = document.createDocumentFragment();

    // Header
    let el = createElmt("div", frag, [["class","centered"]])
    createElmt("h2", el, [["class","center"], ["innerText","Welcome"]])

    // Text Area
    let subEl = createElmt("div", el, [["class","margin"]])
    let txtArea = createElmt("textarea", subEl, [])

    // Refresh Button
    subEl = createElmt("div", el, [["class","center"], ["class","margin"]])
    let refreshBtn = createElmt("button", subEl, [["innerText","Refresh"]])
    
    refreshBtn.onclick = function() {

      let animationReq = {
        method: "GET",
        headers: {"Authorization": "Bearer " + userToken}
      }
      // console.log("https://cs445-project.herokuapp.com/api/animation?Bearer=" + userToken)
      HTTPRequest("https://cs445-project.herokuapp.com/api/animation", animationReq)
      .then(n=>n.text())
      .then(n=>{
        displayAnimation.setimage(n);
        displayAnimation.animate(txtArea);
      })
      
      
      
    }

    // Logout Button
    createElmt("button", subEl, [["innerText","Logout"]]).onclick = function() {
      loadLoginPage();
      userToken = "";
      displayAnimation.clearAnimation();
      this.onclick = null;
      refreshBtn.onclick = null;
    }

    return frag;

  }


  let loadLoginPage = function(): void {

    clearPage();
    addHistory("login")
    div.appendChild(createLoginPage());

  }

  let loadAnimationPage = function(): void {

    clearPage();   
    addHistory("animation")
    div.appendChild(createAnimationPage());

  }

  let clearPage = function(): void {
    (<HTMLElement>div.firstChild).remove();
  }

  let addHistory = function (urlAdd: string): void {
    history.pushState({},"","/" + urlAdd);
  }

  // Object to Handle Animation
  let displayAnimation : {
    
    imageStr: string,
    imageAry: string[],
    timerId: null | number,
    animate(elmt: HTMLTextAreaElement): void,
    clearAnimation(): void,
    setimage(img: string): void

  } = {

    imageStr: "",
    imageAry: [""],
    timerId: null,

    setimage (img: string): void {
      this.imageStr = img;
      this.imageAry = img.split("=====\n");
    },

    animate: function(elmt: HTMLTextAreaElement): void {

      this.clearAnimation();
      
      let cnt = 0;
      let length = this.imageAry.length;

      if (length === 0) return;

      this.timerId = setInterval(()=>{

        elmt.value = this.imageAry[cnt++];
        cnt = cnt % length;

      },200)

    },

    clearAnimation(): void {
      if(this.timerId !== null) {
       clearInterval(this.timerId); 
       this.timerId = null
      };
    }

  }

//************* responsetype optional
  // Fetch Requests
  let HTTPRequest = async function(url: string, data?: object, responseType?: string): Promise<loginResponse | string> {
    
    try {

      const response = await fetch(url,data);
      return response;
      // if (responseType === "json") {
      //   // return response.json();
      // } else {
      //   return response.text();
      // }

    } catch (err) {
      alert("An Error has Occurred. Please See Console for Details\n" + err);
      return err;
    }
    
  }



  // Initialize
  window.onload = ()=>{
    div = <HTMLElement>document.getElementById("outlet");
   
    loadLoginPage();

  }

}())