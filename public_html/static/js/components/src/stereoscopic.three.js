import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * @param {Number} dimension
 * @param {Number} size
 * @param {String} texturePath
 * @returns {THREE.Mesh}
 */
function createGeometry(dimension, size, texturePath) {
    let geometry, material;
    switch (dimension) {
        case 0: geometry = new THREE.SphereGeometry(size, 32, 32); break;
        case 1: geometry = new THREE.CylinderGeometry(size, size, size * 2, 32); break;
        case 2: geometry = new THREE.TorusGeometry(size, size / 4, 16, 100); break;
        case 3: geometry = new THREE.TetrahedronGeometry(size); break; //
        case 38: geometry = new THREE.OctahedronGeometry(size); break;
        case 320: geometry = new THREE.IcosahedronGeometry(size); break;
        case 4: geometry = new THREE.BoxGeometry(size, size, size); break;
        case 5: geometry = new THREE.DodecahedronGeometry(size); break;
        default: throw new Error(`Unsupported dimension: ${dimension}`);
    }

    if (texturePath.length) {
        const texture = new THREE.TextureLoader().load(texturePath);
        material = new THREE.MeshBasicMaterial({ map: texture });
    } else material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    return mesh;
}

/**
 * @param {HTMLCanvasElement} canvasContainer 
 * @param {Number} dimension 
 * @param {Number} size 
 * @param {String} backGroundColor 
 * @param {String} texturePath 
 * @returns {Promise<Object>}
 */
export function initScene(canvasContainer, dimension, size, backGroundColor, texturePath) {
    return new Promise((resolve) => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(backGroundColor);

        const camera = new THREE.PerspectiveCamera(75, canvasContainer.width / canvasContainer.height, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ canvas: canvasContainer, antialias: true });
        renderer.setSize(canvasContainer.width, canvasContainer.height);

        const geometry = createGeometry(dimension, size, texturePath);
        scene.add(geometry);

        const light = new THREE.PointLight(0xffffff, 1);
        light.position.set(10, 10, 10);
        scene.add(light);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.autoRotate = false;

        resolve({ scene, camera, renderer, geometry, controls });
    });
}

/**
 * @param {THREE.WebGLRenderer} renderer 
 * @param {THREE.Scene} scene 
 * @param {THREE.Camera} camera 
 * @param {THREE.Mesh} geometry 
 * @param {OrbitControls} controls 
 * @returns {Object}
 */
export function animateScene(renderer, scene, camera, geometry, controls) {
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
