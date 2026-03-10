import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ['menu', 'button'];

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

        this.isOpen() ? this.close() : this.open();
    }

    open() {
        if (this.hasMenuTarget) {
            this.menuTarget.hidden = false;
            this.menuTarget.classList.add('is-open');
        }

        if (this.hasButtonTarget) {
            this.buttonTarget.setAttribute('aria-expanded', 'true');
        }

        this.element.setAttribute('data-state', 'open');
    }

    close() {
        if (this.hasMenuTarget) {
            this.menuTarget.hidden = true;
            this.menuTarget.classList.remove('is-open');
        }

        if (this.hasButtonTarget) {
            this.buttonTarget.setAttribute('aria-expanded', 'false');
        }

        this.element.setAttribute('data-state', 'closed');
    }

    isOpen() {
        return this.element.getAttribute('data-state') === 'open';
    }

    handleClickOutside(event) {
        if (this.element.contains(event.target)) {
            return;
        }

        this.close();
    }
}
