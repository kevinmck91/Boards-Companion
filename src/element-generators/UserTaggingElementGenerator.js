export { UserTaggingElementGenerator }

import { FontAwesomeElementGenerator } from "./FontAwesomeElementGenerator.js";

class UserTaggingElementGenerator {

    constructor() {
        this.fontAwesomeElementGenerator = new FontAwesomeElementGenerator();
    }

    generateTagIconElement() {
        let tagIconElement = document.createElement('span');
        tagIconElement.className = "tag-icon clickable";
        let tagIconElementContent = this.fontAwesomeElementGenerator.generateFontAwesomeIcon("fas fa-tag");
        tagIconElement.appendChild(tagIconElementContent);
        return tagIconElement;
    }

    generateUserTagElement(taggedUserDetails) {
        let userTag = document.createElement('div');
        userTag.innerHTML = taggedUserDetails.text;
        userTag.style.backgroundColor = taggedUserDetails.colour;
        userTag.className = 'user-tag';
        return userTag;
    }
}