import { Settings } from "./ConfigurationSettings.js";

let configurationSettingIdentifiers = [Settings.AutoScrollingEnabled, Settings.HidePostElementsEnabled, Settings.ReduceHeaderEnabled];
updateCheckboxValuesFromStorage();
enableSaving();

function enableSaving() {
    document.getElementById("saveConfigurationButton").addEventListener("click", saveCurrentConfiguration);
}

function updateCheckboxValuesFromStorage() {
    for (let configurationSettingIdentifier of configurationSettingIdentifiers) {
        updateCheckboxValueFromStorage(configurationSettingIdentifier);
    }
}

function saveCurrentConfiguration() {
    for (let configurationSetting of configurationSettingIdentifiers) {
        addConfigurationSettingToStorage(configurationSetting);
    }
    chrome.tabs.reload();
}

function updateCheckboxValueFromStorage(configurationSettingIdentifier) {
    chrome.storage.sync.get(configurationSettingIdentifier, function (result) {
        if (result[configurationSettingIdentifier] != false) {
            setConfigurationCheckbox(configurationSettingIdentifier, true);
        }
        else {
            setConfigurationCheckbox(configurationSettingIdentifier, false);
        }
    });
}

function setConfigurationCheckbox(checkboxId, isChecked) {
    document.getElementById(checkboxId).checked = isChecked;
}

function addConfigurationSettingToStorage(configurationSettingIdentifier) {
    if (document.getElementById(configurationSettingIdentifier).checked) {
        chrome.storage.sync.set({ [configurationSettingIdentifier]: true });
    }
    else {
        chrome.storage.sync.set({ [configurationSettingIdentifier]: false });
    }
}

