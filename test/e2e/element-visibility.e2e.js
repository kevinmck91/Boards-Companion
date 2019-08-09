import { Selector } from 'testcafe';

fixture`Element visibility`
    .page`https://www.boards.ie/vbulletin/showthread.php?t=2057983013`;

test('Test registered user element hidden', async t => {
    await t
        .expect(Selector("div.smallfont").withText("Registered User").visible).notOk();
});