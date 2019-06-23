import { TaggedUsersUpdater } from "../src/TaggedUsersUpdater.js";
import { ChromeStorageMocker } from "./ChromeStorageMocker.js";
import { StorageKeys } from "../src/ApplicationStorageKeys.js";

let taggedUsersUpdater = new TaggedUsersUpdater();
let chromeStorageMocker = null;

beforeEach(() => {
    chromeStorageMocker = new ChromeStorageMocker();
});

it('test add new user', () => {
    chromeStorageMocker.MockGetter(undefined);

    taggedUsersUpdater.addUser({ username: 'testuser', colour: 'red', text: 'testtext' });

    expect(chromeStorageMocker.chromeMock.storage.sync.set.mock.calls[0][0][StorageKeys.TaggedUsersDetails]).toBe("testuser;red;testtext");
})

it('test add new user with existing users', () => {
    chromeStorageMocker.MockGetter({ [StorageKeys.TaggedUsersDetails]: "existinguser;red" });

    taggedUsersUpdater.addUser({ username: "testuser", colour: 'green', text: 'testtext' });

    expect(chromeStorageMocker.chromeMock.storage.sync.set.mock.calls[0][0][StorageKeys.TaggedUsersDetails]).toBe("existinguser;red;testuser;green;testtext");
})
