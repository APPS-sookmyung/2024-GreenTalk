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

modal.appendChild(modalContent);
document.body.appendChild(modal);

// 모달 닫기 버튼을 생성 및 추가
const closeBtn = document.createElement("span");
closeBtn.classList.add("modal-close");
closeBtn.innerHTML = "&times;";
modalContent.appendChild(closeBtn);

imageItems.forEach((item) => {
  item.addEventListener("click", () => {
    const title = item.dataset.title;
    const description = item.dataset.description;
    const imgSrc = item.dataset.img;
    const additionalText = item.dataset.additionalText;
    const additionalImgSrc = item.dataset.additionalImg;

    document.body.style.overflow = "hidden";

    modal.style.display = "block";
    modalContent.innerHTML = `
      <span class="modal-close">&times;</span>
      <h2>${title}</h2>
      <img src="${imgSrc}" style="width: 100%; height: auto; border-radius: 10px; margin-bottom: 20px;">
      <p>${description}</p>
      <img src="./image/m1image1.avif" style="width: 100%; height: auto; border-radius: 10px; margin-bottom: 20px;">
      <p>${additionalText}</p>
      <img src="${additionalImgSrc}" style="width: 100%; height: auto; border-radius: 10px; margin-top: 20px;">
    `;
  });
});

// 모달 닫기 이벤트
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-close") || e.target.classList.contains("modal")) {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; //모달이 닫힐 때 배경 스크롤을 다시 활성화
  }
});

// 저장된 데이터를 불러와 화면에 출력
const journalEntries = document.getElementById("journalEntries");

function loadJournalEntries() {
  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  journalEntries.innerHTML = "";
  entries.forEach((entry, index) => {
    journalEntries.innerHTML += `
      <div class="journal-entry">
        <h4>${entry.plantName}</h4>
        <p>물 준 날짜: ${entry.wateringDate}</p>
        <p>메모: ${entry.notes}</p>
        <button onclick="deleteEntry(${index})">삭제</button>
      </div>
    `;
  });
}
