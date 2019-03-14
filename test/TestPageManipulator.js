export { TestPageManipulator };

class TestPageManipulator {
    
    loadThreadUrl() {
        window.history.pushState({}, 'Title', '/vbulletin/showthread.php?t=1111');;
    }

    loadNonThreadUrl() {
        window.history.pushState({}, 'Title', 'vbulletin/forumdisplay.php?f=111');;
    }

    triggerScrollEvent() {
        dispatchEvent(new Event("scroll"));
    }

    setScrollPosition(yCoordinate) {
        return Object.defineProperty(window, 'scrollY', { value: yCoordinate, writable: true });
    }
}