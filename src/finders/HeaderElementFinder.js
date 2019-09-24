export { HeaderElementFinder }

class HeaderElementFinder {

    getHeaderElements() {
        let headerElements = [];
        const navigationBar = document.querySelector('.nav-area');
        const searchPanel = document.getElementById('header');
        const breadcrumbs = this.getBreadCrumbs();
        headerElements.push(navigationBar);
        headerElements.push(searchPanel);
        headerElements.push(breadcrumbs);
        return headerElements;
    }

    getBreadCrumbs() {
        return document.getElementById('breadcrumb');
    }
}