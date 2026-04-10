const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

let conversation = [];

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userText = userInput.value.trim();
  if (!userText) return;

  // Add user message to conversation and display
  conversation.push({ role: "user", text: userText });
  displayMessage("user", userText);

  // Clear input
  userInput.value = "";

  // Show thinking message
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
      // Add model response to conversation
      conversation.push({ role: "model", text: data.result });
      // Replace thinking with actual response
      thinkingDiv.textContent = data.result;
      thinkingDiv.classList.remove("thinking");
    } else {
      throw new Error("Sorry, no response received.");
    }
  } catch (error) {
    // Replace thinking with error message
    thinkingDiv.textContent = error.message;
    thinkingDiv.classList.remove("thinking");
    thinkingDiv.classList.add("error");
  }
});

function displayMessage(role, text) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${role}`;
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to bottom
  return messageDiv;
}
