import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ['menu', 'button'];

    connect() {
        this.close();
        this.handleResize = this.handleResize.bind(this);
        window.addEventListener('resize', this.handleResize);
    }

    disconnect() {
        window.removeEventListener('resize', this.handleResize);
    }

    toggle(event) {
        event.preventDefault();

        if (this.isOpen()) {
            this.close();
            return;
        }

        this.open();
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
        return this.hasMenuTarget && this.menuTarget.classList.contains('is-open');
    }

    handleResize() {
        if (window.innerWidth >= 992) {
            if (this.hasMenuTarget) {
                this.menuTarget.hidden = false;
                this.menuTarget.classList.remove('is-open');
            }

            if (this.hasButtonTarget) {
                this.buttonTarget.setAttribute('aria-expanded', 'false');
            }

            this.element.setAttribute('data-state', 'desktop');
            return;
        }

        if (this.element.getAttribute('data-state') !== 'open') {
            this.close();
        }
    }
}