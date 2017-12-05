"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mobile_1 = require("../../../shared/mobile");
var Mobile = (function () {
    function Mobile() {
    }
    Object.defineProperty(Mobile.prototype, "ID", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mobile.prototype, "Name", {
        get: function () {
            return "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mobile.prototype, "Deleted", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mobile.prototype, "Visible", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mobile.prototype, "Direction", {
        get: function () {
            return mobile_1.Direction.North;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mobile.prototype, "Alive", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mobile.prototype, "Flying", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mobile.prototype, "Swimming", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mobile.prototype, "Dazed", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mobile.prototype, "Frozen", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mobile.prototype, "Paralyzed", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mobile.prototype, "CanMove", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mobile.prototype, "CanFly", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mobile.prototype, "CanSwim", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mobile.prototype, "Invulnerable", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mobile.prototype, "Location", {
        get: function () {
            return this.location;
        },
        set: function (location) {
            this.location = location;
        },
        enumerable: true,
        configurable: true
    });
    Mobile.prototype.Render = function () {
    };
    Mobile.prototype.CheckMove = function (direction) {
        return false;
    };
    Mobile.prototype.Delete = function () {
    };
    Mobile.prototype.ProcessDelta = function () {
    };
    return Mobile;
}());
exports.Mobile = Mobile;
//# sourceMappingURL=Mobile.js.map