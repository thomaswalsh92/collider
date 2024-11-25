import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { ITextureDetails /*useTexture*/ } from "./useTexture";

const dracoLoader = new DRACOLoader();
const modelLoader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
dracoLoader.setDecoderConfig({ type: "js" });
modelLoader.setDRACOLoader(dracoLoader);

interface IUseModelProps {
  modelPath: string;
  textureDetails?: ITextureDetails;
  scene: THREE.Scene;
}

export const useModel = async ({
  modelPath,
  textureDetails,
  scene,
}: IUseModelProps) => {
  if (textureDetails) {
    let modelTexture: THREE.Texture;
    let model;
    try {
      modelTexture = textureLoader.load(textureDetails.path);
      try {
        modelLoader.load(modelPath, (gltf) => {
          const firstMesh = gltf.scene.children[0] as unknown as THREE.Mesh;
          const mat = new THREE.MeshStandardMaterial({ map: modelTexture });
          firstMesh.material = mat;
          scene.add(firstMesh);
        });
      } catch (err) {
        console.log("error loading model: ", err);
      }
      model = modelLoader.load(modelPath, (gltf) => {});
    } catch (err) {
      console.log("error loading texture: ", err);
    }
  }
};
