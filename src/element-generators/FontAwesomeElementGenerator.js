export { FontAwesomeElementGenerator }

class FontAwesomeElementGenerator {

    generateFontAwesomeIcon(iconClass) {
        let tagIconElement = document.createElement('i');
        tagIconElement.className = iconClass;
        return tagIconElement;
    }
}