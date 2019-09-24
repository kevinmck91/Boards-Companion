export { StorageKeyGenerator }

import { ApplicationSettings } from "../ApplicationSettings.js";

class StorageKeyGenerator {

    generateTagDetailKey(userId) {
        return userId + '.' + ApplicationSettings.StorageConstants.TagDetail;
    }

}