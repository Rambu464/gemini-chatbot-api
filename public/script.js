const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

let conversation = [];

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userText = userInput.value.trim();
  if (!userText) return;

  conversation.push({ role: "user", text: userText });
  displayMessage("user", userText);

  userInput.value = "";

  const thinkingDiv = displayMessage("bot", "Thinking...");
  thinkingDiv.classList.add("thinking");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ conversation }),
    });

    if (!response.ok) {
      throw new Error("Failed to get response from server.");
    }

    const data = await response.json();
    if (data.result) {
      conversation.push({ role: "model", text: data.result });
      thinkingDiv.innerHTML = formatResponseText(data.result);
      thinkingDiv.classList.remove("thinking");
    } else {
      throw new Error("Sorry, no response received.");
    }
  } catch (error) {
    thinkingDiv.textContent = error.message;
    thinkingDiv.classList.remove("thinking");
    thinkingDiv.classList.add("error");
  }
});

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatResponseText(text) {
  const safeText = escapeHtml(String(text || ""));
  return safeText.replace(/\r\n/g, "\n").replace(/\n/g, "<br>");
}

function displayMessage(role, text) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${role}`;
  messageDiv.innerHTML = formatResponseText(text);
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  return messageDiv;
}
