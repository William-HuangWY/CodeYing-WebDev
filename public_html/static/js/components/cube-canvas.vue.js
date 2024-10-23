import { initScene, animateScene } from './src/cube.three.js';
export const cubeCanvas = {
    props: {
        texturePath: { type: String, required: false, default: '' },
        canvasWidth: { type: Number, required: false, default: 120 },
        canvasHeight: { type: Number, required: false, default: 120 },
        backgroundColor: { type: Number, required: false, default: 0x070707 },
        cubeSize: { type: Number, required: false, default: 3 },
    },
    data() {
        return {
            className: 'cube-canvas',
            animation: null,
        };
    },
    mounted() {
        const canvasElement = this.$refs.canvas;
        canvasElement.width = this.canvasWidth;
        canvasElement.height = this.canvasHeight;

        initScene(canvasElement, this.cubeSize, this.backgroundColor, this.texturePath).then(({ scene, camera, renderer, cube, controls }) => {
            this.animation = animateScene(renderer, scene, camera, cube, controls);
        });
    },
    beforeUnmount() {
        if (this.animation) {
            this.animation.stop();
        }
    },
    template: `
    <canvas ref="canvas" style="margin:0; z-index: 0;"></canvas>
    `,
};