let formRegister = document.querySelector(".panel-signup form");
let formlogin = document.querySelector(".panel-login form");
let showMessage = document.querySelector(".showMessage");
let open_login = document.querySelector("#open_login");
let showSigninMessage = document.querySelector(".showSigninMessage");

/* handel register form */
const login = async (e) => {
  e.preventDefault();
  let formdata = new FormData(formRegister);

  try {
    let data = {
      firstname: formdata.get("eva_firstname"),
      lastname: formdata.get("eva_lastname"),
      password: formdata.get("eva_password"),
      email: formdata.get("eva_email"),
    };

    const response = await fetch("http://localhost:3000/api/user/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let result = await response.json();
    console.log(result);

    showMessage.innerHTML = result.message;

    // show error message if the user is not valid
    if (result.success == false) {
      showMessage.innerHTML = result.message;
      showMessage.style.color = "red";
    }

    // navigate the user to the home page if the user is valid and reset the input
    if (result.success == true) {
      showMessage.innerHTML = result.message;
      showMessage.style.color = "green";
      formRegister.reset();
      window.location.href = "../client/pages/authorized_index.html";
    }
  } catch (error) {
    console.log(error);
  }
};

formRegister.addEventListener("submit", login);

/* handel login form */
const register = async (e) => {
  e.preventDefault();
  let formdata = new FormData(formlogin);

  try {
    let data = {
      password: formdata.get("eva_password"),
      email: formdata.get("eva_email"),
    };

    const response = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let result = await response.json();
    console.log(result);

    showSigninMessage.innerHTML = result.message;

    // show error message if the user is not valid
    if (result.success == false) {
      showSigninMessage.innerHTML = result.message;
      showSigninMessage.style.color = "red";
      return;
    }

    // navigate the user to the home page if the user is valid and reset the input
    if (result.success == true) {
      showSigninMessage.innerHTML = result.message;
      showSigninMessage.style.color = "green";
      formlogin.reset();
      window.location.href = "../client/pages/authorized_index.html";
    }
  } catch (error) {
    console.log(error);
  }
};
formlogin.addEventListener("submit", register);
