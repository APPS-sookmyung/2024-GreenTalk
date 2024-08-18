const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".navbar__menu li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLi.forEach((li) => {
    li.classList.remove("active");
    if (li.getAttribute("href").includes(current)) {
      li.classList.add("active");
    }
  });
});

// 메뉴 토글 버튼 이벤트 (모바일 대응)
const toggleBtn = document.querySelector(".navbar__toggleBtn");
const menu = document.querySelector(".navbar__menu");

toggleBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// 이미지 클릭 시 모달 창 띄우기
const imageItems = document.querySelectorAll(".image-item");
const modal = document.createElement("div");
modal.classList.add("modal");

const modalContent = document.createElement("div");
modalContent.classList.add("modal-content");

const closeBtn = document.createElement("span");
closeBtn.classList.add("modal-close");
closeBtn.innerHTML = "&times;";

modalContent.appendChild(closeBtn);
modal.appendChild(modalContent);
document.body.appendChild(modal);

imageItems.forEach((item) => {
  item.addEventListener("click", () => {
    const title = item.dataset.title;
    const description = item.dataset.description;
    const imgSrc = item.dataset.img;
    const additionalText = item.dataset.additionalText;
    const additionalImgSrc = item.dataset.additionalImg;

    modal.style.display = "block";
    modalContent.innerHTML = `
      <span class="modal-close">&times;</span>
      <h2>${title}</h2>
      <img src="${imgSrc}" style="width: 100%; height: auto; border-radius: 10px;">
      <p>${description}</p>
      <img src="${additionalImgSrc}" style="width: 100%; height: auto; border-radius: 10px; margin-top: 20px;">
      <p>${additionalText}</p>
    `;
  });
});

// 모달 닫기 이벤트
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-close") || e.target.classList.contains("modal")) {
    modal.style.display = "none";
  }
});
