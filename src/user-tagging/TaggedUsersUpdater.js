export { TaggedUsersUpdater }
import { StorageUpdater } from "../storage/StorageUpdater.js";
import { StorageRetriever } from "../storage/StorageRetriever.js";
import { StorageKeys } from "../storage/ApplicationStorageKeys.js";

class TaggedUsersUpdater {
    constructor() {
        this.storageUpdater = new StorageUpdater();
        this.storageRetriever = new StorageRetriever();
    }

    tagUser(taggedUserDetail) {
        this.storageUpdater.addItemToStorage((taggedUserDetail.userId + '.' + StorageKeys.TagDetail), taggedUserDetail);
    }

    unTagUser(userId) {
        this.storageUpdater.removeItemFromStorage(StorageKeys.generateTagDetailKey(userId));
    }
}