$(function () {
  // Declare variables
  let selectedTitle,
    selectedRemote,
    selectedJobType,
    selectedCountry,
    selectedState,
    selectedCity;

  // Event listeners for radio buttons
  $(".item-1 input[type='radio']").change(function () {
    selectedRemote = $(this).val();
  });

  $(".item-2 input[type='radio']").change(function () {
    selectedJobType = $(this).val();
  });

  // get the selected country
  $("#countries").change(function () {
    selectedCountry = $(this).val();
  });

  // get the slected states
  $("#states").change(function () {
    selectedState = $(this).val();
  });

  // get the selcted cities
  $("#cities").change(function () {
    selectedCity = $(this).val();
  });

  // Submit button event to gather and send data
  $("#submitButton").click(async function () {
    // get the job title
    selectedTitle = $(".job_title_containe input").val();

    // get the job salary
    selectedSalary = $(".salary ").val();

    // get the job name
    selectedName = $(".phone_email_name_container [name='input_name']").val();

    // get the job phone
    selectedPhone = $(".phone_email_name_container [name='input_phone']").val();

    // get the job email
    selectedEmail = $(".phone_email_name_container [name='input_email']").val();

    // get the logo icon
    selectedLogo = $(".logo_icon_phone_image_container input").val();

    // get the person image
    selectedPersonImage = $(".logo_icon_phone_image_container input").val();

    // get the selcted description
    selectedDescription = $(".job_description .Job_Descirption").val();
    const formData = {
      company_id: 1 || null, // Using null instead of "" for missing values
      title: selectedTitle || null,
      is_remote: selectedRemote || null,
      job_type: selectedJobType || null,
      salary: selectedSalary || null,
      city: selectedCity || null,
      country: selectedCountry || null,
      state: selectedState || null,
      logo_icon: null,
      person_image: null,
      contact_name: selectedName || null,
      contact_phone: selectedPhone || null,
      contact_email: selectedEmail || null,
      description: selectedDescription || null,
    };

    console.log(formData); // Ensure all fields have been filled in correctly

    const response = await fetch("http://localhost:3000/api/post/job", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    let result = await response.json();

    if (result.success == true) {
      $(".showStatusMessage").text(result.message);
      $(".showStatusMessage").css({
        color: "green",
      });
      $("input, textarea").css({
        borderColor: "gray",
      });
      $("input, textarea").val("");
    }

    if (result.success == false) {
      $(".showStatusMessage").text(result.message);
      $(".showStatusMessage").css({
        color: "red",
      });
      $("input, textarea").css({
        borderColor: "red",
      });
    }

    console.log(result);

    // AJAX call to send data
    // $.ajax({
    //   url: "http://localhost:3000/api/post/job",
    //   method: "POST",
    //   data: formData,
    //   success: function (response) {
    //     console.log("Data submitted successfully:", response);
    //   },
    //   error: function (error) {
    //     console.error("Submission error:", error);
    //   },
    // });
  });
});
