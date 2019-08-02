export { AvatarDetailsFinder }

class AvatarDetailsFinder {

    getHideableElements(post) {
        let hideableElements = [];
        hideableElements.push(this.getRegisteredUserElement(post));
        hideableElements.push(...(this.getLinksSectionElements(post)));
        let avatarPictureElement = this.getAvatarPictureElement(post);
        if (avatarPictureElement != null)
            hideableElements.push(avatarPictureElement);
        hideableElements.push(this.getStarsElement(post));
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
        return post.querySelector(".alt2 div:nth-child(2)");
    }

    getStarsElement(post) {
        return post.querySelector(".alt2 div:nth-child(3)");
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

    getJoinDateElement(post) {
        return post.querySelector(".alt2 .smallfont:last-of-type div:nth-child(2)");
    }

    getPostCountElement(post) {
        return post.querySelector(".alt2 .smallfont:last-of-type div:nth-last-of-type(3)");
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