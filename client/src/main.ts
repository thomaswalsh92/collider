import "./main.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { useOSC } from "./utils/useOSC";
import { useModel } from "./utils/useModel";

//loading manager used by useModel
const manager = new THREE.LoadingManager();

/////div creation
const container = document.createElement("div");
document.body.appendChild(container);

//scene creation
const scene = new THREE.Scene();
scene.background = new THREE.Color("#c8f0f9");

//render config
const renderer = new THREE.WebGLRenderer({ antialias: true }); // turn on antialias
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); //set pixel ratio
renderer.setSize(window.innerWidth, window.innerHeight); // make it full screen
// renderer.outputEncoding = THREE.sRGBEncoding; // set color encoding
container.appendChild(renderer.domElement); // add the renderer to html div

//cam config
const camera = new THREE.PerspectiveCamera(
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
scene.add(sunLight);

//Before the app is started, import all models here.
//At some point this can be moved into individual visual componenent hierarchy.
const loadModel = async () => {
  await useModel({
    modelPath: "models/gltf/ring3.glb",
    textureDetails: { path: "textures/ring3-diffuse.png" },
    scene: scene,
    manager: manager,
  });
};

loadModel();

//this handler runs when all assets are loaded. From here we can start the app.
manager.onLoad = () => {
  console.log("Loading complete!");
  console.log("Logging imported meshes:");
  const importedAssets = scene.children.filter((child) => {
    if (child.userData.importedMesh) {
      return child;
    }
  });
  console.log(importedAssets);
  start(importedAssets);
};

//start app with list of all imported objects
const start = (
  assets: (THREE.Object3D<THREE.Object3DEventMap> | undefined)[]
) => {
  let mostRecentMessage: number = 1;
  useOSC("note1", () => {
    mostRecentMessage = 1;
  });

  useOSC("note3", () => {
    mostRecentMessage = 3;
  });

  const renderLoop = () => {
    const ring3 = assets.find((asset) => asset?.name === "ring3");

    if (mostRecentMessage === 1) {
      ring3?.rotateX(0.002);
      ring3?.rotateY(0.004);
      ring3?.rotateZ(0.004);
    }

    if (mostRecentMessage === 3) {
      ring3?.rotateX(-0.004);
      ring3?.rotateY(0.006);
      ring3?.rotateZ(-0.003);
    }
    requestAnimationFrame(renderLoop); //loop the render function
    renderer.render(scene, camera); // render the scene using the camera
  };

  renderLoop(); //start rendering
};

//RENDER LOOP FUNCTION

//listen for note messages

// hello();
