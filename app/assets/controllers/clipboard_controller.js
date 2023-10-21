// clipboard_controller.js
import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ["source"]

    copy() {
        const text = this.sourceTarget.textContent
        navigator.clipboard.writeText(text).then(() => {
            alert('Text copied to clipboard')
        })
    }
}