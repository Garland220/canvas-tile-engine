"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var babylonjs_1 = require("babylonjs");
var KeyCodes_1 = require("./KeyCodes");
var user_1 = require("../../shared/user");
var Client = (function () {
    function Client(canvas, antialias, adaptToDeviceRatio) {
        if (antialias === void 0) { antialias = true; }
        if (adaptToDeviceRatio === void 0) { adaptToDeviceRatio = true; }
        this.hasMemoryAPI = true;
        this.settings = {};
        this.zoom = 5;
        this.canvas = canvas;
        this.CreateHardwareInfo();
        this.engine = new babylonjs_1.Engine(canvas, antialias, {}, adaptToDeviceRatio);
        this.settings.antialias = antialias;
        this.settings.adaptToDeviceRatio = adaptToDeviceRatio;
        this.Start();
        this.DebugScene();
    }
    Object.defineProperty(Client.prototype, "HardwareInfo", {
        get: function () {
            return this.hardwareInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "Player", {
        get: function () {
            return this.player;
        },
        enumerable: true,
        configurable: true
    });
    Client.prototype.CreateHardwareInfo = function () {
        var cpuCores = navigator['hardwareConcurrency'];
        var memory = window.performance['memory'] ? window.performance['memory']['jsHeapSizeLimit'] : undefined;
        var os = window.navigator['platform'] || window.navigator['oscpu'];
        var userAgent = window.navigator['userAgent'];
        var language = window.navigator['language'];
        var videoCard;
        try {
            var gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
            if (gl) {
                var debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                videoCard = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            }
        }
        catch (e) { }
        this.hardwareInfo = new user_1.HardwareInfo(cpuCores, memory, videoCard, os, userAgent, language);
        this.GetUsedMemory();
    };
    Client.prototype.GetUsedMemory = function () {
        if (!this.hasMemoryAPI) {
            return;
        }
        if (!window.performance['memory']) {
            this.hasMemoryAPI = false;
        }
        this.hardwareInfo.MemoryUsed = window.performance['memory'] ? window.performance['memory']['usedJSHeapSize'] : null;
    };
    Client.prototype.ChangeDisplaySetting = function (antialias, adaptToDeviceRatio) {
        if (antialias === void 0) { antialias = true; }
        if (adaptToDeviceRatio === void 0) { adaptToDeviceRatio = true; }
        this.Stop();
        this.engine.dispose();
        this.engine = new babylonjs_1.Engine(this.canvas, antialias, {}, adaptToDeviceRatio);
        this.Start();
    };
    Client.prototype.KeyDown = function (event) {
        if (event.keyCode === KeyCodes_1.Key.LeftArrow) {
            this.camera.position;
        }
    };
    Client.MapCoords = function (x, y, z) {
        return [x, z, y];
    };
    Client.prototype.ZoomCamera = function () {
        this.camera.orthoTop = 1 * this.zoom;
        this.camera.orthoBottom = -1 * this.zoom;
        this.camera.orthoLeft = -1 * this.zoom;
        this.camera.orthoRight = 1 * this.zoom;
    };
    Client.prototype.FocusCameara = function (vector) {
        this.camera.setTarget(vector);
    };
    Client.prototype.DebugScene = function () {
        this.scene = new babylonjs_1.Scene(this.engine);
        this.scene.useRightHandedSystem = true;
        this.scene.ambientColor = new babylonjs_1.Color3(1, 1, 1);
        this.scene.clearColor = babylonjs_1.Color3.White().toColor4();
        this.camera = new babylonjs_1.FreeCamera('Client Camera', new babylonjs_1.Vector3(5, 5, -5), this.scene);
        this.camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
        this.FocusCameara(babylonjs_1.Vector3.Zero());
        this.ZoomCamera();
        var floor = babylonjs_1.Mesh.CreateGround('Floor', 100, 100, 1, this.scene, false);
        var box = babylonjs_1.Mesh.CreateBox('Box', 2.0, this.scene);
        box.position.y = 1;
        var light = new babylonjs_1.PointLight('pointLight', new babylonjs_1.Vector3(0, 5, 0), this.scene);
        var spotlight = new babylonjs_1.SpotLight('spotLight', new babylonjs_1.Vector3(0, 10, -10), new babylonjs_1.Vector3(0, 0, 0), Math.PI / 3, 2, this.scene);
        var particleSystem = new babylonjs_1.ParticleSystem("particles", 2000, this.scene);
        particleSystem.particleTexture = new babylonjs_1.Texture("flare.png", this.scene);
        particleSystem.minEmitBox = new babylonjs_1.Vector3(-1, 3.5, -1);
        particleSystem.maxEmitBox = new babylonjs_1.Vector3(1, 3, 1);
        particleSystem.blendMode = babylonjs_1.ParticleSystem.BLENDMODE_ONEONE;
        particleSystem.emitRate = 1000;
        particleSystem.emitter = box;
        particleSystem.start();
        light.parent = box;
        spotlight.specular = new babylonjs_1.Color3(0, 0, 1);
        light.intensity = 0.6 + Math.random() * 0.05;
        this.scene.registerBeforeRender(function () {
            light.diffuse = new babylonjs_1.Color3(0.8 + Math.random() * 0.1, 0, 0);
            light.specular = new babylonjs_1.Color3(0.8 + Math.random() * 0.1, 0.8 + Math.random() * 0.1, 0);
        });
        this.ChangeScene(this.scene);
    };
    Client.prototype.SetupTriggers = function (scene) {
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnRightPickTrigger, function (evt) {
        }));
    };
    Client.prototype.ChangeScene = function (scene) {
        this.engine.runRenderLoop(function () {
            scene.render();
        });
    };
    Client.prototype.Start = function () {
        this.active = true;
        this.engine.clear(babylonjs_1.Color3.Black().toColor4(), false, false);
    };
    Client.prototype.Stop = function () {
        this.active = false;
        this.engine.stopRenderLoop();
        this.engine.clear(babylonjs_1.Color3.Black().toColor4(), false, false);
    };
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=Client.js.map