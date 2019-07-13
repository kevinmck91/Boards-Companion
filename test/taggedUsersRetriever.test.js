import { ChromeStorageMocker } from "./ChromeStorageMocker.js";
import { TaggedUsersRetriever } from "../src/TaggedUsersRetriever.js";
import { StorageKeys } from "../src/ApplicationStorageKeys.js";

let taggedUsersRetriever = new TaggedUsersRetriever();
let chromeStorageMocker = null;

beforeEach(() => {
    chromeStorageMocker = new ChromeStorageMocker();
});

it('test get tagged user name', () => {
    chromeStorageMocker.MockGetter({ [StorageKeys.TagDetails]: "existinguser;red;testtext;testuser;green;testtext" })

    taggedUsersRetriever.getTaggedUsers((userDetailsList) => {
        expect(userDetailsList[1].username).toBe("testuser");
    });
})

it('test getting tagged users when no users tagged', () => {
    chromeStorageMocker.MockGetter(undefined)

    taggedUsersRetriever.getTaggedUsers((userDetailsList) => {
        expect(userDetailsList[1]).toBe("testuser");
    })

})

it('test get tagged user text', () => {
    chromeStorageMocker.MockGetter({ [StorageKeys.TagDetails]: "existinguser;red;testtext1;testuser;green;testtext2" })

    taggedUsersRetriever.getTaggedUsers((userDetailsList) => {
        expect(userDetailsList[1].text).toBe("testtext2");
    });
})