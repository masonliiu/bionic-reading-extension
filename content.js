function bionic(text, ratio = 0.4) {
    return text.replace(/\b(\w+)\b/g, (match) => {
        const cutoff = Math.ceil(match.length * ratio);
        return `<strong>${match.slice(0, cutoff)}</strong>${match.slice(cutoff)}`;
    });
}

function applyBionicReading() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];

    while (walker.nextNode()) nodes.push(walker.currentNode);

    for (const node of nodes) {
        const parent = node.parentElement;
        if (parent && !["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) {
            const html = bionic(node.textContent);
            const span = document.createElement("span");
            span.innerHTML = html;
            parent.replaceChild(span, node);
        }
    }
}

applyBionicReading();