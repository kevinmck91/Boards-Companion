export { UserTagger }

import { ElementFinder } from "../finders/ElementFinder.js";
import { AvatarElementFinder } from "../finders/AvatarElementFinder.js";
import { PostHtmlUpdater } from "../post-manipulation/PostHtmlUpdater.js";
import { TaggerModalUpdater } from "../user-tagging/TaggerModalUpdater.js";
import { UserTagApplier } from "../user-tagging/UserTagApplier.js";

class UserTagger {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.avatarElementFinder = new AvatarElementFinder();
        this.postHtmlUpdater = new PostHtmlUpdater();
        this.taggerModalUpdater = new TaggerModalUpdater();
        this.userTagApplier = new UserTagApplier();
    }

    applyTagging() {
        this.applyTaggingToPosts(this.elementFinder.getAllPosts());
    }

    applyTaggingToPosts(posts) {
        this.taggerModalUpdater.ensureModalInitialized();
        this.postHtmlUpdater.addTagIconElementToPosts(posts);
        this._addTagListeners(posts);
        this.userTagApplier.tagTaggedUserPosts(posts);
    }

    _addTagListeners(posts) {
        let tagIconElements = this.avatarElementFinder.getTagIconElementsFromPosts(posts);
        for (let tagIconElement of tagIconElements) {
            let _this = this;
            tagIconElement.addEventListener('click', function (ev) {
                let username = _this._getUserName(tagIconElement);
                let userId = _this._getUserId(tagIconElement);
                _this.taggerModalUpdater.activateModal(username, userId)
            });
        }
    }

    _getUserName(tagElement) {
        let userDetailsElement = this.avatarElementFinder.getUserDetailsElementFromTagElement(tagElement);
        let usernameElement = this.avatarElementFinder.getUsernameElementFromUserDetailsElement(userDetailsElement);
        return usernameElement.innerText;
    }

    _getUserId(tagElement) {
        let userDetailsElement = this.avatarElementFinder.getUserDetailsElementFromTagElement(tagElement);
        let usernameElement = this.avatarElementFinder.getUsernameElementFromUserDetailsElement(userDetailsElement);
        return this._getUserIdFromUsernameElement(usernameElement);
    }

    _getUserIdFromUsernameElement(usernameElement) {
        let usernameLink = usernameElement.href;
        let userId = usernameLink.match(/u\=(\d+)/)[1];
        return userId;
    }
}