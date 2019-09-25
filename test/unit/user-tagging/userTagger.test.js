import { TestThreadPageBuilder } from "../test-environment/html-builders/TestThreadPageBuilder.js";
import { UserTagger } from "../../../src/user-tagging/UserTagger.js";
import { TestEnvironmentArranger } from "../test-environment/TestEnvironmentArranger.js";
import { ElementFinder } from "../../../src/finders/ElementFinder.js";
import { AvatarDetailsFinder } from "../../../src/finders/AvatarDetailsFinder.js";
import { ChromeStorageMocker } from "../test-environment/ChromeStorageMocker.js";
import { TaggerModalDetailsFinder } from "../../../src/finders/TaggerModalDetailsFinder.js";
import { GenericElementGenerator } from "../../../src/element-generators/GenericElementGenerator.js";
import { StorageKeyGenerator } from "../../../src/storage/StorageKeyGenerator.js";

let userTagger = new UserTagger();
let testThreadPageBuilder = null;
let testEnvironmentArranger = new TestEnvironmentArranger();
let elementFinder = new ElementFinder();
let avatarDetailsFinder = new AvatarDetailsFinder();
let taggerModalDetailsFinder = new TaggerModalDetailsFinder();
let chromeStorageMocker = null;
let genericElementGenerator = new GenericElementGenerator();
let storageKeyGenerator = new StorageKeyGenerator();

beforeAll(() => {
    testEnvironmentArranger.InitializeEnvironment();
});

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
    chromeStorageMocker = new ChromeStorageMocker();
})

it('only apply tagging to candidate posts', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(2, 2).buildPage();
    chromeStorageMocker.MockGetter({ [storageKeyGenerator.generateTagDetailKey('123456')]: { username: 'testtaggeduser', colour: 'green', text: 'testtext', userId: '123456' } });

    let candidateDocument = genericElementGenerator.generateDocument(testThreadPageBuilder.specificPage(1, 2).buildPage());
    let candidatePosts = elementFinder.getPostsFromDocument(candidateDocument);
    userTagger.applyTaggingToPosts(candidatePosts);

    expect(elementFinder.getFirstPost().innerHTML.indexOf("testtext")).toBe(-1);
})

it('test user id within modal user details', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(1, 2).buildPage();

    userTagger.applyTagging();
    let tagIcon = avatarDetailsFinder.getAllTagIconElements()[0];
    tagIcon.click();

    let modalUserDetails = taggerModalDetailsFinder.getUserDetails();
    expect(modalUserDetails.userId).toBe('1234');
})