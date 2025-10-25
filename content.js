if (!document.getElementById("bionic-style")) {
  const style = document.createElement("style");
  style.id = "bionic-style";
  style.textContent = `
    [data-bionic="true"] span {
      font-weight: 600;
      letter-spacing: 0.02em;
    }
  `;
  document.head.appendChild(style);
}

if (window.bionicEnabled === undefined) window.bionicEnabled = false;

function bionic(text, ratio = 0.4) {
    return text.replace(/\b(\w+)\b/g, (match) => {
        const cutoff = Math.ceil(match.length * ratio);
        return `<span>${match.slice(0, cutoff)}</span>${match.slice(cutoff)}`;
    });
}

function applyBionicReading() {
    if (document.querySelectorAll('[data-bionic="true"]').length > 0) return;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];

    while (walker.nextNode()) nodes.push(walker.currentNode);

    for (const node of nodes) {
        const parent = node.parentElement;
        if (parent && !["SCRIPT", "STYLE", "NOSCRIPT", "A", "BUTTON", "H1", "H2", "H3", 
        "H4", "H5", "H6", "INPUT", "TEXTAREA", "SVG"].includes(parent.tagName)) {
          const span = document.createElement("span");
          span.setAttribute("data-bionic", "true");
          span.innerHTML = bionic(node.textContent);
          parent.replaceChild(span, node);
        }
    }
}

function revertBionicReading() {
    const bionicNodes = document.querySelectorAll('[data-bionic="true"]');
    for (const span of bionicNodes) {
        const textNode = document.createTextNode(span.textContent);
        span.parentElement.replaceChild(textNode, span);
    }
}

if (!window.bionicEnabled) {
    applyBionicReading();
    window.bionicEnabled = true;
} else {
    revertBionicReading();
    window.bionicEnabled = false;
}