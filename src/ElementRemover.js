export { ElementRemover }

class ElementRemover {

    removeElements(elements) {
        for (let element of elements) {
            element.parentNode.removeChild(element);
        }
    }
}