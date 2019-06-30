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

    taggedUsersUpdater.tagUser({ username: 'testuser', colour: 'red', text: 'testtext' });

    expect(chromeStorageMocker.chromeMock.storage.sync.set.mock.calls[0][0][StorageKeys.TaggedUsersDetails]).toBe("testuser;red;testtext");
})

it('test add new user with existing users', () => {
    chromeStorageMocker.MockGetter({ [StorageKeys.TaggedUsersDetails]: "existinguser;red;testtext1" });

    taggedUsersUpdater.tagUser({ username: "testuser", colour: 'green', text: 'testtext2' });

    expect(chromeStorageMocker.chromeMock.storage.sync.set.mock.calls[0][0][StorageKeys.TaggedUsersDetails]).toBe("existinguser;red;testtext1;testuser;green;testtext2");
})

it('test untag user', () => {
    chromeStorageMocker.MockGetter({ [StorageKeys.TaggedUsersDetails]: "existinguser;red;testtext1;testuser;green;testtext2" });

    taggedUsersUpdater.unTagUser("existinguser");

    expect(chromeStorageMocker.chromeMock.storage.sync.set.mock.calls[0][0][StorageKeys.TaggedUsersDetails]).toBe("testuser;green;testtext2");
})

it('test untag last user', () => {
    chromeStorageMocker.MockGetter({ [StorageKeys.TaggedUsersDetails]: "existinguser;red;testtext1;testuser;green;testtext2" });

    taggedUsersUpdater.unTagUser("testuser");

    expect(chromeStorageMocker.chromeMock.storage.sync.set.mock.calls[0][0][StorageKeys.TaggedUsersDetails]).toBe("existinguser;red;testtext1");
})

it('tag user when empty string returned from chrome storage', () => {
    chromeStorageMocker.MockGetter({ [StorageKeys.TaggedUsersDetails]: "" });

    taggedUsersUpdater.tagUser({ username: 'testuser', colour: 'red', text: 'testtext' })

    expect(chromeStorageMocker.chromeMock.storage.sync.set.mock.calls[0][0][StorageKeys.TaggedUsersDetails]).toBe("testuser;red;testtext");
})