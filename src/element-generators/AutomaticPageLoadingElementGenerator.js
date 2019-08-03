export { AutomaticPageLoadingElementGenerator }

class AutomaticPageLoadingElementGenerator {

    generateLoadingElement() {
        let loadingElement = document.createElement('div');
        loadingElement.className = "loading";
        loadingElement.innerText = "loading...";
        loadingElement.style.textAlign = "center";
        loadingElement.style.paddingBottom = "4px";
        return loadingElement;
    }

    generateBottomPageNoElement(pageNo) {
        let pageNoElement = document.createElement('div');
        pageNoElement.innerHTML = "page " + pageNo;
        pageNoElement.style.textAlign = "center";
        pageNoElement.style.paddingBottom = "5px";
        pageNoElement.style.paddingTop = "12px";
        pageNoElement.className = 'page-number';
        return pageNoElement;
    }

    generateForumTopPageNoElement(pageNo) {
        let pageNoElement = this.generateThreadTopPageNoElement(pageNo);
        pageNoElement.style.paddingTop = "4px";
        pageNoElement.className = 'page-number';
        return pageNoElement;
    }

    generateThreadTopPageNoElement(pageNo) {
        let pageNoElement = document.createElement('div');
        pageNoElement.innerHTML = "page " + pageNo;
        pageNoElement.style.textAlign = "center";
        pageNoElement.style.paddingBottom = "20px";
        pageNoElement.className = 'page-number';
        return pageNoElement;
    }
}