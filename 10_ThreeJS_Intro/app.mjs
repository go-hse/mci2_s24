import * as THREE from '../99_Lib/three.module.min.js';
import { add } from './js/geometry.mjs';

console.log("ThreeJs " + THREE.REVISION);

window.onload = function () {

    // Szene
    const scene = new THREE.Scene();
    // Lichter
    scene.add(new THREE.HemisphereLight(0x808080, 0x606060));
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 2, 1);
    scene.add(light);
    // Kamera
    const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 0.3);
    scene.add(camera);
    // Geometrie
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), new THREE.MeshStandardMaterial({
        color: 0xff3333,
        roughness: 0.7,
        metalness: 0.0,
    }));
    scene.add(box);
    box.position.z = -0.7;

    const arr = [];
    let count = 0;

    const delta = 0.3, z = -1;
    for (let x = -1; x <= 1; x += delta) {
        for (let y = -1; y <= 1; y += delta) {
            if (++count % 2 == 0)
                arr.push(add(6, scene, x, y, z));
            else
                arr.push(add(4, scene, x, y, z));
        }

    }

    // Renderer erstellen
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
    });

    // Renderer-Parameter setzen
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Renderer-Loop starten
    function render() {
        box.rotation.x += 0.01;
        box.rotation.y += 0.01;

        for (const o of arr) {
            o.rotation.x -= 0.01;
            o.rotation.y -= 0.01;
        }

        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(render);


};
