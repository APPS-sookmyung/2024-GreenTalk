document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".navbar__toggleBtn");
  const menu = document.querySelector(".navbar__menu");

  toggleBtn.addEventListener("click", function (e) {
    e.preventDefault();
    menu.classList.toggle("active");
  });
});
