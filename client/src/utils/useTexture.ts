import * as THREE from "three";

type AllowedTextureTypes = "map" | "normalMap" | "roughnessMap";

type TextureInfo = {
  path: string;
  type: AllowedTextureTypes;
};

export const useTexture = (
  textures: TextureInfo[],
  manager: THREE.LoadingManager
) => {
  const loader = new THREE.TextureLoader(manager);
  const loadedTextures: THREE.Texture[] = [];
  textures.forEach((tex, index) => {
    loader.load(tex.path, (loadedTex) => {
      loadedTex.name = tex.type;
      loadedTextures.push(loadedTex);
    });
  });
  return loadedTextures;
};
