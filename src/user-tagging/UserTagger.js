export { UserTagger }

import { ElementFinder } from "../finders/ElementFinder.js";
import { AvatarDetailsFinder } from "../finders/AvatarDetailsFinder.js";
import { PostHtmlUpdater } from "../post-manipulation/PostHtmlUpdater.js";
import { TaggerModalUpdater } from "../user-tagging/TaggerModalUpdater.js";
import { UserTagApplier } from "../user-tagging/UserTagApplier.js";

class UserTagger {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.avatarDetailsFinder = new AvatarDetailsFinder();
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
        let tagIconElements = this.avatarDetailsFinder.getTagIconElementsFromPosts(posts);
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
        let userDetailsElement = this.avatarDetailsFinder.getUserDetailsElementFromTagElement(tagElement);
        let usernameElement = this.avatarDetailsFinder.getUsernameElementFromUserDetailsElement(userDetailsElement);
        return usernameElement.innerText;
    }

    _getUserId(tagElement) {
        let userDetailsElement = this.avatarDetailsFinder.getUserDetailsElementFromTagElement(tagElement);
        let usernameElement = this.avatarDetailsFinder.getUsernameElementFromUserDetailsElement(userDetailsElement);
        return this._getUserIdFromUsernameElement(usernameElement);
    }

    _getUserIdFromUsernameElement(usernameElement) {
        let usernameLink = usernameElement.href;
        let userId = usernameLink.match(/u\=(\d+)/)[1];
        return userId;
    }
}