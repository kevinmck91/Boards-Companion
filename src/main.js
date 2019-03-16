"use strict";
import { ElementVisibilityUpdater } from "./ElementVisibilityUpdater.js";
import { HeaderReducer } from "./HeaderReducer.js";
import { AutomaticPageLoader } from "./AutomaticPageLoader.js";
import { PostsCompressionToggler } from "./PostsCompressionToggler.js";

let elementVisibilityUpdater = new ElementVisibilityUpdater();
let headerReducer = new HeaderReducer();
let automaticPageLoader = new AutomaticPageLoader();
let postsCompressionToggler = new PostsCompressionToggler();

elementVisibilityUpdater.hideWelcomeNotice();
elementVisibilityUpdater.hideEachPostsElements();
headerReducer.toggleHeaderReduction();
automaticPageLoader.autoScrollPages();
postsCompressionToggler.applyCompressionToggling();



