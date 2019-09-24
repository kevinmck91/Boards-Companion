import { TaggedUsersUpdater } from "../../../src/user-tagging/TaggedUsersUpdater.js";
import { ChromeStorageMocker } from "../test-environment/ChromeStorageMocker.js";
import { StorageKeyGenerator } from "../../../src/storage/StorageKeyGenerator.js";

let taggedUsersUpdater = new TaggedUsersUpdater();
let chromeStorageMocker = null;
let storageKeyGenerator = new StorageKeyGenerator();

beforeEach(() => {
    chromeStorageMocker = new ChromeStorageMocker();
});

it('test tag user', () => {
    chromeStorageMocker.MockGetter(undefined);

    taggedUsersUpdater.tagUser({ username: 'testuser', colour: 'red', text: 'testtext', userId: '123456' });

    expect(chromeStorageMocker.chromeMock.storage.sync.set.mock.calls[0][0][storageKeyGenerator.generateTagDetailKey('123456')]).toEqual({ username: 'testuser', colour: 'red', text: 'testtext', userId: '123456' });
})

it('test untag user', () => {
    chromeStorageMocker.MockGetter(
        {
            [storageKeyGenerator.generateTagDetailKey('123456')]:
            {
                username: 'existinguser', colour: 'red', text: 'testtext1', userId: '123456'
            },
            [storageKeyGenerator.generateTagDetailKey('78910')]:
            {
                username: 'testuser', colour: 'green', text: 'testtext2', userId: '78910'
            }
        });

    taggedUsersUpdater.unTagUser('78910');

    expect(chromeStorageMocker.chromeMock.storage.sync.remove.mock.calls[0][0]).toBe(storageKeyGenerator.generateTagDetailKey('78910'));
})
