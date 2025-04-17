document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("chatToggleBtn");
  const chatBox = document.getElementById("chatSidebar");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");

  toggleBtn.addEventListener("click", () => {
    chatBox.classList.toggle("visible");
  });

  chatInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // ✅ 엔터 기본 동작 방지 (줄바꿈, submit 등)

      const text = chatInput.value.trim();
      if (text !== "") {
        const msg = document.createElement("div");
        msg.textContent = text;
        chatMessages.appendChild(msg);
        chatInput.value = "";
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }
  });
});
