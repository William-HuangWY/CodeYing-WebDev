import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * @param {String} texturePath
 * @returns {THREE.Mesh}
 */
function createCubeWithTexture(cubeSize, texturePath) {
    let materials;
    if (texturePath.length) {
        const texture = new THREE.TextureLoader().load(texturePath);
        materials = new THREE.MeshBasicMaterial({ map: texture })
    } else materials = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cube = new THREE.Mesh(geometry, materials);
    cube.position.set(0, 0, 0);
    return cube;
}

/**
 * @param {HTMLCanvasElement} canvasContainer
 * @param {String} texturePath
 * @returns {Promise<Object>}
 */
export function initScene(canvasContainer, cubeSize, backGroundColor, texturePath) {
    return new Promise((resolve) => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(backGroundColor);
        const camera = new THREE.PerspectiveCamera(75, canvasContainer.width / canvasContainer.height, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ canvas: canvasContainer, antialias: true });
        renderer.setSize(canvasContainer.width, canvasContainer.height);

        const cube = createCubeWithTexture(cubeSize, texturePath);
        scene.add(cube);

        const light = new THREE.PointLight(0xffffff, 1);
        light.position.set(10, 10, 10);
        scene.add(light);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.autoRotate = false;

        resolve({ scene, camera, renderer, cube, controls });
    });
}

/**
 * @param {THREE.WebGLRenderer} renderer
 * @param {THREE.Scene} scene
 * @param {THREE.Camera} camera
 * @param {THREE.Mesh} cube
 * @param {OrbitControls} controls
 * @param {Function} resizeHandler
 * @returns {Object}
 */
export function animateScene(renderer, scene, camera, cube, controls) {
    let animationId, isAnimating = true;
    function render() {
        if (!isAnimating) return;
        animationId = requestAnimationFrame(render);
        controls.update();
        renderer.render(scene, camera);
    }
    render();

    return {
        stop: () => { if (isAnimating) isAnimating = false; },
        animationId: animationId,
    };
}
