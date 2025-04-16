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
  const startBtn = document.querySelector(".btn-start");
  startBtn.addEventListener("click", () => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      window.location.href = "rooms.html";
    } else {
      alert("로그인이 필요합니다!");
      window.location.href = "login.html";
    }
  });
});
