import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

// GUI - Debug
const gui = new GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Textures
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load('./textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load(
  './textures/door/ambientOcclusion.jpg'
);
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg');
const doorMetalnessTexture = textureLoader.load(
  './textures/door/metalness.jpg'
);
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg');
const doorRoughnessTexture = textureLoader.load(
  './textures/door/roughness.jpg'
);
const matcapTexture = textureLoader.load('./textures/matcaps/8.png');
const gradientTexture = textureLoader.load('./textures/gradients/5.jpg');

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// Lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

// Environment Map:
const rgbeLoader = new RGBELoader();
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = environmentMap;
  scene.environment = environmentMap;
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// MATERIALS:
// MeshBasicMaterial:
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color = new THREE.Color('red');
// material.wireframe = true;

// material.transparent = true;
// material.opacity = 0.5;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide;

// MeshNormalMaterial:
// const material = new THREE.MeshNormalMaterial();
// material.side = THREE.DoubleSide;
// // material.wireframe = true;
// material.flatShading = true;

// MeshMatcapMaterial:
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;
// material.side = THREE.DoubleSide;

// MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial();

// MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial();
// material.side = THREE.DoubleSide;

// MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial();
// material.side = THREE.DoubleSide;
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff);

// MeshToonMaterial
// const material = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// material.gradientMap = gradientTexture;

// MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial();
// material.side = THREE.DoubleSide;
// material.metalness = 1;
// material.roughness = 1;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

// gui.add(material, 'metalness', 0, 1, 0.001);
// gui.add(material, 'roughness', 0, 1, 0.001);

// MeshPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial();
material.side = THREE.DoubleSide;
material.metalness = 0;
material.roughness = 0;
material.map = doorColorTexture;
material.aoMap = doorAmbientOcclusionTexture;
material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
material.metalnessMap = doorMetalnessTexture;
material.roughnessMap = doorRoughnessTexture;
material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

gui.add(material, 'metalness', 0, 1, 0.001);
gui.add(material, 'roughness', 0, 1, 0.001);

// Clearcoat
// material.clearcoat = 1;
// material.clearcoatRoughness = 0;

// gui.add(material, 'clearcoat', 0, 1, 0.0001);
// gui.add(material, 'clearcoatRoughness', 0, 1, 0.0001);

// Sheen
// material.sheen = 1;
// material.sheenRoughness = 0.25;
// material.sheenColor.set(1, 1, 1);

// gui.add(material, 'sheen', 0, 1, 0.0001);
// gui.add(material, 'sheenRoughness', 0, 1, 0.0001);
// gui.addColor(material, 'sheenColor');

// Iridescence
material.iridescence = 1;
material.iridescenceIOR = 1;
material.iridescenceThicknessRange = [100, 800];
gui.add(material, 'iridescence', 0, 1, 0.0001);
gui.add(material, 'iridescenceIOR', 1, 2.333, 0.0001);
gui.add(material.iridescenceThicknessRange, '0', 1, 1000, 1);
gui.add(material.iridescenceThicknessRange, '1', 1, 1000, 1);

// Transmission
// material.transmission = 1;
// material.ior = 1.5;
// material.thickness = 0.5;

// gui.add(material, 'transmission', 0, 1, 0.0001);
// gui.add(material, 'ior', 1, 10, 0.0001);
// gui.add(material, 'thickness', 1, 10, 0.0001);

// Objects
const sphereGeometry = new THREE.SphereGeometry(0.5, 64, 64);
const planeGeometry = new THREE.PlaneGeometry(1, 1, 100, 100);
const torusGeometry = new THREE.TorusGeometry(0.3, 0.2, 64, 128);

const sphereMesh = new THREE.Mesh(sphereGeometry, material);
const planeMesh = new THREE.Mesh(planeGeometry, material);
const torusMesh = new THREE.Mesh(torusGeometry, material);

sphereMesh.position.x = -1.5;
torusMesh.position.x = 1.5;

scene.add(sphereMesh, planeMesh, torusMesh);

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  sphereMesh.rotation.y = 0.1 * elapsedTime;
  planeMesh.rotation.y = 0.1 * elapsedTime;
  torusMesh.rotation.y = 0.1 * elapsedTime;

  sphereMesh.rotation.x = 0.15 * elapsedTime;
  planeMesh.rotation.x = 0.15 * elapsedTime;
  torusMesh.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
