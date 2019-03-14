export { TestPageManipulator };

class TestPageManipulator {

    loadThreadUrl() {
        window.history.pushState({}, 'Title', '/vbulletin/showthread.php?t=1111');
    }

    loadNthThreadUrl(pageNo) {
        window.history.pushState({}, 'Title', '/vbulletin/showthread.php?t=1111&page=' + pageNo);
    }

    loadNonThreadUrl() {
        window.history.pushState({}, 'Title', 'vbulletin/forumdisplay.php?f=1111');
    }

    triggerScrollEvent() {
        dispatchEvent(new Event("scroll"));
    }

    setScrollPosition(yCoordinate) {
        return Object.defineProperty(window, 'scrollY', { value: yCoordinate, writable: true });
    }
}