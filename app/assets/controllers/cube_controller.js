import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ["cubeElement"];

    connect() {
        this.isMoving = false; // Add this flag
        this.startX = 0;
        this.startY = 0;
        this.startRotationX = 0;
        this.startRotationY = 0;

        // Mouse events
        this.cubeElementTarget.addEventListener('mousedown', this.onMouseDown);

        // Touch events
        this.cubeElementTarget.addEventListener('touchstart', this.onTouchStart);
    }

    onMouseDown = (event) => {
        this.isMoving = true; // Set the flag to true
        this.initializeStartValues(event.clientX, event.clientY);
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    onTouchStart = (event) => {
        this.isMoving = true; // Set the flag to true
        this.initializeStartValues(event.touches[0].clientX, event.touches[0].clientY);
        document.addEventListener('touchmove', this.onTouchMove);
        document.addEventListener('touchend', this.onTouchEnd);
    }

    initializeStartValues(clientX, clientY) {
        this.startX = clientX;
        this.startY = clientY;

        let styles = window.getComputedStyle(this.cubeElementTarget);
        let matrix = new WebKitCSSMatrix(styles.transform);

        this.startRotationX = Math.atan2(matrix.m23, matrix.m22);
        this.startRotationY = Math.atan2(-matrix.m13, matrix.m11);
    }

    onMouseMove = (event) => {
        if (this.isMoving) {
            event.preventDefault();
            this.rotateCube(event.clientX, event.clientY);
        }
    }

    onTouchMove = (event) => {
        if (this.isMoving) {
            event.preventDefault();
            this.rotateCube(event.touches[0].clientX, event.touches[0].clientY);
        }
    }

    rotateCube(clientX, clientY) {
        let deltaX = clientX - this.startX;
        let deltaY = clientY - this.startY;

        let angleX = this.startRotationX - deltaY * 0.003;
        let angleY = this.startRotationY + deltaX * 0.003;

        this.cubeElementTarget.style.transform = `rotateX(${angleX}rad) rotateY(${angleY}rad)`;
    }

    onMouseUp = () => {
        this.isMoving = false; // Reset the flag
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }

    onTouchEnd = () => {
        this.isMoving = false; // Reset the flag
        document.removeEventListener('touchmove', this.onTouchMove);
        document.removeEventListener('touchend', this.onTouchEnd);
    }
}
