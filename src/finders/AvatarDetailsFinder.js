export { AvatarDetailsFinder }
import { ArrayHelper } from "../helpers/ArrayHelper.js";

class AvatarDetailsFinder {

    constructor() {
        this.arrayHelper = new ArrayHelper();
    }

    getHideableElements(post) {
        let hideableElements = [];

        let registeredUserElement = this.getRegisteredUserElement(post);
        this.arrayHelper.addValidItem(registeredUserElement, hideableElements)

        hideableElements.push(...(this.getLinksSectionElements(post)));

        let avatarPictureElement = this.getAvatarPictureElement(post);
        this.arrayHelper.addValidItem(avatarPictureElement, hideableElements);

        let starsElement = this.getStarsElement(post);
        this.arrayHelper.addValidItem(starsElement, hideableElements);

        hideableElements.push(...(this.getLineBreakElements(post)));

        return hideableElements;
    }

    getElementsForRemoval(post) {
        let elementsForRemoval = [];
        let whiteSpaceElement = this.getWhitespaceElement(post);
        if (whiteSpaceElement != null)
            elementsForRemoval.push(whiteSpaceElement);
        return elementsForRemoval;
    }

    getRegisteredUserElement(post) {
        let result = post.querySelector(".alt2 div:nth-child(2)");
        if (result.children.length == 0)
            return result;
        else
            return null;
    }

    getStarsElement(post) {
        let result = post.querySelector(".alt2 div:nth-child(3)");
        if (result.outerHTML.toLowerCase().indexOf("star") != -1)
            return result;
        else
            return null;
    }

    getAvatarPictureElement(post) {
        let result = post.querySelector(".alt2 .smallfont > a");
        if (result != null)
            return result.parentElement;
        else
            return null;
    }

    getLinksSectionElements(post) {
        let firstChildLinks = Array.from(post.querySelectorAll(".alt2 .smallfont div a:nth-child(1)"));
        let linkElements = [];
        for (let firstChildLink of firstChildLinks) {
            linkElements.push(firstChildLink.parentElement);
        }
        let finalLinkElement = post.querySelector(".alt2 .smallfont:last-of-type div:last-of-type")
        linkElements.push(finalLinkElement);
        return linkElements;
    }

    getAvatarInfoFooter(post) {
        return post.querySelector(".alt2 .smallfont:last-of-type");
    }

    getJoinDateElement(post) {
        return post.querySelector(".alt2 .smallfont:last-of-type div:nth-child(2)");
    }

    getPostCountElement(post) {
        let avatarInfoFooterElements = this.getAvatarInfoFooter(post).querySelectorAll('div');
        let postCountElement = null;
        for (let avatarInfoFooterElement of avatarInfoFooterElements) {
            if (avatarInfoFooterElement.textContent.indexOf("Posts:") != -1) {
                postCountElement = avatarInfoFooterElement;
                break;
            }
        }
        return postCountElement;
    }

    getLineBreakElements(post) {
        return post.querySelectorAll(".alt2 .smallfont br");
    }

    getWhitespaceElement(post) {
        let result = post.querySelector(".alt2 .smallfont:last-of-type").childNodes[0];
        if (result.nodeType == Node.TEXT_NODE || result.tagName == 'br')
            return result;
        else
            return null;
    }
}