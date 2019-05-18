export { ChromeStorageMocker };
class ChromeStorageMocker {
    MockReturnValue(mockValue) {
        const get = jest.fn().mockImplementation((settingIdentfier, functionality) => { functionality({ settingIdentfier: mockValue }); });
        const set = jest.fn();
        global.chrome = {
            storage: {
                sync: {
                    set,
                    get
                }
            }
        }
    }
}