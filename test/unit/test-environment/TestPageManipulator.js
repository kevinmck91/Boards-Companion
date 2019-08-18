export { TestPageManipulator };

class TestPageManipulator {

    loadThreadUrl() {
        window.history.pushState({}, 'Title', '/vbulletin/showthread.php?t=1111');
    }

    loadNthThreadUrl(pageNo) {
        window.history.pushState({}, 'Title', '/vbulletin/showthread.php?t=1111&page=' + pageNo);
    }

    loadForumPageUrl() {
        window.history.pushState({}, 'Title', '/vbulletin/forumdisplay.php?f=1111');
    }

    loadNonAutoscrollPage() {
        window.history.pushState({}, 'Title', '/vbulletin/privat.php');
    }

    triggerScrollEvent() {
        dispatchEvent(new Event("scroll"));
    }

    setScrollPosition(yCoordinate) {
        return Object.defineProperty(window, 'scrollY', { value: yCoordinate, writable: true });
    }
}