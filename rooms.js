document.addEventListener("DOMContentLoaded", () => {
  const roomList = document.getElementById("roomList");
  const toggleCreateBtn = document.getElementById("toggleCreateBtn");
  const createSlide = document.getElementById("createRoomSlide");
  const addRoomBtn = document.getElementById("addRoomBtn");
  const titleInput = document.getElementById("roomTitleInput");
  const logoutBtn = document.getElementById("logoutBtn");

  // ✅ 방 제목 기반 이미지 생성 함수 (placeholder 텍스트 기반)
  const generateImageFromTitle = (title) => {
    const keyword = title.trim().split(" ")[0] || "Room";
    return `https://placehold.co/320x200?text=${encodeURIComponent(keyword)}&font=roboto`;
  };

  // 슬라이드 토글
  toggleCreateBtn.addEventListener("click", () => {
    createSlide.classList.toggle("visible");
    titleInput.focus();
  });

  // 방 추가
  addRoomBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    if (!title) {
      alert("방 제목을 입력해주세요.");
      return;
    }

    const currentUser = localStorage.getItem("loggedInUser") || "익명";
    const newRoom = {
      id: Date.now(),
      title,
      creator: currentUser,
      createdAt: new Date().toLocaleString(),
      image: generateImageFromTitle(title), // ✅ 여기서 생성
    };

    const storedRooms = JSON.parse(localStorage.getItem("codeRooms")) || [];
    storedRooms.push(newRoom);
    localStorage.setItem("codeRooms", JSON.stringify(storedRooms));

    titleInput.value = "";
    createSlide.classList.remove("visible");
    renderRooms();
  });

  // ✅ 로그아웃
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });

  // ✅ 방 리스트 렌더링
  const renderRooms = () => {
    const rooms = JSON.parse(localStorage.getItem("codeRooms")) || [];
    roomList.innerHTML = "";

    if (rooms.length === 0) {
      const emptyMsg = document.createElement("p");
      emptyMsg.textContent = "아직 생성된 방이 없습니다.";
      emptyMsg.style.color = "#888";
      emptyMsg.style.gridColumn = "1 / -1";
      roomList.appendChild(emptyMsg);
      return;
    }

    rooms.forEach((room) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = `room.html?roomId=${room.id}`;
      link.style.textDecoration = "none";

      const img = document.createElement("img");
      img.src = room.image;
      img.alt = room.title;
      img.className = "card-thumbnail";

      const info = document.createElement("div");
      info.className = "card-info";

      const title = document.createElement("div");
      title.className = "card-title";
      title.textContent = room.title;

      const meta = document.createElement("div");
      meta.className = "card-meta";
      meta.textContent = `by ${room.creator}`;

      info.appendChild(title);
      info.appendChild(meta);
      link.appendChild(img);
      link.appendChild(info);
      li.appendChild(link);
      roomList.appendChild(li);
    });
  };

  // ✅ 로그인 체크
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    alert("로그인이 필요한 페이지입니다.");
    window.location.href = "login.html";
  }

  // ✅ 최초 방 렌더링
  renderRooms();
});
