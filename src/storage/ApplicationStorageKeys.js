export const StorageKeys = {
    TagDetail: "tagDetail",
    HidePostElementsEnabled: "hidePostElementsEnabled",
    AutoScrollingEnabled: "autoscrollingEnabled",
    ToggleHeaderTransparency: "toggleHeaderTransparency",
    generateTagDetailKey(userId) {
        return userId + '.' + this.TagDetail;
    }
};

export { ApplicationStorageKeys }

class ApplicationStorageKeys { }