export { TaggedUsersRetriever }
import { StorageRetriever } from "./StorageRetriever.js";

class TaggedUsersRetriever {

    constructor() {
        this.storageRetriever = new StorageRetriever();
    }

    getTaggedUsersDetails(functionalityToApply) {
        let _this = this;
        this.storageRetriever.getItem('taggedUsers', (userDetailsString) => {
            if (userDetailsString != undefined) {
                functionalityToApply(_this._convertToUserDetailsArray(userDetailsString));
            }
        });
    }

    _convertToUserDetailsArray(usernames) {
        let userDetailsElements = usernames.split(';')
        let userDetailsList = [];
        for (let i = 0; i < userDetailsElements.length; i += 2) {
            let username = userDetailsElements[i];
            let colour = userDetailsElements[i + 1];
            userDetailsList.push({ username: username, colour: colour });
        }
        return userDetailsList;
    }

}