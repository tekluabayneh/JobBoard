$(function () {
  $("[data-panel]").on("click", function () {
    // Get the clicked panel data
    const panelToActivate = $(this).data("panel");

    // Remove 'active' class from all panels
    $(".panel-login, .panel-signup, .panel-forgot").removeClass("active");

    // Add 'active' class to the specified panel
    $(panelToActivate).addClass("active");
  });

  // Toggle the password show icon
  $(".pwd-toggle").on("click", () => {
    const passwordField = $(".eva_password");
    if (passwordField.attr("type") === "password") {
      passwordField.attr("type", "text");
    } else {
      passwordField.attr("type", "password");
    }
  });

  $("#open_login").on("click", () => {
    $(".signup-form").addClass("signup-form_active");
    $(".overlay").addClass("overlay_active");
  });
  $(".Sigin_close").on("click", () => {
    $(".overlay").removeClass("overlay_active");
    $(".signup-form").removeClass("signup-form_active");
  });
});
