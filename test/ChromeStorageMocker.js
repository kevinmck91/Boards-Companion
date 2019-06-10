export { ChromeStorageMocker };
class ChromeStorageMocker {

    constructor() {
        this.chromeMock = {
            storage: {
                sync: {
                    set: jest.fn(),
                    get: jest.fn()
                }
            }
        }
    }

    MockAllValues() {
        global.chrome = this.chromeMock;
    }

    MockGetter(returnValue) {
        this.chromeMock.storage.sync.get = jest.fn().mockImplementation((settingIdentfier, functionality) => { functionality(returnValue); });
        global.chrome = this.chromeMock;
    }
}