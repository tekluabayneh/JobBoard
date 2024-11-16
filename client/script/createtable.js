let btnCreatecompanies = document.querySelector(".btnCreatecompanies");
let companiesnameInput = document.querySelector(".companiesnameInput");
let show_table_messge = document.querySelector(".show_table_messge");

const newcompanies = async (e) => {
  e.preventDefault();
  if (companiesnameInput.value == "") {
    companiesnameInput.style.borderColor = "Red";
    show_table_messge.style.color = "red";
  }
  try {
    const response = await fetch("http://localhost:3000/api/compnies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companieName: companiesnameInput.value, // Get the company name from an input field
      }),
    });
    const data = await response.json();

    if (data.success == true) {
      companiesnameInput.style.borderColor = "green";
      show_table_messge.style.color = "green";
      companiesnameInput.value = "";

      setTimeout(() => {
        window.location.href = "/Job_Board/client/pages/postjobs.html";
      }, 200);
    }
    show_table_messge.innerHTML = data.message;
    console.log(data);
  } catch (error) {
    show_table_messge.innerHTML = data.message;
    console.log(error);
  }
};

btnCreatecompanies.addEventListener("click", newcompanies);
