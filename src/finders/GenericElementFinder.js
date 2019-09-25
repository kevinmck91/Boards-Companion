export { GenericElementFinder };

class GenericElementFinder {

    findParentElement(candidateElement, noOfGenerations) {
        for (let i = 1; i <= noOfGenerations; i++) {
            candidateElement = candidateElement.parentElement;
        }
        return candidateElement;
    }

    getElementSiblings(candidateElement) {
        let siblings = [];
        let sibling = candidateElement.parentNode.firstChild;
        while (sibling) {
            if (sibling !== candidateElement) {
                siblings.push(sibling);
            }
            sibling = sibling.nextSibling
        }
        return siblings;
    }

}