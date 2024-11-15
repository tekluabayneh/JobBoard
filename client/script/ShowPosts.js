// let jobs_container = document.querySelector(".jobs_container");
const showPostes = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/allPost", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    jobs_container.innerHTML = ` 
  ${data.result
    .map((job) => {
      return ` <div
              class="job_with_their_company_container bg-white rounded-3 w-75 m-auto d-flex align-items-center justify-content-between p-2 mb-3"
            > 
              <div class="job_title_and_content_container">
                <!-- job campony image -->
                <div class="image_container p-2">
                  <img class="img-fluid" src="${job.logo_icon}" alt="logo" />
                </div>

                <div class="company_content d-flex flex-column ms-3">
                  <h6 class="fw-bold text-body-tertiary">${job.companie_name}</h6>

                  <h5 class="fw-bolder Senior_title"> 
                  <a href="${job.companie_name}">${job.title}</a></h5>

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
                <p class="text-body-tertiary p-1 fw-bold">25 minute ago</p>
              </div>
            </div>`;
    })
    .join(" ")}
  
  `;
  } catch (error) {
    console.log(error);
  }
};
showPostes();
