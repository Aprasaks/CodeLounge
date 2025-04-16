document.getElementById("loginBtn").addEventListener("click", () => {
  const id = document.getElementById("loginID").value.trim();
  const pw = document.getElementById("loginPW").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = users.find((user) => user.id === id && user.pw === pw);

  if (foundUser) {
    localStorage.setItem("loggedInUser", id);
    alert("로그인 성공!");
    window.location.href = "rooms.html";
  } else {
    alert("아이디 또는 비밀번호가 달라요.");
  }
});
