

import 'pepjs'
import '@babylonjs/loaders'
import { HemisphericLight, Vector3, SceneLoader, Mesh, ArcRotateCamera } from '@babylonjs/core'
import { createEngine, createScene, createSkybox, createArcRotateCamera } from './babylon'

const ASSETS_URL = "assets/models/";
const SCENE_NAME = "scene.babylon";
const SKY_TEXTURE_URL = "assets/images/skybox";

const canvas: HTMLCanvasElement = document.getElementById('virtualInsanityCanvas') as HTMLCanvasElement
const engine = createEngine(canvas)
const scene = createScene()

// main function that is async so we can call the scene manager with await
const main = async () => {

  const skybox = createSkybox(SKY_TEXTURE_URL) as Mesh;

  const camera = createArcRotateCamera() as ArcRotateCamera;

  const light = new HemisphericLight("light1", new Vector3(10, 20, 0), scene)
  light.intensity = 0.8
  
  SceneLoader.ImportMesh(
    "",
    ASSETS_URL,
    SCENE_NAME,
    scene,
    function (importedMeshes) {
      importedMeshes.forEach(mesh => {
        console.log("imported mesh " + mesh.name);
      });
    }
  );

  // Start the scene
  engine.runRenderLoop(() => {
    scene.render()
  });

  // Resize
  window.addEventListener("resize", function () {
    engine.resize();
  });
}

export default function initBabylonScene(){
  main();
}
