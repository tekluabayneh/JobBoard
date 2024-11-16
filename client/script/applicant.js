const applicantSubmitBtn = document.querySelector(".applicantSubmitBtn");
const applicanInput = document.querySelectorAll(".applicantSubmitBtn input");
const ShowAplcantinputStatus = document.querySelector(
  ".ShowAplcantinputStatus"
);
console.log(applicanInput);

applicantSubmitBtn.addEventListener("submit", async (e) => {
  e.preventDefault();

  let formData = new FormData(applicantSubmitBtn);

  let data = {
    fullname: formData.get("form_name"),
    email: formData.get("form_email"),
    phone: formData.get("form_phone"),
    resume: formData.get("form_resume"),
    description: formData.get("form_discription"),
    company_id: 2,
  };
  console.log(data);
  console.log(formData);
  try {
    const response = await fetch("http://localhost:3000/api/Submitapplicant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const Resultdata = await response.json();

    // show the status if the server response the succes false
    if (Resultdata.success === false) {
      ShowAplcantinputStatus.style.color = "red";
      ShowAplcantinputStatus.innerHTML = Resultdata.message;
      applicanInput.forEach((input) => {
        input.style.borderColor = "red";
      });
    }

    // show the status if the server response the succes true
    if (Resultdata.success === true) {
      ShowAplcantinputStatus.style.color = "green";
      ShowAplcantinputStatus.innerHTML = Resultdata.message;
      applicanInput.forEach((input) => {
        input.style.borderColor = "green";
      });

      setTimeout(() => {
        window.location.href = "/Job_Board/client/index.html";
      }, 2000);
    }

    console.log(Resultdata);
  } catch (error) {
    console.log(error);
  }
});
