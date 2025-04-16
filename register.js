document.getElementById("registerBtn").addEventListener("click", () => {
  const id = document.getElementById("registerID").value.trim();
  const pw = document.getElementById("registerPW").value.trim();
  const pwConfirm = document.getElementById("registerPWConfirm").value.trim();

  if (!id || !pw || !pwConfirm) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  if (pw !== pwConfirm) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const isDuplicate = users.some((user) => user.id === id);

  if (isDuplicate) {
    alert("이미 존재하는 아이디입니다.");
    return;
  }

  users.push({ id, pw });
  localStorage.setItem("users", JSON.stringify(users));

  alert("회원가입이 완료되었습니다!");
  window.location.href = "login.html";
});

// 아이디 입력 제약: 영어+숫자만
document.getElementById("registerID").addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
});

// 비밀번호 눈 아이콘 토글
const pwInput = document.getElementById("registerPW");
const togglePW = document.getElementById("togglePW");

togglePW.addEventListener("click", () => {
  const isHidden = pwInput.type === "password";
  pwInput.type = isHidden ? "text" : "password";
  togglePW.textContent = isHidden ? "🙈" : "👁️";
});

// 회원가입 버튼 처리
document.getElementById("registerBtn").addEventListener("click", () => {
  const name = document.getElementById("registerName").value.trim();
  const id = document.getElementById("registerID").value.trim();
  const pw = pwInput.value.trim();
  const pwConfirm = document.getElementById("registerPWConfirm").value.trim();

  if (!name || !id || !pw || !pwConfirm) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  if (pw !== pwConfirm) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const isDuplicate = users.some((user) => user.id === id);

  if (isDuplicate) {
    alert("이미 존재하는 아이디입니다.");
    return;
  }

  users.push({ name, id, pw });
  localStorage.setItem("users", JSON.stringify(users));

  alert("회원가입이 완료되었습니다!");
  window.location.href = "login.html";
});
