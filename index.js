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
});
