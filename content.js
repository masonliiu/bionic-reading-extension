if (window.bionicEnabled === undefined) window.bionicEnabled = false;

function bionic(text, ratio = 0.4) {
    return text.replace(/\b(\w+)\b/g, (match) => {
        const cutoff = Math.ceil(match.length * ratio);
        return `<strong>${match.slice(0, cutoff)}</strong>${match.slice(cutoff)}`;
    });
}

function applyBionicReading() {
    if (document.querySelectorAll('[data-bionic="true"]').length > 0) return;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];

    while (walker.nextNode()) nodes.push(walker.currentNode);

    for (const node of nodes) {
        const parent = node.parentElement;
        if (parent && !["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) {
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