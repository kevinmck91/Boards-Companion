export { StorageUpdater }

class StorageUpdater {

    addItemToStorage(key, value) {
        chrome.storage.sync.set({ [key]: value });
    }

    removeItemFromStorage(key) {
        chrome.storage.sync.remove(key, () => { });
    }

}