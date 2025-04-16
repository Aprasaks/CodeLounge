document.addEventListener("DOMContentLoaded", () => {
  const roomList = document.getElementById("roomList");
  const createBtn = document.getElementById("createRoomBtn");
  const titleInput = document.getElementById("roomTitleInput");

  // ✅ 방 렌더링 함수 (매번 최신 데이터 사용)
  const renderRooms = () => {
    const rooms = JSON.parse(localStorage.getItem("codeRooms")) || [];
    roomList.innerHTML = "";

    if (rooms.length === 0) {
      const emptyMsg = document.createElement("p");
      emptyMsg.textContent = "생성된 방이 없습니다.";
      emptyMsg.style.color = "#aaa";
      emptyMsg.style.padding = "20px";
      roomList.appendChild(emptyMsg);
      return;
    }

    rooms.forEach((room) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = `room.html?roomId=${room.id}`;
      link.textContent = `${room.title} (by ${room.creator})`;

      li.appendChild(link);
      roomList.appendChild(li);
    });
  };

  // ✅ 방 생성 버튼 이벤트
  createBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    if (!title) {
      alert("방 제목을 지어주세요.");
      return;
    }

    const currentUser = localStorage.getItem("loggedInUser") || "익명";

    const newRoom = {
      id: Date.now(),
      title: title,
      creator: currentUser,
      createdAt: new Date().toLocaleString(),
    };

    // 기존 방 목록 다시 불러오기 (최신 기준)
    const storedRooms = JSON.parse(localStorage.getItem("codeRooms")) || [];
    storedRooms.push(newRoom);

    // 저장하고 렌더링
    localStorage.setItem("codeRooms", JSON.stringify(storedRooms));
    renderRooms();
    titleInput.value = "";
  });

  // ✅ 최초 실행 시 방 목록 보여주기
  renderRooms();
});
