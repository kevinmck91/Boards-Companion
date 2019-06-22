import { TaggedUsersUpdater } from "../src/TaggedUsersUpdater.js";
import { ChromeStorageMocker } from "./ChromeStorageMocker.js";

let taggedUsersUpdater = new TaggedUsersUpdater();
let chromeStorageMocker = null;

beforeEach(() => {
    chromeStorageMocker = new ChromeStorageMocker();
});

it('test add new user', () => {
    chromeStorageMocker.MockGetter(undefined);

    taggedUsersUpdater.addUser('testuser', 'red');

    expect(chromeStorageMocker.chromeMock.storage.sync.set.mock.calls[0][0].taggedUsers).toBe("testuser;red");
})

it('test add new user with existing users', () => {
    chromeStorageMocker.MockGetter({ "taggedUsers": "existinguser;red" });

    taggedUsersUpdater.addUser("testuser", 'green');

    expect(chromeStorageMocker.chromeMock.storage.sync.set.mock.calls[0][0].taggedUsers).toBe("existinguser;red;testuser;green");
})
