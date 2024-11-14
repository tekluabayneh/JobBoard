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
        <a
          class="text-body-tertiary text-decoration-none"
          href="postjob_detail.html"
        >
          ${com.companie_name}
        </a>
        <i class="material-icons">arrow_forward</i>
      </li>`;
      })
      .join(" ")}`;
  } catch (error) {
    console.log(error);
  }
};
