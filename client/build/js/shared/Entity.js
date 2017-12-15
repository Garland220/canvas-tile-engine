"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mobile_1 = require("./mobile");
var Geometry_1 = require("./Geometry");
var MapID = (function () {
    function MapID() {
    }
    return MapID;
}());
exports.MapID = MapID;
var Entity = (function () {
    function Entity() {
        this.deleted = false;
        this.visible = false;
        this.location = new Geometry_1.Point3D(0, 0, 0);
        this.direction = mobile_1.Direction.North;
        this.map = null;
    }
    Object.defineProperty(Entity.prototype, "ID", {
        get: function () {
            return this.id;
        },
        set: function (id) {
            this.id = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "Name", {
        get: function () {
            return this.name;
        },
        set: function (name) {
            this.name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "Deleted", {
        get: function () {
            return this.deleted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "Visible", {
        get: function () {
            return this.visible;
        },
        set: function (visible) {
            this.visible = visible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "Location", {
        get: function () {
            return this.location;
        },
        set: function (point) {
            this.location.X = point.X;
            this.location.Y = point.Y;
            this.location.Z = point.Z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "Direction", {
        get: function () {
            return this.direction;
        },
        set: function (direction) {
            this.direction = direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "Map", {
        get: function () {
            return this.map;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "X", {
        get: function () {
            return this.location.X;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "Y", {
        get: function () {
            return this.location.Y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "Z", {
        get: function () {
            return this.location.Z;
        },
        enumerable: true,
        configurable: true
    });
    Entity.prototype.Clone = function () {
        var cloneObj = new (this.constructor());
        for (var attribut in this) {
            if (typeof this[attribut] === "object") {
                cloneObj[attribut] = this.Clone();
            }
            else {
                cloneObj[attribut] = this[attribut];
            }
        }
        return cloneObj;
    };
    Entity.prototype.DistanceTo = function (point) {
        return this.Location.Distance(point);
    };
    Entity.prototype.InRange = function (point, range) {
        return range <= this.DistanceTo(point);
    };
    Entity.prototype.Delete = function () {
        this.deleted = true;
    };
    Entity.prototype.ProcessDelta = function () {
    };
    return Entity;
}());
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map