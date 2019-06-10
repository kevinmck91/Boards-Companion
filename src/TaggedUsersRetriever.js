export { TaggedUsersRetriever }
import { StorageRetriever } from "./StorageRetriever.js";

class TaggedUsersRetriever {

    constructor() {
        this.storageRetriever = new StorageRetriever();
    }

    getTaggedUsers(functionalityToApply) {
        let _this = this;
        this.storageRetriever.getItem('taggedUsers', (usernames) => {
            if (usernames != undefined) {
                functionalityToApply(_this._convertUsernamesToArray(usernames));
            }
        });
    }

    _convertUsernamesToArray(usernames) {
        return usernames.split(';');
    }

}