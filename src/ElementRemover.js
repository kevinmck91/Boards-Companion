export { ElementRemover }

class ElementRemover {

    removeWhitespaceElements(element) {
        element.innerHTML = element.innerHTML.replace(/\&nbsp;/g, '');
    }
}