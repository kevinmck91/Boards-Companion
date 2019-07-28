export { AvatarDetailsFinder }

class AvatarDetailsFinder {

    getAvatarInfoElement(post) {
        return post.querySelector('[valign="top"] > .alt2');
    }

    getHideableElements(post) {
        let hideableElements = [];
        hideableElements.push(this.getRegisteredUserElement(post));
        hideableElements.push(...(this.getLinksSectionElements(post)));
        let avatarPictureElement = this.getAvatarPictureElement(post);
        if (avatarPictureElement != null)
            hideableElements.push(avatarPictureElement);
        hideableElements.push(this.getStarsElement(post));
        return hideableElements;
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
        return Array.from(post.querySelectorAll(".alt2 .smallfont:last-of-type div:nth-last-of-type(-n+2)"));
    }

    getJoinDateElement(post) {
        return post.querySelector(".alt2 .smallfont:last-of-type div:nth-child(1)");
    }

    getPostCountElement(post) {
        return post.querySelector(".alt2 .smallfont:last-of-type div:nth-last-of-type(3)");
    }
}