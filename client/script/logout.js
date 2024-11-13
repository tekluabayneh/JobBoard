let Btnlogout = document.querySelectorAll(".Btnlogout");
console.log(Btnlogout)
Btnlogout.forEach((logout) => {
  logout.addEventListener("click", () => {
    alert("click");
  });
});
