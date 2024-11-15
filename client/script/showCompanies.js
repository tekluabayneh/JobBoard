const listunstyled = document.querySelector(
  ".companies_container .list-unstyled"
);
console.log(listunstyled);

window.onload = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/companies");
    let data = await response.json();
    console.log(data.result);
    // console.log(data.)
    listunstyled.innerHTML += `  
    ${data.result
      .map((com) => {
        return ` <li class="border rounded border-bottom-0 w-25 p-2 d-flex align-items-center justify-content-between">
        <a  data-company-id="${com.company_id}"
          href = "postjob_detail.html"
          class="company_id_store text-body-tertiary text-decoration-none"
        >
          ${com.companie_name}         
        </a>
        <i class="material-icons">arrow_forward</i>
      </li>`;
      })
      .join(" ")}`;

    let company_id_store = document.querySelectorAll(".company_id_store");

    company_id_store.forEach((link) => {
      link.addEventListener("click", (e) => {
        // e.preventDefault();
        // alert("Asa")
        let companyId = link.getAttribute("data-company-id");
        console.log(companyId);

        if (companyId) {
          sessionStorage.setItem("company_id", companyId);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};
