"use strict";
import { PostElementsVisibilityUpdater } from "./element-visibility/PostElementsVisibilityUpdater.js";
import { WelcomeNoticeVisibilityUpdater } from "./element-visibility/WelcomeNoticeVisibilityUpdater.js";
import { HeaderTransparencyToggler } from "./HeaderTransparencyToggler.js";
import { AutomaticPageLoader } from "./automatic-pageloading/AutomaticPageLoader.js";
import { PostsCompressionToggler } from "./post-manipulation/PostsCompressionToggler.js";
import { PageInternalsUpdater } from "./page/PageInternalsUpdater.js";
import { ApplicationSettings } from "./ApplicationSettings.js";
import { PopupSettingExecutor } from "./PopupSettingExecutor.js";
import { UserTagger } from "./user-tagging/UserTagger.js";

let welcomeNoticeVisibilityUpdater = new WelcomeNoticeVisibilityUpdater();
let postElementsVisibilityUpdater = new PostElementsVisibilityUpdater();
let headerTransparencyToggler = new HeaderTransparencyToggler();
let automaticPageLoader = new AutomaticPageLoader();
let postsCompressionToggler = new PostsCompressionToggler();
let pageInternalsUpdater = new PageInternalsUpdater();
let autoscrollingsSetting = new PopupSettingExecutor(ApplicationSettings.PopupSettings.AutoscrollingEnabled);
let hidePostElementsSetting = new PopupSettingExecutor(ApplicationSettings.PopupSettings.HidePostElements);
let toggleHeaderTransparencySetting = new PopupSettingExecutor(ApplicationSettings.PopupSettings.ToggleHeaderTransparency);
let userTagger = new UserTagger();

try {
    pageInternalsUpdater.restoreConsole();
}
catch (error) {
    console.error("Error restoring console: " + error);
}

try {
    welcomeNoticeVisibilityUpdater.hideWelcomeNotice();
}
catch (error) {
    console.error("Unable to hide welcome notice: " + error);
}

try {
    hidePostElementsSetting.ExecuteFunctionality(
        () => {
            postElementsVisibilityUpdater.hideEachPostsElements();
            postsCompressionToggler.applyCompressionToggling();
        },
        null);
}
catch (error) {
    console.error("Unable to hide post elements: " + error);
}

try {
    toggleHeaderTransparencySetting.ExecuteFunctionality(
        () => {
            headerTransparencyToggler.enableToggling();
        },
        null);
}
catch (error) {
    console.error("Unable to toggle header reduction: " + error);
}

try {
    autoscrollingsSetting.ExecuteFunctionality(
        () => {
            hidePostElementsSetting.ExecuteFunctionality(
                () => {
                    automaticPageLoader.autoScrollPages(true);
                },
                () => {
                    automaticPageLoader.autoScrollPages(false);
                },
                () => {
                    automaticPageLoader.autoScrollPages(false);
                });
        },
        null);
}
catch (error) {
    console.error("Unable to activate auto page scrolling: " + error);
}

try {
    userTagger.applyTagging();
}
catch (error) {
    console.error("Could not activate post tagging: " + error);
}
