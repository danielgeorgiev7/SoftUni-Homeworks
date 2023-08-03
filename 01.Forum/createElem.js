export function createElem(type, content, parent, attributes) {
    let result = document.createElement(type);
    result.textContent = content;
    if (parent) { parent.appendChild(result); }
    Object.keys(attributes).forEach((key) => {
        result.setAttribute(key, attributes[key]);
    })
    return result;
}