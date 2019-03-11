"use strict";
import { ElementVisibilityUpdater } from "./ElementVisibilityUpdater.js";
import { HeaderReducer } from "./HeaderReducer.js";

let elementVisibilityUpdater = new ElementVisibilityUpdater();
let headerReducer = new HeaderReducer();

elementVisibilityUpdater.hideWelcomeNotice();
elementVisibilityUpdater.hideAvatarInfo();
elementVisibilityUpdater.hidePostFooter();
headerReducer.toggleHeaderReduction();

