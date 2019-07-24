import { ModalDetailsFinder } from "../../src/finders/ModalDetailsFinder.js";
import { TestThreadPageBuilder } from "../test-environment/page-builders/TestThreadPageBuilder.js";
import { TaggerModalUpdater } from "../../src/user-tagging/TaggerModalUpdater";
import { TestEnvironmentArranger } from "../test-environment/TestEnvironmentArranger.js";
import { UserTagger } from "../../src/user-tagging/UserTagger.js";
import { ElementFinder } from "../../src/finders/ElementFinder.js";
import { ChromeStorageMocker } from "../test-environment/ChromeStorageMocker.js";
import { StorageKeys } from "../../src/storage/ApplicationStorageKeys.js";

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
    chromeStorageMocker.MockGetter({ [StorageKeys.generateTagDetailKey('123456')]: { username: 'testtaggeduser', colour: 'red', text: 'testtext', userId: '123456' } });

    userTagger.applyTagging();
    taggerModalUpdater.activateModal('testuser', '123456');
    let showTaggedUsersElement = elementFinder.getTaggerModalShowUsersElement();
    showTaggedUsersElement.click();

    let taggerModal = elementFinder.getTaggerModalElement();
    expect(taggerModal.outerHTML.indexOf('testtaggeduser')).not.toBe(-1);
})

it('test show all tagged users clicked twice', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();
    chromeStorageMocker.MockGetter({ [StorageKeys.generateTagDetailKey('123456')]: { username: 'testtaggeduser', colour: 'red', text: 'testtext', userId: '123456' } });

    userTagger.applyTagging();
    taggerModalUpdater.activateModal('testuser', '123456');
    let showTaggedUsersElement = elementFinder.getTaggerModalShowUsersElement();
    showTaggedUsersElement.click();
    showTaggedUsersElement.click();

    let taggerModal = elementFinder.getTaggerModalElement();
    expect(taggerModal.outerHTML.match(/testtaggeduser/g).length).toBe(1);
})

it('test click untag user element', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();
    chromeStorageMocker.MockGetter({ [StorageKeys.generateTagDetailKey('123456')]: { username: 'testtaggeduser', colour: 'red', text: 'testtext', userId: '123456' } });

    userTagger.applyTagging();
    taggerModalUpdater.activateModal('testuser', '123456');
    let showTaggedUsersElement = elementFinder.getTaggerModalShowUsersElement();
    showTaggedUsersElement.click();
    let deleteUserElement = elementFinder.getTaggerModalDeleteUserElements()[0];
    deleteUserElement.click();

    expect(chromeStorageMocker.chromeMock.storage.sync.remove.mock.calls[0][0]).toBe(StorageKeys.generateTagDetailKey('123456'));
})

it('test when empty object returned from chrome storage', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();
    chromeStorageMocker.MockGetter({});

    userTagger.applyTagging();
    taggerModalUpdater.activateModal('testuser', '123456');
    let showTaggedUsersElement = elementFinder.getTaggerModalShowUsersElement();
    showTaggedUsersElement.click();

    let taggerModal = elementFinder.getTaggerModalElement();
    expect(taggerModal.outerHTML.match(/user-list-entry/g)).toBe(null);
})