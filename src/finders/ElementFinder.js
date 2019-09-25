export { ElementFinder };

class ElementFinder {

    searchForWelcomeNotice() {
        let notice = document.getElementById('notices');
        if (notice != null && notice.outerHTML.includes('here are some tips and tricks to help you get started')) {
            return notice;
        }
        else return null;
    }

    getNotice() {
        return document.getElementById('notices');
    }

    getAllPosts() {
        return Array.from(document.querySelectorAll("[id^='edit']"));
    }

    getFirstPost() {
        return this.getAllPosts()[0];
    }

    getPostsContainerFromDocument(htmlDocument) {
        let regularUserPosts = htmlDocument.querySelector('.left-col');
        let newSignedInUserPosts = htmlDocument.querySelector('#posts');
        if (regularUserPosts == null)
            return newSignedInUserPosts;
        else
            return regularUserPosts;
    }

    getPostsContainer() {
        return this.getPostsContainerFromDocument(document);
    }

    getForumHomepageThreadContainer() {
        return document.getElementById('inlinemodform');
    }

    getPostsFromDocument(htmlDocument) {
        let regularUserPosts = htmlDocument.querySelectorAll('.left-col > div:not(#lastpost)');
        let newSignedInUserPosts = htmlDocument.querySelectorAll('#posts > div:not(#lastpost)');
        if (regularUserPosts.length == 0)
            return newSignedInUserPosts;
        else
            return regularUserPosts;
    }

    getThreadsContainerFromDocument(htmlDocument) {
        return htmlDocument.getElementById("threadslist");
    }

    getFooterElementFromPost(post) {
        return post.querySelector('tr:nth-child(3)');
    }

    findParentElement(candidateElement, noOfGenerations) {
        for (let i = 1; i <= noOfGenerations; i++) {
            candidateElement = candidateElement.parentElement;
        }
        return candidateElement;
    }

    getElementSiblings(candidateElement) {
        let siblings = [];
        let sibling = candidateElement.parentNode.firstChild;
        while (sibling) {
            if (sibling !== candidateElement) {
                siblings.push(sibling);
            }
            sibling = sibling.nextSibling
        }
        return siblings;
    }

    getLoadingElements() {
        return Array.from(document.querySelectorAll('.loading'));
    }

    getUserPosts(username) {
        let allPosts = this.getAllPosts();
        return this.getUserPostsFromPosts(username, allPosts);
    }

    getUserPostsFromPosts(username, posts) {
        let usernamePosts = [];
        for (let post of posts) {
            let postUsername = post.querySelector('.bigusername').textContent;
            if (postUsername == username) {
                usernamePosts.push(post);
            }
        }
        return usernamePosts;
    }

}