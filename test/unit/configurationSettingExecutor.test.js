import { PopupSettingExecutor } from "../../src/PopupSettingExecutor.js";
import { ApplicationSettings } from "../../src/ApplicationSettings.js";
import { ChromeStorageMocker } from "./test-environment/ChromeStorageMocker.js";

let chromeStorageMocker = new ChromeStorageMocker();

it('test configuration setting executed', () => {
    let hidePostElementsSetting = new PopupSettingExecutor(ApplicationSettings.PopupSettings.HidePostElements);
    chromeStorageMocker.MockGetter({ [ApplicationSettings.PopupSettings.HidePostElements.Key]: true });

    let functionality = jest.fn();
    hidePostElementsSetting.ExecuteFunctionality(functionality);

    expect(functionality.mock.calls.length).toBe(1);
})
