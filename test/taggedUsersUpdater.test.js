import { TaggedUsersUpdater } from "../src/TaggedUsersUpdater.js";
import { ChromeStorageMocker } from "./ChromeStorageMocker.js";
import { StorageKeys } from "../src/ApplicationStorageKeys.js";

let taggedUsersUpdater = new TaggedUsersUpdater();
let chromeStorageMocker = null;

beforeEach(() => {
    chromeStorageMocker = new ChromeStorageMocker();
});

it('test tag user', () => {
    chromeStorageMocker.MockGetter(undefined);

    taggedUsersUpdater.tagUser({ username: 'testuser', colour: 'red', text: 'testtext', userId: '123456' });

    expect(chromeStorageMocker.chromeMock.storage.sync.set.mock.calls[0][0]['123456.' + StorageKeys.TagDetails]).toEqual({ username: 'testuser', colour: 'red', text: 'testtext', userId: '123456' });
})


it('test untag user', () => {
    chromeStorageMocker.MockGetter({ [StorageKeys.TagDetails]: "existinguser;red;testtext1;testuser;green;testtext2" });

    taggedUsersUpdater.unTagUser("existinguser");

    expect(chromeStorageMocker.chromeMock.storage.sync.set.mock.calls[0][0][StorageKeys.TagDetails]).toBe("testuser;green;testtext2");
})

it('test untag last user', () => {
    chromeStorageMocker.MockGetter({ [StorageKeys.TagDetails]: "existinguser;red;testtext1;testuser;green;testtext2" });

    taggedUsersUpdater.unTagUser("testuser");

    expect(chromeStorageMocker.chromeMock.storage.sync.set.mock.calls[0][0][StorageKeys.TagDetails]).toBe("existinguser;red;testtext1");
})
