document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const loginLink = document.getElementById("loginLink");
  const userGreeting = document.getElementById("userGreeting");
  const logoutBtn = document.getElementById("logoutBtn");

  if (loggedInUser) {
    loginLink.classList.add("hidden");
    userGreeting.textContent = `${loggedInUser}님 환영합니다 👋`;
    userGreeting.classList.remove("hidden");
    logoutBtn.classList.remove("hidden");
  } else {
    loginLink.classList.remove("hidden");
    userGreeting.classList.add("hidden");
    logoutBtn.classList.add("hidden");
  }

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    alert("로그아웃 되었습니다!");
    window.location.href = "index.html";
  });
  //첫 화면 로드시 방 display 출력

  const startBtn = document.querySelector(".btn-start");

  if (startBtn) {
    startBtn.addEventListener("click", (e) => {
      const user = localStorage.getItem("loggedInUser");

      if (!user) {
        e.preventDefault(); // ❗ 링크 이동 막기 필수!
        alert("로그인이 필요합니다!");
        window.location.href = "login.html";
      } else {
        // 로그인된 경우는 이동 OK!
        window.location.href = "rooms.html";
      }
    });
  }
});
