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

const journalEntries = document.getElementById("journalEntries");

// 로컬 스토리지에서 일기 목록 불러오기
function loadJournalEntries() {
  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  journalEntries.innerHTML = "";
  entries.forEach((entry, index) => {
    journalEntries.innerHTML += `
      <div class="journal-entry">
        <h4>${entry.plantName}</h4>
        <p>날짜: ${entry.date}</p>
        <p>메모: ${entry.notes}</p>
        <button onclick="deleteEntry(${index})">삭제</button>
      </div>
    `;
  });
}

// 저장 버튼 눌렀을 때 처리
document.querySelector("#journalForm").addEventListener("submit", function (event) {
  event.preventDefault(); // 폼의 기본 동작(페이지 새로고침) 방지

  const plantNameInput = document.querySelector("#plantName"); // 식물 이름 필드 가져오기
  const dateInput = document.querySelector("#date"); // 날짜 필드 가져오기
  const notesInput = document.querySelector("#notes"); // 메모 필드 가져오기

  const entry = {
    plantName: plantNameInput.value,
    date: dateInput.value,
    notes: notesInput.value,
  };

  if (entry.plantName.trim() !== "" && entry.date.trim() !== "" && entry.notes.trim() !== "") {
    // 입력 내용이 비어있지 않으면
    saveJournalEntry(entry); // 로컬 스토리지에 저장
    loadJournalEntries(); // 목록 새로 고침
    plantNameInput.value = ""; // 입력 필드 비우기
    dateInput.value = ""; // 날짜 필드 비우기
    notesInput.value = ""; // 메모 필드 비우기
  }
});

// 로컬 스토리지에 일기 저장
function saveJournalEntry(entry) {
  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  entries.push(entry); // 새로운 일기 추가
  localStorage.setItem("journalEntries", JSON.stringify(entries)); // 로컬 스토리지에 저장
}

// 삭제 기능
function deleteEntry(index) {
  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  entries.splice(index, 1); // 해당 인덱스의 일기 삭제
  localStorage.setItem("journalEntries", JSON.stringify(entries)); // 로컬 스토리지에 저장
  loadJournalEntries(); // 목록 새로 고침
}

// 페이지 로드 시 일기 목록 불러오기
document.addEventListener("DOMContentLoaded", loadJournalEntries);

// main.js

document.getElementById("questionForm").addEventListener("submit", function (event) {
  event.preventDefault(); // 기본 제출 동작 방지
  alert("질문이 등록되었습니다."); // 알림창 표시
  this.reset(); // 폼 초기화
});
