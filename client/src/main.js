import "./main.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { useOSC } from "./utils/useOSC";
import { useModel } from "./utils/useModel";

// DRACO
const dracoLoader = new DRACOLoader();
const loader = new GLTFLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
dracoLoader.setDecoderConfig({ type: "js" });
loader.setDRACOLoader(dracoLoader);

///// DIV CONTAINER CREATION TO HOLD THREEJS EXPERIENCE
const container = document.createElement("div");
document.body.appendChild(container);

//SCENE CREATION
const scene = new THREE.Scene();
scene.background = new THREE.Color("#c8f0f9");

//RENDERER CONFIG
const renderer = new THREE.WebGLRenderer({ antialias: true }); // turn on antialias
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); //set pixel ratio
renderer.setSize(window.innerWidth, window.innerHeight); // make it full screen
renderer.outputEncoding = THREE.sRGBEncoding; // set color encoding
container.appendChild(renderer.domElement); // add the renderer to html div

//CAMERAS CONFIG
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  1,
  100
);
camera.position.set(0, 0, 30);
scene.add(camera);

//MAKE EXPERIENCE FULL SCREEN
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(2);
});

//SCENE LIGHTS
const ambient = new THREE.AmbientLight(0xa0a0fc, 0.82);
scene.add(ambient);

const sunLight = new THREE.DirectionalLight(0xe8c37b, 1.96);
sunLight.position.set(-69, 44, 14);
scene.add(sunLight);

//LOADING GLB/GLTF MODEL FROM BLENDER
loader.load("models/gltf/ring3.glb", function (gltf) {
  gltf.scene.children[0].material = new THREE.MeshStandardMaterial({
    color: "orange",
  });
  scene.add(gltf.scene);
});

//RENDER LOOP FUNCTION
function rendeLoop() {
  renderer.render(scene, camera); // render the scene using the camera

  requestAnimationFrame(rendeLoop); //loop the render function
}

//TEST BED
useOSC("note1", () => {
  console.log("NOTE1");
});

// hello();

rendeLoop(); //start rendering
