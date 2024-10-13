import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function initModel(canvas, modelPath) {
    return new Promise((resolve, reject) => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(20, 10, 5);

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.shadowMap.enabled = true;

        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1.5);
        scene.add(hemisphereLight);

        const pointLight = new THREE.PointLight(0xffffff, 5);
        pointLight.castShadow = true;
        scene.add(pointLight);

        const spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.position.set(-20, 50, 10);
        spotLight.angle = 0.12;
        spotLight.penumbra = 1;
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 512;
        spotLight.shadow.mapSize.height = 512;
        scene.add(spotLight);

        const loader = new GLTFLoader();
        loader.load(
            modelPath,
            (gltf) => {
                const model = gltf.scene;
                const resizeHandler = () => {
                    let isMobile = window.matchMedia('(max-width: 900px)').matches;
                    model.scale.set(isMobile ? 0.6 : 0.75, isMobile ? 0.6 : 0.75, isMobile ? 0.6 : 0.75);
                    model.position.set(0, isMobile ? -2.5 : -3, isMobile ? -1.8 : -0.8);
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                };
                resizeHandler();
                window.addEventListener('resize', resizeHandler);
                model.rotation.set(-0.01, -0.2, -0.1);
                scene.add(model);

                const controls = new OrbitControls(camera, renderer.domElement);
                controls.enableDamping = true;
                controls.enableZoom = false;
                controls.enablePan = false; //
                controls.maxPolarAngle = Math.PI / 2;
                controls.minPolarAngle = Math.PI / 2;

                resolve({ scene, camera, renderer, model, controls });
            },
            undefined,
            (error) => {
                console.error('** Error Loading Model:', error);
                reject(error);
            }
        );
    });
}

export function animateModel(renderer, scene, camera, model, controls) {
    let animationId, isAnimating = true;
    function render() {
        if (!isAnimating) return;
        animationId = requestAnimationFrame(render);
        controls.update();
        renderer.render(scene, camera);
    }
    render();
    return {
        stop: () => { isAnimating = false; cancelAnimationFrame(animationId); },
        animationId: animationId,
    };
}