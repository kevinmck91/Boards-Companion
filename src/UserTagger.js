export { UserTagger }

import { ElementFinder } from "./ElementFinder.js";
import { PostHtmlUpdater } from "./PostHtmlUpdater.js";
import { TaggerModalUpdater } from "./TaggerModalUpdater.js";
import { UserTagApplier } from "./UserTagApplier.js";

class UserTagger {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.postHtmlUpdater = new PostHtmlUpdater();
        this.taggerModalUpdater = new TaggerModalUpdater();
        this.userTagApplier = new UserTagApplier();
    }

    applyTagging() {
        this.applyTaggingToPosts(this.elementFinder.getAllPosts());
    }

    applyTaggingToPosts(posts) {
        this.postHtmlUpdater.addTagElementToPosts(posts);
        this._addTagListeners(posts);
        this.userTagApplier.tagTaggedUserPosts(posts);
    }

    _addTagListeners(posts) {
        let tagElements = this.elementFinder.getTagElementsFromPosts(posts);
        for (let tagElement of tagElements) {
            let _this = this;
            tagElement.addEventListener('click', function (ev) {
                _this.taggerModalUpdater.addTaggerModal(tagElement)
            });
        }
    }

}