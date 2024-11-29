import * as THREE from "three";

type AllowedTextureTypes = "map" | "normalMap" | "roughnessMap";

type TextureInfo = {
  path: string;
  type: AllowedTextureTypes;
};

interface ITextures {}

export const useTexture = (textures: TextureInfo[]) => {
  const loader = new THREE.TextureLoader();
  const loadedTextures: THREE.Texture[] = [];
  textures.forEach((tex, index) => {
    loader.load(tex.path, (loadedTex) => {
      loadedTex.name = tex.type;
      loadedTextures.push(loadedTex);
    });
  });
  return loadedTextures;
};
