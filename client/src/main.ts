//libs
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

//collider
import "./main.css";
import { Rings } from "./visual-components/Rings";
import { Controller } from "./Controller";

//loading manager used by useModel
export const manager = new THREE.LoadingManager();

/////div creation
const container = document.createElement("div");
document.body.appendChild(container);

//scene creation
export const scene = new THREE.Scene();
scene.background = new THREE.Color("#09080f");

//render config
export const renderer = new THREE.WebGLRenderer({ antialias: true }); // turn on antialias
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); //set pixel ratio
renderer.setSize(window.innerWidth, window.innerHeight); // make it full screen
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.outputEncoding = THREE.sRGBEncoding; // set color encoding
container.appendChild(renderer.domElement); // add the renderer to html div

//cam config
export const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  1,
  100
);
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

//lights
const ambient = new THREE.AmbientLight(0xa0a0fc, 0.82);
scene.add(ambient);

const sunLight = new THREE.DirectionalLight(0xe8c37b, 1.96);
sunLight.position.set(-69, 44, 14);
sunLight.castShadow = true;
scene.add(sunLight);

//load models for all components
//todo add a Controller method which will load models from a list. Maybe JSON?
const controller = new Controller();
controller.loadModels();
//this handler runs when all assets are loaded. From here we can start the app.
manager.onLoad = () => {
  controller.initComponents();
  controller.initOSC();
  startApp();
};

//start app with list of all imported objects
const startApp = () => {
  controller.start();
};

//RENDER LOOP FUNCTION

//listen for note messages

// hello();
