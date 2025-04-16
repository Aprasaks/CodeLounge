//load 방 목록 불러오기
document.addEventListener("DOMContentLoaded", () => {
  const roomList = document.getElementById("roomList");
  const createBtn = document.getElementById("createRoomBtn");
  const titleInput = document.getElementById("roomTitleInput");

  //localstorage에서 가져오기
  const rooms = JSON.parse(localStorage.getItem("codeRooms")) || [];

  //방 렌더링(display)
  const renderRooms = () => {
    roomList.innerHTML = "";
    rooms.forEach((room, index) => {
      const li = document.createElement("li");
      li.textContent = `${room.title} (by ${room.creator})`;
      roomList.appendChild(li);
    });
  };
  //방 생성(create)
  createBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    if (!title) return alert("방 제목을 지어주세요.");

    //새롭게 생성되는 방의 객체 정보
    const newRoom = {
      id: Date.now(),
      title: title,
      creator: "강혁",
      createdAt: new Date().toLocaleString(),
    };

    rooms.push(newRoom);
    localStorage.setItem("codeRooms", JSON.stringify(rooms));
    titleInput.value = "";
    renderRooms();
  });

  //첫 화면 로드시 방 display 출력
  renderRooms();
});
