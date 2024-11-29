//libs
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

//collider
import { stagingScene } from "../main";

interface IUseModelProps {
  modelPath: string;
  manager: THREE.LoadingManager;
}

export const useModel = async ({ modelPath, manager }: IUseModelProps) => {
  const dracoLoader = new DRACOLoader();
  const modelLoader = new GLTFLoader(manager);
  const textureLoader = new THREE.TextureLoader(manager);
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
  dracoLoader.setDecoderConfig({ type: "js" });
  modelLoader.setDRACOLoader(dracoLoader);

  modelLoader.load(modelPath, (loadedModel) => {
    const mesh = new THREE.Mesh();
    //!have to do these cast throughout but obj should always be mesh
    const model = loadedModel.scene.children[0] as unknown as THREE.Mesh;
    model.userData.importedMesh = true;
    // mesh.name = model.name;
    stagingScene.add(model);
  });
};
