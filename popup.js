document.addEventListener("DOMContentLoaded", () => {
  const layoutToggle = document.getElementById("layoutToggle");
  const linkButton = document.getElementById("linkButton");
  const revogadoButton = document.getElementById("revogadoButton");
  const applyAllButton = document.getElementById("applyAllButton");

  // Carrega o estado inicial do checkbox a partir do armazenamento
  chrome.storage.sync.get("layoutActive", (data) => {
    layoutToggle.checked = data.layoutActive || false;
  });

  chrome.storage.sync.get("linkActive", (data) => {
    linkButton.checked = data.linkActive || false;
  });

  chrome.storage.sync.get("revogadoActive", (data) => {
    revogadoButton.checked = data.revogadoActive || false;
  });

  chrome.storage.sync.get("applyAllActive", (data) => {
    applyAllButton.checked = data.applyAllActive || false;
  });



  // Escuta as mudanças no checkbox e envia a mensagem para o content script
  layoutToggle.addEventListener("change", () => {
    const layoutActive = layoutToggle.checked;
    chrome.storage.sync.set({layoutActive});
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { layoutActive });
    });
  });

  linkButton.addEventListener("change", () => {
    const linkActive = linkButton.checked;
    chrome.storage.sync.set({ linkActive });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { linkActive });
    });
  });

  revogadoButton.addEventListener("change", () => {
    const revogadoActive = revogadoButton.checked;
    chrome.storage.sync.set({ revogadoActive });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { revogadoActive });
    });
  });

  applyAllButton.addEventListener("change", () => {
    const applyAllActive = applyAllButton.checked;
    chrome.storage.sync.set({ applyAllActive });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { applyAllActive });
    });
  });
});
