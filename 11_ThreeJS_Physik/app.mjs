import * as THREE from '../99_Lib/three.module.min.js';
import { AmmoPhysics } from '../99_Lib/jsm/physics/AmmoPhysics.js';

import { keyboard, mouse } from './js/interaction2D.mjs';
import { add } from './js/geometry.mjs';

console.log("ThreeJs " + THREE.REVISION);


window.onload = async function () {

    const physics = await AmmoPhysics();
    const position = new THREE.Vector3();

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0.3, 2);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x666666);

    const hemiLight = new THREE.HemisphereLight();
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(5, 5, 5);
    dirLight.castShadow = true;
    dirLight.shadow.camera.zoom = 2;
    scene.add(dirLight);

    //////////////////////////////////////////////////////////////////////////////
    // FLOOR
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    // const floorShadowMaterial = new THREE.ShadowMaterial({ color: 0x554444 });
    const width = 0.1;
    const floor = new THREE.Mesh(
        new THREE.BoxGeometry(10, width, 10),
        floorMaterial
    );
    floor.position.y = -width / 2;
    floor.receiveShadow = true;
    floor.userData.physics = { mass: 0 };
    floor.name = "floor";
    scene.add(floor);

    //////////////////////////////////////////////////////////////////////////////
    // Box
    const boxWidth = 0.2;

    for (let i = 0; i < 10; ++i) {
        const box = new THREE.Mesh(new THREE.BoxGeometry(boxWidth, boxWidth, boxWidth), new THREE.MeshStandardMaterial({
            color: 0xff3333,
            roughness: 0.7,
            metalness: 0.0,
        }));
        box.name = `box_${i}`;
        box.position.x = 2 * Math.random() - 1;
        box.position.z = -1 * Math.random();
        box.position.y = boxWidth / 2;

        box.castShadow = true;
        box.receiveShadow = true;
        box.userData.physics = { mass: 1 };
        scene.add(box);
    }

    //////////////////////////////////////////////////////////////////////////////
    // Spheres
    const spheres = [];
    const MAX_SPHERES = 10;
    for (let i = 0; i < MAX_SPHERES; ++i) {
        const sphere = add(3, scene, 0, -1, 0);
        sphere.castShadow = true;
        // sphere.receiveShadow = true;
        sphere.userData.physics = { mass: 0.9 };
        sphere.name = `sphere_${i}`;
        spheres.push(sphere);
    }

    const cursor = add(1, scene);
    cursor.castShadow = true;
    mouse(cursor);


    const addKey = keyboard();
    let triggered = false;
    addKey(" ", active => {
        triggered = active;
    });


    const cursor_position = new THREE.Vector3();
    const cursor_rotation = new THREE.Quaternion();
    const cursor_scale = new THREE.Vector3();
    const direction = new THREE.Vector3();
    const velocity = new THREE.Vector3();
    const MOVESPEED = 15;

    let ballIdx = 0;
    function shootBall() {
        triggered = false;
        cursor.updateMatrix();
        cursor.matrix.decompose(cursor_position, cursor_rotation, cursor_scale);
        direction.set(0, 1, 0);
        direction.applyQuaternion(cursor_rotation);

        velocity.set(direction.x * MOVESPEED, direction.y * MOVESPEED, direction.z * MOVESPEED);
        if (++ballIdx >= MAX_SPHERES) ballIdx = 0;
        physics.setMeshPositionVelocity(spheres[ballIdx], cursor_position, velocity);
    }

    physics.addScene(scene);
    //

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    //


    // Renderer-Loop starten
    function render() {
        if (triggered) {
            shootBall();
        }
        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(render);


}
