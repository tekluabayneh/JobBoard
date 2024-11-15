let Btnlogout = document.querySelectorAll(".Btnlogout");

// logout the user with token
Btnlogout.forEach((logout) => {
  logout.addEventListener("click", () => {
    window.localStorage.removeItem("LoginToken");
  });
});
