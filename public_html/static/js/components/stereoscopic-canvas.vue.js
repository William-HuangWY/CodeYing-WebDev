import { initScene, animateScene } from './src/stereoscopic.three.js';
export const stereoscopicCanvas = {
    props: {
        dimension: { type: Number, required: false, default: 320 },
        geometrySize: { type: Number, required: false, default: 3 },
        texturePath: { type: String, required: false, default: '' },
        canvasWidth: { type: Number, required: false, default: 120 },
        canvasHeight: { type: Number, required: false, default: 120 },
        backgroundColor: { type: Number, required: false, default: 0x070707 },
    },
    data() {
        return {
            className: 'stereoscopic-canvas',
            animation: null,
        };
    },
    mounted() {
        const canvasElement = this.$refs.canvas;
        canvasElement.width = this.canvasWidth;
        canvasElement.height = this.canvasHeight;

        initScene(canvasElement, this.dimension, this.geometrySize, this.backgroundColor, this.texturePath).then(({ scene, camera, renderer, geometry, controls }) => {
            this.animation = animateScene(renderer, scene, camera, geometry, controls);
        });
    },
    beforeUnmount() {
        if (this.animation) {
            this.animation.stop();
        }
    },
    template: `
    <canvas ref="canvas" style="margin:0; z-index: 0;" :class="className"></canvas>
    `,
};