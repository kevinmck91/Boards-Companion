import { ApplicationSettings } from "../ApplicationSettings.js";

let popupSettings = [ApplicationSettings.PopupSettings.AutoscrollingEnabled, ApplicationSettings.PopupSettings.HidePostElements, ApplicationSettings.PopupSettings.ToggleHeaderTransparency];
updateCheckboxValuesFromStorage();
enableSaving();

function enableSaving() {
    document.getElementById("saveConfigurationButton").addEventListener("click", saveCurrentConfiguration);
}

function updateCheckboxValuesFromStorage() {
    for (let popupSetting of popupSettings) {
        updateCheckboxValueFromStorage(popupSetting);
    }
}

function saveCurrentConfiguration() {
    for (let popupSetting of popupSettings) {
        addConfigurationSettingToStorage(popupSetting);
    }
    chrome.tabs.reload();
}

function updateCheckboxValueFromStorage(popupSetting) {
    chrome.storage.sync.get(popupSetting.Key, function (result) {
        if (result[popupSetting.Key] == true) {
            setConfigurationCheckbox(popupSetting.Key, true);
        } else if (result[popupSetting.Key] == false) {
            setConfigurationCheckbox(popupSetting.Key, false);
        } else {
            setConfigurationCheckbox(popupSetting.Key, popupSetting.DefaultValue)
        }
    });
}

function setConfigurationCheckbox(checkboxId, isChecked) {
    document.getElementById(checkboxId).checked = isChecked;
}

function addConfigurationSettingToStorage(popupSetting) {
    if (document.getElementById(popupSetting.Key).checked) {
        chrome.storage.sync.set({ [popupSetting.Key]: true });
    }
    else {
        chrome.storage.sync.set({ [popupSetting.Key]: false });
    }
}

