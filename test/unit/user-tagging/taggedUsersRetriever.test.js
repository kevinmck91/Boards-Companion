import { ChromeStorageMocker } from "../test-environment/ChromeStorageMocker.js";
import { TaggedUsersRetriever } from "../../../src/user-tagging/TaggedUsersRetriever.js";
import { StorageKeyGenerator } from "../../../src/storage/StorageKeyGenerator.js";

let taggedUsersRetriever = new TaggedUsersRetriever();
let chromeStorageMocker = null;
let storageKeyGenerator = new StorageKeyGenerator();

beforeEach(() => {
    chromeStorageMocker = new ChromeStorageMocker();
});

it('test get tagged user name', done => {
    chromeStorageMocker.MockGetter({ [storageKeyGenerator.generateTagDetailKey('123456')]: { username: 'existinguser', colour: 'red', text: 'testtext', userId: '123456' } });

    taggedUsersRetriever.getTaggedUser('123456', (taggedUserDetail) => {
        expect(taggedUserDetail.username).toBe('existinguser');
        done();
    });
})

it('test getting tagged users when no users tagged', () => {
    chromeStorageMocker.MockGetter(undefined)

    taggedUsersRetriever.getTaggedUsers((userDetailsList) => {
        expect(userDetailsList[1]).toBe("testuser");
    })

})

it('test get tagged user text', () => {
    chromeStorageMocker.MockGetter(
        {
            [storageKeyGenerator.generateTagDetailKey('123456')]:
            {
                username: 'existinguser', colour: 'green', text: 'testtext1', userId: '123456'
            },
            [storageKeyGenerator.generateTagDetailKey('78910')]:
            {
                username: 'existinguser2', colour: 'green', text: 'testtext2', userId: '123456'
            }
        });

    taggedUsersRetriever.getTaggedUsers((taggedUserDetailList) => {
        expect(taggedUserDetailList[1].text).toBe("testtext2");
    });
})