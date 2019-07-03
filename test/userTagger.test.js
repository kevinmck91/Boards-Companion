import { TestThreadPageBuilder } from "./TestThreadPageBuilder.js";
import { UserTagger } from "../src/UserTagger.js";
import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { TestEnvironmentArranger } from "./TestEnvironmentArranger.js";
import { ElementFinder } from "../src/ElementFinder.js";
import { ChromeStorageMocker } from "./ChromeStorageMocker.js";
import { StorageKeys } from "../src/ApplicationStorageKeys.js";
import { ModalDetailsFinder } from "../src/ModalDetailsFinder.js";

let userTagger = new UserTagger();
let testThreadPageBuilder = null;
let testHtmlGenerator = new TestHtmlGenerator();
let testEnvironmentArranger = new TestEnvironmentArranger();
let elementFinder = new ElementFinder();
let modalDetailsFinder = new ModalDetailsFinder();
let chromeStorageMocker = null;

beforeAll(() => {
    testEnvironmentArranger.InitializeEnvironment();
});

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
    chromeStorageMocker = new ChromeStorageMocker();
})

it('only apply tagging to candidate posts', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(2, 2).buildPage();
    chromeStorageMocker.MockGetter({ [StorageKeys.TaggedUsersDetails]: "testusername;green;testtext" })

    let candidateDocument = testHtmlGenerator.convertToDocument(testThreadPageBuilder.specificPage(1, 2).buildPage());
    let candidatePosts = elementFinder.getPostsFromDocument(candidateDocument);
    userTagger.applyTaggingToPosts(candidatePosts);

    expect(elementFinder.getAllPosts()[0].innerHTML.indexOf("testtext")).toBe(-1);
})

it('test user id within modal user details', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(1, 2).buildPage();

    userTagger.applyTagging();
    let tagIcon = elementFinder.getAllTagIconElements()[0];
    tagIcon.click();

    let modalUserDetails = modalDetailsFinder.getUserDetails();
    expect(modalUserDetails.userId).toBe('1234');
})