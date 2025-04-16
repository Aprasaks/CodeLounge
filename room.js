//방 ID
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get("roomId");

//saved 방 목록
const rooms = JSON.parse(localStorage.getItem("codeRooms")) || [];

//방 찾기(find)
const targetRoom = rooms.find((room) => room.id.toString() === roomId);

//정보보여주기
if (targetRoom) {
  document.getElementById("roomTitle").textContent = targetRoom.title;
  document.getElementById("roomCreator").textContent = `생성자: ${targetRoom.creator}`;
  document.getElementById("roomCreatedAt").textContent = `생성 시간: ${targetRoom.createdAt}`;
} else {
  document.getElementById("roomTitle").textContent = "방이 존재하지않습니다.";
}

// 코드 input
document.addEventListener("DOMContentLoaded", () => {
  const htmlInput = document.getElementById("htmlCode");
  const cssInput = document.getElementById("cssCode");
  const jsInput = document.getElementById("jsCode");
  const preview = document.getElementById("preview");

  // rendering
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

  // input change rendering
  htmlInput.addEventListener("input", updatePreview);
  cssInput.addEventListener("input", updatePreview);
  jsInput.addEventListener("input", updatePreview);

  updatePreview(); // 처음 로딩될 때도 미리보기 보여주기
});
