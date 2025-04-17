// room.js

// 방 ID
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get("roomId");

// 저장된 방 목록
const rooms = JSON.parse(localStorage.getItem("codeRooms")) || [];

// 해당 방 찾기
const targetRoom = rooms.find((room) => room.id === parseInt(roomId));

// 로그인된 사용자
const currentUser = localStorage.getItem("loggedInUser") || "익명";

// 방 정보 출력
if (targetRoom) {
  document.getElementById("roomTitle").textContent = targetRoom.title;
  document.getElementById("roomCreator").textContent = `by ${targetRoom.creator}`;

  if (targetRoom.creator === currentUser) {
    document.getElementById("deleteRoomBtn").classList.remove("hidden");
  }
} else {
  document.getElementById("roomTitle").textContent = "방이 존재하지 않습니다.";
}

// 탭 기능
const tabButtons = document.querySelectorAll(".tab-btn");
const codeTabs = document.querySelectorAll(".code-tab");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;

    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    codeTabs.forEach((tab) => {
      tab.classList.toggle("hidden", !tab.classList.contains(`${target}-tab`));
    });
  });
});

const htmlInput = document.getElementById("htmlCode");
const cssInput = document.getElementById("cssCode");
const jsInput = document.getElementById("jsCode");
const preview = document.getElementById("preview");

function updatePreview() {
  const html = htmlInput.value;
  const css = `<style>body { background-color: #1f1f1f; color: white; font-family: monospace; padding: 20px; } ${cssInput.value}</style>`;
  const js = `<script>${jsInput.value}<\/script>`;

  const content = `<!DOCTYPE html><html><head>${css}</head><body>${html}${js}</body></html>`;
  preview.srcdoc = content;
}

htmlInput.addEventListener("input", updatePreview);
cssInput.addEventListener("input", updatePreview);
jsInput.addEventListener("input", updatePreview);

updatePreview(); // 초기 실행

// 방 나가기
const leaveBtn = document.getElementById("leaveRoomBtn");
leaveBtn.addEventListener("click", () => {
  window.location.href = "rooms.html";
});

// 방 삭제
const deleteBtn = document.getElementById("deleteRoomBtn");
deleteBtn.addEventListener("click", () => {
  if (confirm("정말 이 방을 삭제하시겠습니까?")) {
    const updatedRooms = rooms.filter((room) => room.id !== parseInt(roomId));
    localStorage.setItem("codeRooms", JSON.stringify(updatedRooms));
    alert("방이 삭제되었습니다.");
    window.location.href = "rooms.html";
  }
});
