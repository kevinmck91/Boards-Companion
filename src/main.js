"use strict";
import { ElementVisibilityUpdater } from "./ElementVisibilityUpdater.js";
import { HeaderTransparencyToggler } from "./HeaderTransparencyToggler.js";
import { AutomaticPageLoader } from "./AutomaticPageLoader.js";
import { PostsCompressionToggler } from "./PostsCompressionToggler.js";
import { PageUpdater } from "./PageUpdater.js";
import { Settings } from "./ConfigurationSettings.js";
import { ConfigurationSettingExecutor } from "./ConfigurationSettingExecutor.js";

let elementVisibilityUpdater = new ElementVisibilityUpdater();
let headerTransparencyToggler = new HeaderTransparencyToggler();
let automaticPageLoader = new AutomaticPageLoader();
let postsCompressionToggler = new PostsCompressionToggler();
let pageUpdater = new PageUpdater();
let hidePostElementsSetting = new ConfigurationSettingExecutor(Settings.HidePostElementsEnabled);
let toggleHeaderTransparencySetting = new ConfigurationSettingExecutor(Settings.ToggleHeaderTransparency);

try {
    pageUpdater.restoreConsole();
}
catch (error) {
    console.error("Error restoring console: " + error);
}

try {
    elementVisibilityUpdater.hideWelcomeNotice();
}
catch (error) {
    console.error("Unable to hide welcome notice: " + error);
}

try {
    hidePostElementsSetting.ConditionallyExecute(() => {
        elementVisibilityUpdater.hideEachPostsElements();
        postsCompressionToggler.applyCompressionToggling();
    });
}
catch (error) {
    console.error("Unable to hide post elements: " + error);
}

try {
    toggleHeaderTransparencySetting.ConditionallyExecute(() => {
        headerTransparencyToggler.enableToggling();
    });
}
catch (error) {
    console.error("Unable to toggle header reduction: " + error);
}

try {
    hidePostElementsSetting.ConditionallyExecute(() => {
        automaticPageLoader.autoScrollPages(true);
    }, () => {
        automaticPageLoader.autoScrollPages(false);
    });
}
catch (error) {
    console.error("Unable to activate auto page scrolling: " + error);
}

