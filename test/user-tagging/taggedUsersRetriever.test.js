import { ChromeStorageMocker } from "../test-environment/ChromeStorageMocker.js";
import { TaggedUsersRetriever } from "../../src/user-tagging/TaggedUsersRetriever.js";
import { StorageKeys } from "../../src/storage/ApplicationStorageKeys.js";

let taggedUsersRetriever = new TaggedUsersRetriever();
let chromeStorageMocker = null;

beforeEach(() => {
    chromeStorageMocker = new ChromeStorageMocker();
});

it('test get tagged user name', done => {
    chromeStorageMocker.MockGetter({ [StorageKeys.generateTagDetailKey('123456')]: { username: 'existinguser', colour: 'red', text: 'testtext', userId: '123456' } });

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
            [StorageKeys.generateTagDetailKey('123456')]:
            {
                username: 'existinguser', colour: 'green', text: 'testtext1', userId: '123456'
            },
            [StorageKeys.generateTagDetailKey('78910')]:
            {
                username: 'existinguser2', colour: 'green', text: 'testtext2', userId: '123456'
            }
        });

    taggedUsersRetriever.getTaggedUsers((taggedUserDetailList) => {
        expect(taggedUserDetailList[1].text).toBe("testtext2");
    });
})