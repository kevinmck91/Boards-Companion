export { ForumHomepageElementFinder };

class ForumHomepageElementFinder {

    getForumHomepageThreadContainer() {
        return document.getElementById('inlinemodform');
    }

    getThreadsContainerFromDocument(htmlDocument) {
        return htmlDocument.getElementById("threadslist");
    }

}