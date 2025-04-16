//load 방 목록 불러오기
document.addEventListener("DOMContentLoaded", () => {
  const roomList = document.getElementById("roomList");
  const createBtn = document.getElementById("createRoomBtn");
  const titleInput = document.getElementById("roomTitleInput");

  //localstorage에서 가져오기
  const rooms = JSON.parse(localStorage.getItem("codeRooms")) || [];

  //방 렌더링(display)
  const renderRooms = () => {
    const rooms = JSON.parse(localStorage.getItem("codeRooms")) || [];

    roomList.innerHTML = "";
    rooms.forEach((room) => {
      const li = document.createElement("li");

      //link room
      const link = document.createElement("a");

      // link.href =...
      // ?roomId=${room.id} ?뒤에는 정보를 전달하는 부분
      // roomId로 ${room.id} 라는 정보를 전달
      link.href = `room.html?roomId=${room.id}`;
      link.textContent = `${room.title} (by ${room.creator})`;

      li.appendChild(link);
      roomList.appendChild(li);
    });
  };
  //방 생성(create)
  createBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    if (!title) return alert("방 제목을 지어주세요.");

    const currentUser = localStorage.getItem("loggedInUser");
    const newRoom = {
      id: Date.now(),
      title: title,
      creator: currentUser || "익명",
      createdAt: new Date().toLocaleString(),
    };

    // 1. 기존 방 목록 불러오기
    const storedRooms = JSON.parse(localStorage.getItem("codeRooms")) || [];

    // 2. 새 방 추가
    storedRooms.push(newRoom);

    // 3. localStorage에 저장
    localStorage.setItem("codeRooms", JSON.stringify(storedRooms));

    // 4. 화면 다시 렌더링
    renderRooms();
    titleInput.value = "";
  });
});
