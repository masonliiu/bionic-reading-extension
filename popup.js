const button = document.getElementById("toggle");

button.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    await chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ["content.js"]
    });

    button.textContent = button.textContent === "Enable" ? "Disable" : "Enable";
});