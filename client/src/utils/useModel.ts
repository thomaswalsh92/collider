//libs
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

//collider
import { stagingScene } from "../main";

interface IUseModelProps {
  modelPath: string;
  manager: THREE.LoadingManager;
  textures?: TextureInfo[];
}

//note - manual list of allowed texture types until I figure out how to insert these values based on the MeshStandardMaterialsParams type
type AllowedTextureTypes = "map" | "normalMap" | "roughnessMap";

type TextureInfo = {
  path: string;
  type: AllowedTextureTypes;
};

//!ASSUMPTION - using useModel assumes that each GLTF file imported has only one object, or automatic assignment of textures won't work
//!code only takes index 0 of gltf.scene.children so only first exported object will work in each GLTF file
export const useModel = async ({
  modelPath,
  textures,
  manager,
}: IUseModelProps) => {
  const dracoLoader = new DRACOLoader();
  const modelLoader = new GLTFLoader(manager);
  const textureLoader = new THREE.TextureLoader(manager);
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
  dracoLoader.setDecoderConfig({ type: "js" });
  modelLoader.setDRACOLoader(dracoLoader);

  if (Array.isArray(textures) && textures.length > 0) {
    //covert details of textures into array of imported textures and associated type
    let modelTextures: { texture: THREE.Texture; type: AllowedTextureTypes }[] =
      [];
    try {
      textures.forEach((tex, index) => {
        textureLoader.load(tex.path, (loadedTex) => {
          modelTextures.push({ texture: loadedTex, type: tex.type });
          //end of textures list reached. All textures are now loaded, now load model
          if (index === textures.length - 1) {
            try {
              modelLoader.load(modelPath, (gltf) => {
                //pretty dirty cast but it works ok and there is a missing/incorrect type for gltf
                const mesh = gltf.scene.children[0] as unknown as THREE.Mesh;
                const mat = new THREE.MeshStandardMaterial();
                //go through list of imported textures and assign to correct material parameters
                modelTextures.forEach((tex) => {
                  if (tex.type === "map") {
                    mat.map = tex.texture;
                  }
                  if (tex.type === "normalMap") {
                    mat.normalMap = tex.texture;
                  }
                  if (tex.type === "roughnessMap") {
                    mat.roughnessMap = tex.texture;
                  }
                });
                mesh.material = mat;
                mesh.userData = { importedMesh: true };
                mesh.receiveShadow = true;
                stagingScene.add(mesh);
              });
            } catch (err) {
              console.log("error loading model with textures: ", err);
            }
          }
        });
      });
    } catch (err) {
      console.log("error loading texture: ", err);
    }
  } else {
    try {
      modelLoader.load(modelPath, (gltf) => {
        //pretty dirty cast but it works ok and there is a missing/incorrect type for gltf
        const mesh = gltf.scene.children[0] as unknown as THREE.Mesh;
        const mat = new THREE.MeshStandardMaterial();
        mesh.material = mat;
        mesh.userData = { importedMesh: true };
        mesh.receiveShadow = true;
        stagingScene.add(mesh);
      });
    } catch (err) {
      console.log("error loading model without textures:", err);
    }
  }
};
