import { TestThreadPageBuilder } from "../test-environment/html-builders/TestThreadPageBuilder.js";
import { UserTagger } from "../../src/user-tagging/UserTagger.js";
import { TestEnvironmentArranger } from "../test-environment/TestEnvironmentArranger.js";
import { ElementFinder } from "../../src/finders/ElementFinder.js";
import { ChromeStorageMocker } from "../test-environment/ChromeStorageMocker.js";
import { StorageKeys } from "../../src/storage/ApplicationStorageKeys.js";
import { ModalDetailsFinder } from "../../src/finders/ModalDetailsFinder.js";
import { GenericElementGenerator } from "../../src/element-generators/GenericElementGenerator.js";

let userTagger = new UserTagger();
let testThreadPageBuilder = null;
let testEnvironmentArranger = new TestEnvironmentArranger();
let elementFinder = new ElementFinder();
let modalDetailsFinder = new ModalDetailsFinder();
let chromeStorageMocker = null;
let genericElementGenerator = new GenericElementGenerator();

beforeAll(() => {
    testEnvironmentArranger.InitializeEnvironment();
});

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
    chromeStorageMocker = new ChromeStorageMocker();
})

it('only apply tagging to candidate posts', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(2, 2).buildPage();
    chromeStorageMocker.MockGetter({ [StorageKeys.generateTagDetailKey('123456')]: { username: 'testtaggeduser', colour: 'green', text: 'testtext', userId: '123456' } });

    let candidateDocument = genericElementGenerator.generateDocument(testThreadPageBuilder.specificPage(1, 2).buildPage());
    let candidatePosts = elementFinder.getPostsFromDocument(candidateDocument);
    userTagger.applyTaggingToPosts(candidatePosts);

    expect(elementFinder.getFirstPost().innerHTML.indexOf("testtext")).toBe(-1);
})

it('test user id within modal user details', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(1, 2).buildPage();

    userTagger.applyTagging();
    let tagIcon = elementFinder.getAllTagIconElements()[0];
    tagIcon.click();

    let modalUserDetails = modalDetailsFinder.getUserDetails();
    expect(modalUserDetails.userId).toBe('1234');
})