export { TaggerModalElementFinder }

class TaggerModalElementFinder {

    getTaggerModalElement() {
        return document.querySelector('.modal-container');
    }

    getTaggerModalUsernameElement() {
        return this.getTaggerModalElement().querySelector('#username');
    }

    getTaggerModalUserIdElement() {
        return this.getTaggerModalElement().querySelector('#user-id');
    }

    getTaggerModalTitleElement() {
        return this.getTaggerModalElement().querySelector('h2');
    }

    getTaggerModalSubmitButton() {
        return this.getTaggerModalElement().querySelector('[type="submit"][value="save"]');
    }

    getTaggerModalCancelButton() {
        return this.getTaggerModalElement().querySelector('#close-modal');
    }

    getTaggerModalShowUsersElement() {
        return this.getTaggerModalElement().querySelector('#show-tagged-users');
    }

    getTaggerModalUserListElement() {
        return this.getTaggerModalElement().querySelector('#user-list');
    }

    getTaggerModalDeleteUserElements() {
        return this.getTaggerModalElement().querySelectorAll('.delete-user-entry');
    }
}