const PostJobBtn = document.querySelectorAll(".PostJobBtn");
const showUser_status = document.querySelectorAll(".showUser_status");
console.log(showUser_status);
const checkuser = async (e) => {
  e.preventDefault();
  try {
    let token = window.localStorage.getItem("LoginToken");

    // check if the user is authoriazed
    if (!token) {
      showUser_status.forEach((message) => {
        message.classList.add("showUser_status_active");
        message.innerHTML = "You need to be logged in to access this feature";
      });

      // clear the message
      setTimeout(() => {
        showUser_status.forEach((message) => {
          message.classList.remove("showUser_status_active");
        });
      }, 3000);

      return;
    }

    const response = await fetch("http://localhost:3000/api/checkuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log("Error fetching user data");

      return;
    }

    const data = await response.json();
    console.log(data);

    if (data.success === false) {
      alert("You need to be logged in to post a job.");
      return;
    }

    // navigate the user to the post page if the user is authoraized
    if (data.success == true) {
      window.location.href = "/Job_Board/client/pages/postjobs.html";
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

PostJobBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    checkuser(e);
  });
});
