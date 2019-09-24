export { PopupSettingExecutor }

class PopupSettingExecutor {

    constructor(popupSetting) {
        this.popupSetting = popupSetting;
    }

    ExecuteFunctionality(ifTrueFuctionality, ifFalseFunctionality) {
        chrome.storage.sync.get(this.popupSetting.Key, (result) => {
            if (result[this.popupSetting.Key] == true) {
                this.executeFunctionality(ifTrueFuctionality);
            } else if (result[this.popupSetting.Key] == false) {
                this.executeFunctionality(ifFalseFunctionality);
            } else {
                if (this.popupSetting.DefaultValue == true) {
                    this.executeFunctionality(ifTrueFuctionality);
                } else {
                    this.executeFunctionality(ifFalseFunctionality);
                }
            }
        });
    }

    executeFunctionality(functionality) {
        if (functionality != null) {
            functionality();
        }
    }
}