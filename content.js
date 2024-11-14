function applyLayout() {
  const body = document.body;

  // Adiciona a classe `layout-ativo` ao body
  body.classList.add("layout-ativo");

  if (!document.getElementById("conteudo") && !document.getElementById("anotacao")) {
    const conteudoDiv = document.createElement("div");
    conteudoDiv.id = "conteudo";

    // Move o conteúdo do body para dentro de #conteudo
    while (body.firstChild) {
      conteudoDiv.appendChild(body.firstChild);
    }
    body.appendChild(conteudoDiv);

    // Cria o espaço de anotação
    const anotacaoDiv = document.createElement("div");
    anotacaoDiv.id = "anotacao";
    body.appendChild(anotacaoDiv);
  }
}

function removeLayout() {
  const conteudoDiv = document.getElementById("conteudo");
  const anotacaoDiv = document.getElementById("anotacao");

  // Remove a classe `layout-ativo` do body
  document.body.classList.remove("layout-ativo");

  if (conteudoDiv && anotacaoDiv) {
    while (conteudoDiv.firstChild) {
      document.body.appendChild(conteudoDiv.firstChild);
    }
    conteudoDiv.remove();
    anotacaoDiv.remove();
  }
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.layoutActive) {
    applyLayout();
  } else {
    removeLayout();
  }
});

chrome.storage.sync.get("layoutActive", (data) => {
  if (data.layoutActive) applyLayout();
});



function applyLinks(){
  const links = document.querySelectorAll("a");

  links.forEach((link) => {
    link.style.display = "";
  });
}
function removeLinks(){
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    link.style.display = "none";
  });
}


chrome.runtime.onMessage.addListener((message) => {
  if (message.linkActive) {
    removeLinks();
  } else {
    applyLinks();
  }
});

chrome.storage.sync.get("linkActive", (data) => {
  if (data.linkActive) removeLinks();
});




function applyRevogado(){
  const revogado = document.querySelectorAll("strike");
  revogado.forEach((item) => {
    item.style.display = "";
  });
}
function removeRevogado(){
  const revogado = document.querySelectorAll("strike");
  revogado.forEach((item) => {
    // item.remove();
    item.style.display = "none";
  });



}

chrome.runtime.onMessage.addListener((message) => {
  if (message.revogadoActive) {
    removeRevogado();
  } else {
    applyRevogado();
  }
});

chrome.storage.sync.get("revogadoActive", (data) => {
  if (data.linkActive) removeRevogado();
});


chrome.runtime.onMessage.addListener((message) => {
  if(message.applyAllActive){
    removeLinks();
    removeRevogado();
    applyLayout();
  }else{
    applyRevogado();
    applyLinks();
    removeLayout();
  }
});

chrome.storage.sync.get("applyAllActive", (data) => {
  if (data.linkActive) {
    applyRevogado();
    applyLinks();
    removeLayout();
  };
});


chrome.runtime.onMessage.addListener((message) => {
  console.log(message);
});
