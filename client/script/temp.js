window.addEventListener("load", () => {
  // Retrieve job details from localStorage
  const jobDetails = JSON.parse(localStorage.getItem("jobDetails"));

  if (jobDetails) {
    // Update the job title
    document.getElementById("job_title").innerText = jobDetails[0].title;

    // Update job details like remote, fulltime, etc.
    const jobDetailsContainer = document.querySelector(".radio_detail");
    jobDetailsContainer.innerHTML = `
      <p class="text-decoration-underline">${jobDetails[0].is_remote},</p>
      <p class="text-decoration-underline">${jobDetails[0].job_type},</p>
      <p class="text-decoration-underline">${jobDetails[0].country},</p>
      <p class="text-decoration-underline">${jobDetails[0].state},</p>
      <p class="text-decoration-underline">${jobDetails[0].city},</p>
    `;

    /* salary   */
    document.querySelector(".salary_show span").innerHTML =
      jobDetails[0].salary + "$";

    // Update company logo
    document.querySelector(".company_logo").src =
      jobDetails[0].logo_icon ||
      "https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-600nw-643080895.jpg";

    // Update job description
    document.querySelector(".job-description").innerText =
      jobDetails[0].description;

    // Update contact person info
    document.querySelector(".contact-image").src =
      jobDetails[0].person_image ||
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrIY0oXk_l3Po8F9pkWbZnSurTMbjkXdN_08Kp8c4ZibOhBP2C";
    document.querySelector(".contact-name").innerText =
      jobDetails[0].contact_name;
    document.querySelector(".contact-phone").innerText =
      jobDetails[0].contact_phone;
    document.querySelector(".contact-email").innerText =
      jobDetails[0].contact_email;
  } else {
    // Handle case where no job details are found in localStorage
    alert("Job details not found.");
  }
});
