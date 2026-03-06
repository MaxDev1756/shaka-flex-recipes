import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ['menu'];

    connect() {
        this.close();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        document.addEventListener('click', this.handleClickOutside);
    }

    disconnect() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    toggle(event) {
        event.preventDefault();
        event.stopPropagation();

        if (this.isOpen()) {
            this.close();
            return;
        }

        this.open();
    }

    open() {
        if (!this.hasMenuTarget) {
            return;
        }

        this.menuTarget.classList.add('is-open');
        this.menuTarget.hidden = false;
        this.element.setAttribute('data-state', 'open');
    }

    close() {
        if (!this.hasMenuTarget) {
            return;
        }

        this.menuTarget.classList.remove('is-open');
        this.menuTarget.hidden = true;
        this.element.setAttribute('data-state', 'closed');
    }

    isOpen() {
        return this.hasMenuTarget && this.menuTarget.classList.contains('is-open');
    }

    handleClickOutside(event) {
        if (this.element.contains(event.target)) {
            return;
        }

        this.close();
    }
}