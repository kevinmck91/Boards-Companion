import { ChromeStorageMocker } from "./ChromeStorageMocker.js";
import { TaggedUsersRetriever } from "../src/TaggedUsersRetriever.js";

let taggedUsersRetriever = new TaggedUsersRetriever();
let chromeStorageMocker = null;

beforeEach(() => {
    chromeStorageMocker = new ChromeStorageMocker();
});

it('test get tagged users', () => {
    chromeStorageMocker.MockGetter({ "taggedUsers": "existinguser;testuser" })

    taggedUsersRetriever.getTaggedUsers((users) => {
        expect(users[1]).toBe("testuser");
    });
})

it('test getting tagged users when no users tagged', () => {
    chromeStorageMocker.MockGetter(undefined)

    taggedUsersRetriever.getTaggedUsers((users) => {
        expect(users[1]).toBe("testuser");
    })

})