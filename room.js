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
