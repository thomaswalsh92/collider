//libs
import * as THREE from "three";

//collider
import "./main.css";
import { Controller } from "./Controller";

//!!GLOBAL VARIABLES
export const scene = new THREE.Scene();
export const stagingScene = new THREE.Scene();
export const renderer = new THREE.WebGLRenderer({ antialias: true }); // turn on antialias
export const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  1,
  100
);
export const modelManager = new THREE.LoadingManager();
export const textureManager = new THREE.LoadingManager();
// export let BPM: number;

//div creation
const threeContainer = document.createElement("div");
document.body.appendChild(threeContainer);
threeContainer.style.position = "absolute";
threeContainer.style.top = "0";
threeContainer.style.left = "0";
const p5Container = document.createElement("div");
p5Container.style.position = "absolute";
p5Container.style.top = "0";
p5Container.style.left = "0";
document.body.appendChild(p5Container);

//scene creation
scene.background = new THREE.Color("#09080f");

//render config
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); //set pixel ratio
renderer.setSize(window.innerWidth, window.innerHeight); // make it full screen
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.outputEncoding = THREE.sRGBEncoding; // set color encoding
threeContainer.appendChild(renderer.domElement); // add the renderer to html div

//cam config
camera.position.set(0, 0, 30);
scene.add(camera);

//screen config
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(2);
});

//todo find a place for these lights
const ambient = new THREE.AmbientLight(0xa0a0fc, 0.82);
scene.add(ambient);

const sunLight = new THREE.DirectionalLight(0xe8c37b, 1.96);
sunLight.position.set(-69, 44, 14);
sunLight.castShadow = true;
scene.add(sunLight);

const controller = new Controller();

//preload textures
controller.loadTextures();

//preload models
controller.loadModels();

//this handler runs when all assets are loaded. From here we can start the app.
modelManager.onLoad = () => {
  controller.initComponents();
  controller.initComponentOSC();
  startApp();
};

//start controller on load
const startApp = () => {
  controller.start();
  // controller.mode = "cycleRandom";
};
