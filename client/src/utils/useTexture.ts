import * as THREE from "three";

// const dracoLoader = new DRACOLoader();
const loader = new THREE.TextureLoader();
// dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
// dracoLoader.setDecoderConfig({ type: "js" });
// loader.setDRACOLoader(dracoLoader);

export interface ITextureDetails {
  path: string;
}
// export const useTexture = async (
//   { path, type }: ITextureDetails,
//   onLoad: (texture: any) => void
// ) => {
//   try {
//     let thisTexture;
//     loader.loadAsync(path);
//     return thisTexture;
//   } catch (err) {
//     console.log(err);
//   }
// };
