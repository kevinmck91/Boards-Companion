import { ModalDetailsFinder } from "../src/ModalDetailsFinder.js";
import { TestThreadPageBuilder } from "./TestThreadPageBuilder.js";
import { TaggerModalUpdater } from "../src/TaggerModalUpdater.js";
import { TestEnvironmentArranger } from "./TestEnvironmentArranger.js";
import { UserTagger } from "../src/UserTagger.js";
import { ElementFinder } from "../src/ElementFinder.js";
import { ChromeStorageMocker } from "./ChromeStorageMocker.js";
import { StorageKeys } from "../src/ApplicationStorageKeys.js";

let modalDetailsFinder = new ModalDetailsFinder();
let testThreadPageBuilder = null;
let taggerModalUpdater = new TaggerModalUpdater();
let testEnvironmentArranger = new TestEnvironmentArranger();
let userTagger = new UserTagger();
let elementFinder = new ElementFinder();
let chromeStorageMocker = null;

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
    testEnvironmentArranger.InitializeEnvironment();
    chromeStorageMocker = new ChromeStorageMocker();
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

    expect(document.body.outerHTML.match(/class="modal"/g).length).toBe(1);

})

it('test show all tagged users', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();
    chromeStorageMocker.MockGetter({ [StorageKeys.TaggedUsersDetails]: 'testtaggeduser;red;testtext' });

    userTagger.applyTagging();
    taggerModalUpdater.activateModal('testuser');
    let showTaggedUsersElement = elementFinder.getTaggerModalShowUsersElement();
    showTaggedUsersElement.click();

    let taggerModal = elementFinder.getTaggerModalElement();
    expect(taggerModal.outerHTML.indexOf('testtaggeduser')).not.toBe(-1);
})

it('test show all tagged users clicked twice', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();
    chromeStorageMocker.MockGetter({ [StorageKeys.TaggedUsersDetails]: 'testtaggeduser;red;testtext' });

    userTagger.applyTagging();
    taggerModalUpdater.activateModal('testuser');
    let showTaggedUsersElement = elementFinder.getTaggerModalShowUsersElement();
    showTaggedUsersElement.click();
    showTaggedUsersElement.click();

    let taggerModal = elementFinder.getTaggerModalElement();
    expect(taggerModal.outerHTML.match(/testtaggeduser/g).length).toBe(1);
})

it('test click untag user element', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();
    chromeStorageMocker.MockGetter({ [StorageKeys.TaggedUsersDetails]: 'testtaggeduser;red;testtext' });

    userTagger.applyTagging();
    taggerModalUpdater.activateModal('testuser');
    let showTaggedUsersElement = elementFinder.getTaggerModalShowUsersElement();
    showTaggedUsersElement.click();
    let deleteUserElement = elementFinder.getTaggerModalDeleteUserElements()[0];
    deleteUserElement.click();

    expect(chromeStorageMocker.chromeMock.storage.sync.set.mock.calls[0][0][StorageKeys.TaggedUsersDetails]).toBe("");
})

it('test when empty string returned from chrome storage', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();
    chromeStorageMocker.MockGetter({ [StorageKeys.TaggedUsersDetails]: '' });

    userTagger.applyTagging();
    taggerModalUpdater.activateModal('testuser');
    let showTaggedUsersElement = elementFinder.getTaggerModalShowUsersElement();
    showTaggedUsersElement.click();

    let taggerModal = elementFinder.getTaggerModalElement();
    expect(taggerModal.outerHTML.match(/user-list-entry/g)).toBe(null);
})