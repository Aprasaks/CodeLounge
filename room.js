// 방 ID
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get("roomId");

// saved 방 목록
const rooms = JSON.parse(localStorage.getItem("codeRooms")) || [];

// 방 찾기 (정확한 숫자 비교를 위해 parseInt 처리)
const targetRoom = rooms.find((room) => room.id === parseInt(roomId));

// 정보 보여주기
if (targetRoom) {
  document.getElementById("roomTitle").textContent = targetRoom.title;
  document.getElementById("roomCreator").textContent = `생성자: ${targetRoom.creator}`;
  document.getElementById("roomCreatedAt").textContent = `생성 시간: ${targetRoom.createdAt}`;
} else {
  document.getElementById("roomTitle").textContent = "방이 존재하지않습니다.";
}

// 코드 input
document.addEventListener("DOMContentLoaded", () => {
  // 탭 버튼
  const tabButtons = document.querySelectorAll(".tab-btn");
  const codeTabs = document.querySelectorAll(".code-tab");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;

      // 버튼 active
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // 입력창 토글
      codeTabs.forEach((tab) => {
        if (tab.classList.contains(`${target}-tab`)) {
          tab.classList.remove("hidden");
        } else {
          tab.classList.add("hidden");
        }
      });
    });
  });

  const htmlInput = document.getElementById("htmlCode");
  const cssInput = document.getElementById("cssCode");
  const jsInput = document.getElementById("jsCode");
  const preview = document.getElementById("preview");

  // 렌더링 함수
  function updatePreview() {
    const html = htmlInput.value;
    const css = `<style>${cssInput.value}</style>`;
    const js = `<script>${jsInput.value}<\/script>`;

    const fullCode = `<!DOCTYPE html>
<html>
<head>${css}</head>
<body>
${html}
${js}
</body>
</html>`;
    preview.srcdoc = fullCode;
  }

  htmlInput.addEventListener("input", updatePreview);
  cssInput.addEventListener("input", updatePreview);
  jsInput.addEventListener("input", updatePreview);

  updatePreview(); // 초기 렌더링

  // ✅ 방 나가기
  const leaveBtn = document.getElementById("leaveRoomBtn");
  leaveBtn.addEventListener("click", () => {
    window.location.href = "rooms.html";
  });

  // ✅ 방 삭제
  const deleteBtn = document.getElementById("deleteRoomBtn");
  const currentUser = "강혁";

  if (targetRoom && targetRoom.creator === currentUser) {
    deleteBtn.classList.remove("hidden");

    deleteBtn.addEventListener("click", () => {
      const confirmDelete = confirm("정말 이 방을 삭제하시겠습니까?");
      if (confirmDelete) {
        const updatedRooms = rooms.filter((room) => room.id !== parseInt(roomId));
        localStorage.setItem("codeRooms", JSON.stringify(updatedRooms));
        alert("방이 삭제되었습니다.");
        window.location.href = "rooms.html";
      }
    });
  }
});
