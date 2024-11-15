let BtnSearchjob = document.querySelectorAll(".BtnSearchjob");
let jobs_container = document.querySelector(".jobs_container");
let ShowJob_searchStatus = document.querySelector(".ShowJob_searchStatus");
let job_search_input = document.querySelectorAll(".job_search_input");

job_search_input.forEach((input) => {
  input.addEventListener("input", (e) => {
    let value = e.target.value;

    // loda the browser if the input value is empty
    if (value === "") {
      location.reload();
    }
  });
});

const Search = async (e) => {
  e.preventDefault();

  // get the title from the input
  let title;
  job_search_input.forEach((value) => {
    title = value.value;
  });

  // add message if not title provided
  if (!title) {
    ShowJob_searchStatus.innerHTML = "Please enter a title to search for jobs.";
    ShowJob_searchStatus.style.color = "red";
    $("input").css({
      borderColor: "Red",
    });
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/job/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    });
    const data = await response.json();

    // get the reult number of lenght
    const resultLength = data.result.length;

    // add the job ssearched message
    ShowJob_searchStatus.innerHTML = data.message;
    ShowJob_searchStatus.style.color = "green";
    $("input").css({
      borderColor: "green",
    });
    // handel time
    function handelTime(time) {
      let dateman = new Date(time);
      const formattedDate = dateman.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
      return formattedDate;
    }

    // update the html content with the new data
    jobs_container.innerHTML =
      resultLength > 0
        ? ` 
  ${data.result
    ?.map((job) => {
      return ` <div
              class="job_with_their_company_container bg-white rounded-3 w-75 m-auto d-flex align-items-center justify-content-between p-2 mb-3"
            > 
              <div class="job_title_and_content_container">
                <!-- job campony image -->
                <div class="image_container p-2">
                  <img class="img-fluid" src="${job.logo_icon}" alt="logo" />
                </div>

                <div class="company_content d-flex flex-column ms-3">
                  <h6 class="fw-bold text-body-tertiary">${
                    job.companie_name
                  }</h6>

                  <h5 class="fw-bolder Senior_title"> 
                  <a href="">${job.title}</a></h5>

                  <div class="d-flex text-body-tertiary">
                    <p>${job.is_remote},</p>
                    <p>${job.city},</p>
                    <p>${job.country},</p>
                    <p>${job.job_type}</p>
                  </div>
                </div>
              </div>
             
              <div
                id="like_second_container"
                class="likeicon_and_minute_conainer gap-4 flex-column"
              >
                <i class="ms-5">like icon</i> 
                <p class="text-body-tertiary p-1 fw-bold"> ${handelTime(
                  job.created_at
                )}</p>
              </div>
            </div>`;
    })
    .join(" ")}
  `
        : `<h1 class='fw-bold text-center m-5 p-4 fs-1'>Oops! No jobs found for <span class="text-danger text-decoration-underline">${title}</span>. Sorry about that! Try searching with a different title or keyword </h1>`;
  } catch (error) {
    console.log(error);
  }
};

BtnSearchjob.forEach((btn) => {
  btn.addEventListener("click", Search);
});

window.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    Search(e);
  }
});
