export { TaggedUsersRetriever }
import { StorageRetriever } from "../storage/StorageRetriever.js";
import { ApplicationSettings } from "../ApplicationSettings.js";

class TaggedUsersRetriever {

    constructor() {
        this.storageRetriever = new StorageRetriever();
    }

    getTaggedUsers(functionalityToApply) {
        this.storageRetriever.getAllData((data) => {
            let tagDetailList = this._extractTagDetailList(data);
            functionalityToApply(tagDetailList);
        });
    }

    getTaggedUser(userId, functionalityToApply) {
        this.getTaggedUsers((tagDetailList) => {
            let tagDetail = tagDetailList.find((element) => {
                return element.userId = userId;
            });
            functionalityToApply(tagDetail);
        })
    }

    _extractTagDetailList(data) {
        let tagDetailList = [];
        let objectKeys = Object.keys(data);
        for (let objectKey of objectKeys) {
            if (objectKey.indexOf("." + ApplicationSettings.StorageConstants.TagDetail) != -1) {
                tagDetailList.push(data[objectKey]);
            }
        }
        return tagDetailList;
    }

}