import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ['overlay', 'dialog'];

    connect() {
        this.handleEscape = this.handleEscape.bind(this);
        document.addEventListener('keydown', this.handleEscape);
        this.close();
    }

    disconnect() {
        document.removeEventListener('keydown', this.handleEscape);
    }

    open(event) {
        if (event) {
            event.preventDefault();
        }

        this.element.classList.add('is-open');
        this.element.hidden = false;
        this.element.setAttribute('data-state', 'open');

        if (this.hasOverlayTarget) {
            this.overlayTarget.hidden = false;
        }

        if (this.hasDialogTarget) {
            this.dialogTarget.hidden = false;
        }

        document.body.classList.add('shaka-modal-open');
    }

    close(event) {
        if (event) {
            event.preventDefault();
        }

        this.element.classList.remove('is-open');
        this.element.hidden = true;
        this.element.setAttribute('data-state', 'closed');

        if (this.hasOverlayTarget) {
            this.overlayTarget.hidden = true;
        }

        if (this.hasDialogTarget) {
            this.dialogTarget.hidden = true;
        }

        document.body.classList.remove('shaka-modal-open');
    }

    closeOnOverlay(event) {
        if (event.target !== event.currentTarget) {
            return;
        }

        this.close();
    }

    handleEscape(event) {
        if (event.key !== 'Escape') {
            return;
        }

        if (this.element.getAttribute('data-state') !== 'open') {
            return;
        }

        this.close();
    }
}