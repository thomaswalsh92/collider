import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

interface IUseModelProps {
  modelPath: string;
  textureDetails?: TextureDetails;
  scene: THREE.Scene;
  manager: THREE.LoadingManager;
}

type TextureDetails = {
  path: string;
};

type TextureDetailsArr = TextureDetails[];

export const useModel = async ({
  modelPath,
  textureDetails,
  scene,
  manager,
}: IUseModelProps) => {
  const dracoLoader = new DRACOLoader();
  const modelLoader = new GLTFLoader(manager);
  const textureLoader = new THREE.TextureLoader(manager);
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
  dracoLoader.setDecoderConfig({ type: "js" });
  modelLoader.setDRACOLoader(dracoLoader);

  if (textureDetails) {
    let modelTexture: THREE.Texture;
    try {
      modelTexture = textureLoader.load(textureDetails.path);
      try {
        modelLoader.load(modelPath, (gltf) => {
          gltf.scene.children.forEach((child) => {
            const mesh = child as unknown as THREE.Mesh;
            const mat = new THREE.MeshStandardMaterial({ map: modelTexture });
            mesh.material = mat;
            mesh.userData = { importedMesh: true };
            scene.add(mesh);
          });
        });
      } catch (err) {
        console.log("error loading model: ", err);
      }
    } catch (err) {
      console.log("error loading texture: ", err);
    }
  }
};
