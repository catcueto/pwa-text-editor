const butInstall = document.getElementById("buttonInstall");
// console.log(butInstall);

// Logic for installing the PWA
// Event handler for the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  // Storing the triggered events
  window.deferredPrompt = event;
  // Remove hidden class from btn
  butInstall.classList.toggle("hidden", false);
});

// Click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }
  // Displays prompt
  promptEvent.prompt();
  // Resets the deferred prompt variable so it can only be used once
  window.deferredPrompt = null;
  // Adding hidden class to btn
  butInstall.classList.toggle("hidden", true);
});

// Handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  // Clears prompt
  window.deferredPrompt = null;
});
