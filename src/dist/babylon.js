"use strict";
exports.__esModule = true;
exports.createSkybox = exports.createArcRotateCamera = exports.createScene = exports.createEngine = exports.camera = exports.scene = exports.engine = exports.canvas = void 0;
var core_1 = require("@babylonjs/core");
require("@babylonjs/inspector");
var handleResize;
exports.createEngine = function (hostCanvas) {
    exports.canvas = hostCanvas;
    exports.engine = new core_1.Engine(exports.canvas, true, {}, true);
    handleResize = function () { return exports.engine.resize(); };
    window.addEventListener('resize', handleResize);
    return exports.engine;
};
exports.createScene = function () {
    exports.scene = new core_1.Scene(exports.engine);
    exports.scene.clearColor = new core_1.Color4(0.8, 0.8, 0.8, 1);
    // optimize scene for opaque background
    exports.scene.autoClear = false;
    exports.scene.autoClearDepthAndStencil = false;
    exports.scene.gravity = new core_1.Vector3(0, -0.9, 0);
    exports.scene.collisionsEnabled = true;
    exports.scene.enablePhysics(new core_1.Vector3(0, -0.9, 0));
    // show the inspector when pressing shift + alt + I
    exports.scene.onKeyboardObservable.add(function (_a) {
        var event = _a.event;
        if (event.ctrlKey && event.shiftKey && event.code === 'KeyI') {
            if (exports.scene.debugLayer.isVisible()) {
                exports.scene.debugLayer.hide();
            }
            else {
                exports.scene.debugLayer.show();
            }
        }
    });
    return exports.scene;
};
exports.createArcRotateCamera = function () {
    var startAlpha = Math.PI / 2;
    var startBeta = Math.PI / 2;
    var startRadius = 16;
    var startPosition = new core_1.Vector3(0, 1.7, 0);
    var camera = new core_1.ArcRotateCamera('camera', startAlpha, startBeta, startRadius, startPosition, exports.scene, true);
    camera.attachControl(exports.canvas, false);
    // Set some basic camera settings
    camera.minZ = 0.1;
    camera.lowerBetaLimit = Math.PI * 1.8 / 4;
    camera.upperBetaLimit = Math.PI * 2.2 / 4;
    camera.lowerRadiusLimit = 4;
    camera.upperRadiusLimit = 14;
    camera.allowUpsideDown = false;
    camera.wheelPrecision = 250;
    camera.radius = 7;
    camera.useAutoRotationBehavior = true;
    if (camera.autoRotationBehavior != null) {
        camera.autoRotationBehavior.idleRotationSpeed = 0.18;
    }
    camera.pinchPrecision = 1000;
    return camera;
};
exports.createSkybox = function (skyTextureUrl) {
    var skybox = core_1.Mesh.CreateBox("skyBox", 100.0, exports.scene);
    var skyboxMaterial = new core_1.StandardMaterial("skyBox", exports.scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new core_1.CubeTexture("assets/images/skybox", exports.scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = core_1.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new core_1.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new core_1.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    return skybox;
};
