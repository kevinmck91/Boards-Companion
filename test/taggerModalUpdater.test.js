import { ModalDetailsFinder } from "../src/ModalDetailsFinder.js";
import { TestThreadPageBuilder } from "./TestThreadPageBuilder.js";
import { TaggerModalUpdater } from "../src/TaggerModalUpdater.js";
import { TestEnvironmentArranger } from "./TestEnvironmentArranger.js";
import { UserTagger } from "../src/UserTagger.js";

let modalDetailsFinder = new ModalDetailsFinder();
let testThreadPageBuilder = null;
let taggerModalUpdater = new TaggerModalUpdater();
let testEnvironmentArranger = new TestEnvironmentArranger();
let userTagger = new UserTagger();

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
    testEnvironmentArranger.InitializeEnvironment();
})

it('test activate modal element', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    userTagger.applyTagging();
    taggerModalUpdater.activateModal('testuser');

    let userDetails = modalDetailsFinder.getUserDetails();
    expect(userDetails.username).toBe('testuser');
})

it('ensure modal element only initialized once', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    userTagger.applyTagging();
    userTagger.applyTagging();

    expect(document.body.outerHTML.match(/modal/g).length).toBe(1);

})