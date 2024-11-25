import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const dracoLoader = new DRACOLoader();
const loader = new GLTFLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
dracoLoader.setDecoderConfig({ type: "js" });
loader.setDRACOLoader(dracoLoader);

export const useModel = async (
  path: string,
  onLoad: (model: any) => void,
  scene?: THREE.Scene
) => {
  try {
    loader.load(path, (model) => {
      onLoad(model);
      scene && scene.add(model.scene);
    });
  } catch (err) {
    console.log(err);
  }
};
