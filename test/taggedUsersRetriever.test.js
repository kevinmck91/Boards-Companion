import { ChromeStorageMocker } from "./ChromeStorageMocker.js";
import { TaggedUsersRetriever } from "../src/TaggedUsersRetriever.js";

let taggedUsersRetriever = new TaggedUsersRetriever();
let chromeStorageMocker = null;

beforeEach(() => {
    chromeStorageMocker = new ChromeStorageMocker();
});

it('test get tagged user name', () => {
    chromeStorageMocker.MockGetter({ "taggedUsers": "existinguser;red;testuser;green" })

    taggedUsersRetriever.getTaggedUsersDetails((users) => {
        expect(users[1].username).toBe("testuser");
    });
})

it('test getting tagged users when no users tagged', () => {
    chromeStorageMocker.MockGetter(undefined)

    taggedUsersRetriever.getTaggedUsersDetails((users) => {
        expect(users[1]).toBe("testuser");
    })

})