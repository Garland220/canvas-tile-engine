"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Geometry_1 = require("../Geometry");
var TileSet = (function () {
    function TileSet(image, height, width, scale) {
        if (scale === void 0) { scale = 32; }
        this.image = image;
        this.scale = scale;
        this.rows = Math.floor(height / scale);
        this.columns = Math.floor(width / scale);
    }
    TileSet.prototype.GetPointFromID = function (id) {
        return new Geometry_1.Point2D(Math.floor(id % this.columns), Math.floor(id / this.columns));
    };
    TileSet.prototype.SpriteAt = function (point) {
        var tile = this.image;
    };
    return TileSet;
}());
exports.TileSet = TileSet;
var BaseMap = (function () {
    function BaseMap(id, name, height, width) {
        this.id = id;
        this.name = name;
        this.height = height;
        this.width = width;
    }
    Object.defineProperty(BaseMap.prototype, "ID", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseMap.prototype, "Name", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseMap.prototype, "Height", {
        get: function () {
            return this.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseMap.prototype, "Width", {
        get: function () {
            return this.width;
        },
        enumerable: true,
        configurable: true
    });
    BaseMap.prototype.GetZAt = function (location) {
        return 0;
    };
    return BaseMap;
}());
exports.BaseMap = BaseMap;
//# sourceMappingURL=BaseMap.js.map