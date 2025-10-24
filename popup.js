const button = document.getElementById("toggle");

button.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: toggleBionicMode
    });

    button.textContent = button.textContet === "Enable" ? "Disable" : "Enable";
});

function toggleBionicMode() {
    if(!window.bionicEnabled) {
        window.bionicEnabled=true;
        applyBionicReading();
    } else {
        window.bionicEnabled = false;
        revertBionicReading();
    }
}