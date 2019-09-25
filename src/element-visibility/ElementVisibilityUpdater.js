export { ElementVisibilityUpdater };

class ElementVisibilityUpdater {

    hideElement(element) {
        try {
            element.style.display = 'none';
        } catch (error) {
            console.error("Failed to hide element: " + error, error.stack);
        }
    }

    hideElements(elementArray) {
        for (let element of elementArray) {
            this.hideElement(element);
        }
    }

    transparentizeElements(elements) {
        for (let element of elements) {
            this.transparentizeElement(element);
        }
    }

    transparentizeElement(element) {
        element.style.opacity = '0';
    }

    untransparentizeElements(elements) {
        for (let element of elements) {
            this.untransparentizeElement(element);
        }
    }

    untransparentizeElement(element) {
        element.style.opacity = '1';
    }

    showElements(elementArray) {
        for (let element of elementArray) {
            this.showElement(element);
        }
    }

    showElement(element) {
        element.style.display = '';
    }
}