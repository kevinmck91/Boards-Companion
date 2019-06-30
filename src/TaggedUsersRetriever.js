export { TaggedUsersRetriever }
import { StorageRetriever } from "./StorageRetriever.js";
import { StorageKeys } from "./ApplicationStorageKeys.js"

class TaggedUsersRetriever {

    constructor() {
        this.storageRetriever = new StorageRetriever();
    }

    getTaggedUsers(functionalityToApply) {
        let _this = this;
        this.storageRetriever.getItem(StorageKeys.TaggedUsersDetails, (userDetailsString) => {
            if (userDetailsString) {
                functionalityToApply(_this._convertToUserDetailsList(userDetailsString));
            }
        });
    }

    _convertToUserDetailsList(userDetailsString) {
        let userDetailsElements = userDetailsString.split(';')
        let userDetailsList = [];
        for (let i = 0; i < userDetailsElements.length; i += 3) {
            let username = userDetailsElements[i];
            let colour = userDetailsElements[i + 1];
            let text = userDetailsElements[i + 2];
            userDetailsList.push({ username: username, colour: colour, text: text });
        }
        return userDetailsList;
    }

}